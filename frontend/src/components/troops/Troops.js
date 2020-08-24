import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Troops.css';
import Troop from '../../assets/icons/troopbg.svg';
import Troop2 from '../../assets/icons/troops.svg';

function Troops() {
  const troops = [
    {
      id: 1,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: 12345789,
      finished_at: 12399999,
    },
    {
      id: 2,
      level: 1,
      hp: 1,
      attack: 1,
      defence: 1,
      started_at: 12345789,
      finished_at: 12399999,
    },
    {
      id: 3,
      level: 2,
      hp: 2,
      attack: 2,
      defence: 2,
      started_at: 12345789,
      finished_at: 12399999,
    },
  ];
  const analyseTroops = troops => {
    const result = {
      attack: 0,
      defence: 0,
      sustenance: 0,
      amountPerLevel: [],
    };
    troops.forEach(troop => {
      result.attack += troop.attack;
      result.defence += troop.defence;
      result.sustenance++;
      if (
        result.amountPerLevel.length === 0 ||
        !result.amountPerLevel.find(e => e.level === troop.level)
      ) {
        result.amountPerLevel.push({ level: troop.level, amount: 1 });
      } else {
        const index = result.amountPerLevel.findIndex(
          e => e.level === troop.level
        );
        result.amountPerLevel[index].amount++;
      }
    });
    return result;
  };

  const troopsSummary = analyseTroops(troops);

  return (
    <div className="troops component">
      <img className="troops component image" src={Troop} alt="troop icon" />
      <div className="troops component info">
        <p>{'Attack: ' + troopsSummary.attack}</p>
        <p>{'Defence: ' + troopsSummary.defence}</p>
        <p>{'Sustenance: ' + troopsSummary.sustenance}</p>
      </div>
      <div className="troops component main">
        {troopsSummary.amountPerLevel.map((troopSummary, i) => {
          return (
            <button key={i}>
              <img
                className="troops button image"
                src={Troop2}
                alt="troop icon"
              />
              <p>
                {troopSummary.amount + ' Troop level ' + troopSummary.level}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Troops);
