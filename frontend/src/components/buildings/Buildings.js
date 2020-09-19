import React from 'react';
import './Buildings.css';

function Buildings(props){
      
        
  return (
    <section className="buildings">
        
      <div className="icons">
        <img src="../buildings/townhall.png" alt="townhall" className="image"></img>
        <p className="buildingName">townhall Level 1</p>
      </div>
      
      <div className="icons">
        <img src="../buildings/farm.png" alt="farm" className="image"></img>
        <p className="buildingName">farm Level 1</p>
      </div>
      
      <div className="icons">
        <img src="../buildings/barracks.png" alt="academy" className="image"></img>
        <p className="buildingName">academy Level 1</p>
      </div>
      
      <div className="icons">
        <img src="../buildings/mine.png" alt="mine" className="image"></img>
        <p className="buildingName">mine Level 1</p>
      </div>
        
    </section>
  );
}

export default Buildings;
