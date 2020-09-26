import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Redirect } from 'react-router-dom';
import { env } from '../env';
import './Map.css';

const geoUrl = '/maps/world-110m.json';

const redirectLocation = '/login';

const occupiedFields = () => {
  return new Promise(resolve => {
    fetch(`${env.BACKEND_URL}/api/kingdoms/map`, {
      method: 'GET',
    })
      .then(result => result.json())
      .then(json => {
        const locations = json.kingdoms
          .map(e => e.location)
          .filter(e => e !== null);
        resolve(locations);
      });
  });
};

const addLocation = (code, kingdom) => {
  return new Promise((resolve, reject) => {
    fetch(`${env.BACKEND_URL}/api/kingdoms/${kingdom}/map`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ country_code: code }),
    })
      .then(result => result.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};

const Map = ({ kingdom }) => {
  const [occupied, setOccupied] = useState([]);
  const [selected, setSelected] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    occupiedFields().then(fields => setOccupied(fields));
  }, []);

  const fieldClick = field => {
    if (occupied.indexOf(field) === -1) {
      setSelected(field);
    }
  };

  const submitClick = (selected, kingdom) => {
    if (selected) {
      addLocation(selected, kingdom).then(result => {
        if (!result.error) setDone(true);
      });
    }
  };

  if (done) return <Redirect push to={redirectLocation} />;
  return (
    <div className="mapWrapper">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              let fillColor = '#999999';
              fillColor =
                occupied.indexOf(geo.properties.ISO_A3) !== -1
                  ? '#996060'
                  : fillColor;
              fillColor =
                geo.properties.ISO_A3 === selected ? '#204099' : fillColor;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  className={
                    occupied.indexOf(geo.properties.ISO_A3) !== -1
                      ? ''
                      : 'location selectable'
                  }
                  onClick={() => fieldClick(geo.properties.ISO_A3)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <button type="button" onClick={() => submitClick(selected, kingdom)}>
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Map);
