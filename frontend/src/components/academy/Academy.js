import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import './Academy.css';
import Barrack from '../../assets/buildings/barracks.svg';
import Attack from '../../assets/troops/attack1.png';
import Defence from '../../assets/troops/defence1.png';
import Food from '../../assets/sources/FoodIcon.svg';
import Button from './CreateTroopButton';

export default function Academy({ kingdomID }) {
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
        <p>{'Level 1'}</p>
      </div>
      <Button />
    </div>
  );
}

Academy.propTypes = {
  kingdomID: PropTypes.any.isRequired,
};
