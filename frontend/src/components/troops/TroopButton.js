import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './TroopButton.css';
import { setErrorAction } from '../../actions/ErrorActions';
import Troop from '../../assets/icons/troops.svg';

function TroopButton({ troopSummary }) {
  return (
    <Button className="troops button" onClick={() => {}}>
      <img className="troops button image" src={Troop} alt="troop icon" />
      <p>{troopSummary.amount + ' Troop level ' + troopSummary.level}</p>
    </Button>
  );
}

TroopButton.propTypes = {
  kingdom: PropTypes.any.isRequired,
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    setError: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TroopButton);
