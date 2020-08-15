<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Resource.css';
import Farm from '../../assets/buildings/farm.svg';
import Mine from '../../assets/buildings/mine.svg';
import Food from '../../assets/sources/FoodIcon.svg';
import Gold from '../../assets/sources/GoldIcon.svg';

export default function Resource({ kingdomID }) {
  const [foodAmount, setFoodAmount] = useState(null);
  const [goldAmount, setGoldAmount] = useState(null);

  const getResources = async kingdomID => {
    await fetch(`http://localhost:5000/api/kingdom/${kingdomID}/resource`, {
      headers: {
        'Content-Type': 'application/json',
        TRIBES_TOKEN: localStorage.getItem('TRIBES_TOKEN'),
      },
    })
      .then(res => res.json())
      .then(response => response.resources)
      .then(resources =>
        resources.map(async resource => {
          if (resource.type === 'food') {
            setFoodAmount(resource.amount);
          } else {
            setGoldAmount(resource.amount);
          }
        })
      )
      .catch(console.log);
  };

  useEffect(() => {
    getResources(kingdomID);
  }, [kingdomID]);

  return (
    <div className="resources">
      <img className="resource farm" src={Farm} alt="farm icon" />
      <div className="resource food">
        <div>
          <h1>{foodAmount}</h1>
          <img className="food" src={Food} alt="food icon" />
        </div>
        <p>{} / minute</p>
      </div>
      <img className="resource mine" src={Mine} alt="mine icon" />
      <div className="resource gold">
        <div>
          <h1>{goldAmount}</h1>
          <img className="gold" src={Gold} alt="gold icon" />
        </div>
        <p>{} / minute</p>
      </div>
    </div>
  );
}

Resource.propTypes = {
  kingdomID: PropTypes.any.isRequired,
};
=======
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Resource.css';
import { setResources } from '../../actions/ResourcesActions';

import Farm from '../../assets/buildings/farm.svg';
import Mine from '../../assets/buildings/mine.svg';
import Food from '../../assets/sources/FoodIcon.svg';
import Gold from '../../assets/sources/GoldIcon.svg';

function Resource({ kingdom, resources, set }) {
  useEffect(() => {
    set(kingdom);
  }, [kingdom, set]);

  if (resources.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="resources">
      <img className="resource farm" src={Farm} alt="farm icon" />
      <div className="resource food">
        <div>
          <h1>{resources[0].amount}</h1>
          <img className="food" src={Food} alt="food icon" />
        </div>
        <p className={resources[0].generation < 0 ? 'red' : 'green'}>
          {resources[0].generation < 0 ? '-' : '+' + resources[0].generation} /
          minute
        </p>
      </div>
      <img className="resource mine" src={Mine} alt="mine icon" />
      <div className="resource gold">
        <div>
          <h1>{resources[1].amount}</h1>
          <img className="gold" src={Gold} alt="gold icon" />
        </div>
        <p className={resources[1].generation < 0 ? 'red' : 'green'}>
          {resources[1].generation < 0 ? '-' : '+' + resources[1].generation} /
          minute
        </p>
      </div>
    </div>
  );
}

Resource.propTypes = {
  kingdom: PropTypes.any.isRequired,
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    set: kingdomID => {
      dispatch(setResources(kingdomID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
>>>>>>> 0e29a74ac91b26588602107059eaa740036b78a7
