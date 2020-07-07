import React, { useState } from 'react';
import './Resource.css';
import Farm from '../../assets/buildings/farm.svg';
import Mine from '../../assets/buildings/mine.svg';
import Food from '../../assets/sources/FoodIcon.svg';
import Gold from '../../assets/sources/GoldIcon.svg';

export default function () {
  const [foodAmount, setFoodAmount] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);

  const getResources = async kingdomID => {
    await fetch(`http://localhost:5000/api/kingdom/${kingdomID}/resource`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => response.resources)
      .then(resources =>
        resources.map(resource => {
          if (resource.type === 'food') {
            props.setFoodAmount(resource.amount);
            setFoodAmount(resource.amount);
            return foodAmount;
          } else {
            props.setGoldAmount(resource.amount);
            setGoldAmount(resource.amount);
            return goldAmount;
          }
        })
      )
      .catch(console.log);
  };

  getResources(1);

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
