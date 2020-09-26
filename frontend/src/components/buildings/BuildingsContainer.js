import React from 'react';
import AddBuilding from './AddBuilding';
import Buildings from './Buildings'
import './BuildingsContainer.css';

export default function BuildingsContainer() {
  return (
    <div className="buildings">
      <AddBuilding />
      <Buildings />
    </div>
  );
}
