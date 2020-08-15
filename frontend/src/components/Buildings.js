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
                <img src="../buildings/farm.png" alt="farm" className="image"></img>
                <img src="../buildings/barracks.png" alt="academy" className="image"></img>
                <img src="../buildings/mine.png" alt="mine" className="image"></img>
              </div>

              <div>
                <p>townhall Level 1</p>
                <p>farm Level 1</p>
                <p>academy Level 1</p>
                <p>mine Level 1</p>
              </div>
            
              <div className="addBuildings">
                <button><img src="../buildings/addfarm.png" alt="add farm" className="image"></img></button>
                <button><img src="../buildings/addacademy.png" alt="add academy" className="image"></img></button>
                <button><img src="../buildings/addmine.png" alt="add mine" className="image"></img></button>
              </div>

              <div>
                <p>add farm</p>
                <p>add academy</p>
                <p>add mine</p>
              </div>

            </div>

          </div>
        );
      }


export default Buildings;
