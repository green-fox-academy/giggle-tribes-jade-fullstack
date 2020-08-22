import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './CreateTroopButton.css';
import { addTroopAction } from '../../../actions/TroopsActions';
import { setErrorAction } from '../../../actions/ErrorActions';
import Troop from '../../assets/troops/addTroop-removebg-preview.png';
import Gold from '../../assets/sources/GoldIcon.svg';

function CreateTroopButton({
  kingdom,
  resources,
  buildings,
  troops,
  addTroop,
  setError,
}) {
  const onClickAddTroop = () => {
    const troopCost = 10;
    const goldAmount = resources[1].amount;
    const troopsLimit = buildings.length > 0 ? buildings[0].level * 100 : 100;
    if (goldAmount >= troopCost && troops.length < troopsLimit) {
      addTroop(kingdom);
    } else if (goldAmount < troopCost) {
      setError("You don't have enough money.");
    } else {
      setError('You reached the storage limit, upgrade Townhall first.');
    }
  };

  return (
    <Button
      className="addtroopBTN"
      onClick={() => {
        onClickAddTroop();
      }}
    >
      <img className="addtroop" src={Troop} alt="troop icon" />
      <div>
        <p>create troop level 1</p>
        <p>
          10 <img className="inlineIcon" src={Gold} alt="gold icon" /> 1:00
        </p>
      </div>
    </Button>
  );
}

CreateTroopButton.propTypes = {
  kingdom: PropTypes.any.isRequired,
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    addTroop: kingdomID => {
      dispatch(addTroopAction(kingdomID));
    },
    setError: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTroopButton);
