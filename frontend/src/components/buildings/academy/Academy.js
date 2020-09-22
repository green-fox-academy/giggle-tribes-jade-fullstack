import React from 'react';

import './Academy.css';
import Barrack from '../../../assets/buildings/barracks.svg';
import Attack from '../../../assets/troops/attack1.png';
import Defence from '../../../assets/troops/defence1.png';
import Food from '../../../assets/sources/FoodIcon.svg';
import Button from './CreateTroopButton';
import Error from '../../Error';

function Academy() {
  const academyLevel = 1;
  return (
    <div className="academy">
      <img className="academy" src={Barrack} alt="academy icon" />
      <div className="description">
        <p>
          You can create troops in your Academy. The higher level your Academy
          is, the stronger your troops are.
        </p>
        <p>
          Every level increases 1{' '}
          <img className="inlineIcon" src={Attack} alt="attack icon" /> and 1{' '}
          <img className="inlineIcon" src={Defence} alt="defence icon" /> of the
          Troops.
        </p>
        <p>
          Every Troop eats 1{' '}
          <img className="inlineIcon" src={Food} alt="food icon" /> every
          minute.
        </p>
      </div>
      <div className="academyinfo">
        <p>Academy</p>
        <p>{'Level ' + academyLevel}</p>
      </div>
      <Button />
      <Error />
    </div>
  );
}

export default Academy;
