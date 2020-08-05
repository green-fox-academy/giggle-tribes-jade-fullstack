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
              <img src="../buildings/townhall.png" alt="townhall"></img>
              <img src="../buildings/farm.png" alt="farm"></img>
              <img src="../buildings/barracks.png" alt="academy"></img>
              <img src="../buildings/mine.png" alt="mine"></img>
            </div>
          </div>
        );
      }


export default Buildings;
