import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import './TroopButton.css';
import Troop from '../../assets/icons/troops.svg';
import {  } from '../../actions/TroopsActions';

export default function TroopButton({ troopSummary, kingdom, troops,  }) {
  const upgradeTroop = ()


  return (
    <Button className="troops button" onClick={() => {}}>
      <img className="troops button image" src={Troop} alt="troop icon" />
      <p>{troopSummary.amount + ' Troop level ' + troopSummary.level}</p>
    </Button>
  );
}

TroopButton.propTypes = {
  troopSummary: PropTypes.object.isRequired,
  kingdom: PropTypes.number.isRequired,
  troops: PropTypes.array.isRequired,
};

const mapStateToProps = ({ kingdom, troops }) => {
  return { kingdom, troops };
};

const mapDispatchToProps = dispatch => {
  return {
    get: kingdomId => {
      dispatch(getTroopsAction(kingdomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Troops);

