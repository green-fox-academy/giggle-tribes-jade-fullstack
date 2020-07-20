import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';


const geoUrl =
  '/maps/world-110m.json';

const Map = () => (
  <div>
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  </div>
);

export default Map;
