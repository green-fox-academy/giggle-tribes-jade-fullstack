import React,{ useState,useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { env } from '../env';

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
      console.log(locations)
      resolve( locations );
    })
  });

};



const Map = () => {

  const [occupied, setOccupied] = useState([]);

  useEffect( () => {
    occupiedFields()
    .then ( fields => setOccupied(fields));
  },[]);

  const fieldClick = (field) => {
    if (occupied.indexOf(field) === -1) {
      const toOccupie = [...occupied,field];
      setOccupied(toOccupie);
    }
  };

  return (
    <div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isOccupied = occupied.indexOf(geo.properties.ISO_A3) !== -1;
              return <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isOccupied ? '#994040' : '#404040'}
                onClick={ () => fieldClick(geo.properties.ISO_A3) }
              />
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
};

export default Map;
