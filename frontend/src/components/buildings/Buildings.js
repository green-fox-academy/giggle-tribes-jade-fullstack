import React from 'react';
import './Buildings.css';
import farm from '../../assets/buildings/farm.svg';
import mine from '../../assets/buildings/mine.svg';
import townhall from '../../assets/buildings/townhall.svg';
import academy from '../../assets/buildings/barracks.svg';
// import { BuildingsActions} from '../../actions/BuildingsActions';


function Buildings(props){
      
        const buildingIcons = {
          farm: farm,
          mine: mine,
          townhall: townhall,
          academy: academy,
        };
      
function buildingLevel(){

}
        
  return (
    <section className="buildings">
        
      <div className="icons">
        <img src={buildingIcons.townhall} alt="townhall" className="image"></img>
        <p className="buildingName">Townhall</p> 
        <p>Level {buildingLevel.townhall}</p>
      </div>
      
      <div className="icons">
        <img src={buildingIcons.farm} alt="farm" className="image"></img>
        <p className="buildingName">Farm</p>
        <p>Level {buildingLevel.farm}</p>
      </div>
      
      <div className="icons">
        <img src={buildingIcons.academy} alt="academy" className="image"></img>
        <p className="buildingName">Academy</p>
        <p>Level {buildingLevel.academy}</p>
      </div>
      
      <div className="icons">
        <img src={buildingIcons.mine} alt="mine" className="image"></img>
        <p className="buildingName">Mine</p>
        <p>Level {buildingLevel.mine}</p>
      </div>
        
    </section>
  );
}

export default Buildings;
