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

              <div>
                <img src="../buildings/townhall.jpg" alt="townhall"></img>
                <img src="../buildings/farm.png" alt="farm"></img>
                <img src="../buildings/barracks.png" alt="academy"></img>
                <img src="../buildings/mine.png" alt="mine"></img>
              </div>

              <div>
                <p>townhall Level 1</p>
                <p>farm Level 1</p>
                <p>academy Level 1</p>
                <p>mine Level 1</p>
              </div>
            
              <div>
                <img src="../buildings/addfarm.png" alt="add farm"></img>
                <img src="../buildings/addacademy.png" alt="add academy"></img>
                <img src="../buildings/addmine.png" alt="add mine"></img>
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
