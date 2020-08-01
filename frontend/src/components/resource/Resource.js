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
    await fetch(`http://localhost:5000/api/kingdoms/${kingdomID}/resource`, {
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
