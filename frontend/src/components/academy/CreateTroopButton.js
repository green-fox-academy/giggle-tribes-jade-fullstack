import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './CreateTroopButton.css';
import Troop from '../../assets/troops/addTroop-removebg-preview.png';
import Gold from '../../assets/sources/GoldIcon.svg';

export default function createTroopButton({
  kingdomID,
  goldAmount,
  troopLimit,
  troopAmount,
  setTroopAmount,
}) {
  const addTroop = async kingdomID => {
    if (troopLimit > troopAmount && goldAmount > 10) {
      await fetch(`http://localhost:5000/api/kingdom/${kingdomID}/troops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
        },
      })
        .then(res => res.json())
        .then(response => response.resources)
        .then(resources => resources)
        .catch(console.log);
    } else if (goldAmount < 10) {
      console.log("You don't have enough money.");
    } else if (troopLimit <= troopAmount && goldAmount > 10) {
      console.log('You reached the storage limit, upgrade Townhall first.');
    }
  };

  return (
    <Button
      className="addtroopBTN"
      onClick={() => {
        addTroop(kingdomID);
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

createTroopButton.propTypes = {
  kingdomID: PropTypes.any.isRequired,
};
