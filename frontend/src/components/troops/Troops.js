import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Troops.css';
import { getTroopsAction } from '../../actions/TroopsActions';
import Button from './TroopButton';

import Troop from '../../assets/icons/troopbg.svg';

function Troops({ kingdom, troops, get }) {
  useEffect(() => {
    get(kingdom);
  }, [kingdom, get]);

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
          return <Button key={i} troopSummary={troopSummary}></Button>;
        })}
      </div>
    </div>
  );
}

Troops.propTypes = {
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
