import React,{ useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { env } from '../env';
import './Map.css';


const geoUrl =
  '/maps/world-110m.json';

const occupiedFields = () => {
  return new Promise( resolve => {
    fetch(`${env.BACKEND_URL}/api/kingdoms/map`, {
        method: 'GET'
    })
    .then( (result) => result.json() )
    .then( (json) => {
      const locations = json.kingdoms.map( e => e.location ).filter( e => e !== null );
      resolve( locations );
    })
  });
};

const addLocation = (code) => {
  return new Promise( (resolve,reject) => {
    fetch(`${env.BACKEND_URL}/api/kingdoms/${5}/map`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ "country_code": code })
    })
    .then( (result) => result.json() )
    .then( (json) => resolve( json ) )
    .catch( (error) => reject(error) );
  });
};

const Map = () => {

  const [occupied, setOccupied] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect( () => {
    occupiedFields()
    .then ( fields => setOccupied(fields));
  },[]);

  const fieldClick = (field) => {
    if (occupied.indexOf(field) === -1) {
      setSelected(field);
    }
  };

  const submitClick = (selected) => {
    if (selected) {
      addLocation(selected)
        .then(console.log);
    }
  };

  return (
    <div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              let fillColor = '#808080';
              fillColor = occupied.indexOf(geo.properties.ISO_A3) !== -1 ? '#996060' : fillColor;
              fillColor = geo.properties.ISO_A3 === selected ? '#204099' : fillColor;
              return <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={fillColor}
                className={ occupied.indexOf(geo.properties.ISO_A3) !== -1 ? '' : 'selectable'}
                onClick={ () => fieldClick(geo.properties.ISO_A3) }
              />
            })
          }
        </Geographies>
      </ComposableMap>
      <button type="button" onClick={ () => submitClick(selected) }>Submit</button> 
    </div>
  )
};

export default Map;
