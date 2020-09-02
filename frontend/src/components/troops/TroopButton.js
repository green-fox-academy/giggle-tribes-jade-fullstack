import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import './TroopButton.css';
import Troop from '../../assets/icons/troops.svg';

export default function TroopButton({ troopSummary }) {
  return (
    <Button className="troops button" onClick={() => {}}>
      <img className="troops button image" src={Troop} alt="troop icon" />
      <p>{troopSummary.amount + ' Troop level ' + troopSummary.level}</p>
    </Button>
  );
}

TroopButton.propTypes = {
  troopSummary: PropTypes.any.isRequired,
};
