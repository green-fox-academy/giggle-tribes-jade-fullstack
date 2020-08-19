import React from 'react';
import './Buildings.css';
import farm from '../assets/buildings/farm.svg';
import mine from '../assets/buildings/mine.svg';
import townhall from '../assets/buildings/townhall.svg';
import academy from '../assets/buildings/barracks.svg';

function Buildings(props){
      
        const buildingIcons = {
          farm: farm,
          mine: mine,
          townhall: townhall,
          academy: academy,
        };
      
        return (
          <div className="buildingBox">
            
            <div className="buildingList">

              <div className="buildings">
                <img src="../buildings/townhall.jpg" alt="townhall" className="image"></img>
                <div className="buildingName">townhall Level 1</div>
              
              </div>
              
              <div className="buildings">
                <img src="../buildings/farm.png" alt="farm" className="image"></img>
                <div className="buildingName">farm Level 1</div>
              </div>
              
              <div className="buildings">
                <img src="../buildings/barracks.png" alt="academy" className="image"></img>
                <div className="buildingName">academy Level 1</div>
              </div>
              
              <div className="buildings">
                <img src="../buildings/mine.png" alt="mine" className="image"></img>
                <div className="buildingName">mine Level 1</div>
              </div>
            
            </div>

            <div className="addBuildings">

              <div className="buildings">
                <button type="submit"><img src="../buildings/addfarm.png" alt="add farm" className="image"></img></button>
                <div className="buildingName">add farm</div>
              </div>

              <div className="buildings">
                <button type="submit"><img src="../buildings/addacademy.png" alt="add academy" className="image"></img></button>
                <div className="buildingName">add academy</div>  
              </div>

              <div className="buildings">
                <button type="submit"><img src="../buildings/addmine.png" alt="add mine" className="image"></img></button>
                <div className="buildingName">add mine</div>
              </div>
              
            </div>

          </div>
        );
      }


export default Buildings;
