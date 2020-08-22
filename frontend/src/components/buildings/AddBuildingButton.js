import React from 'react';
import './AddBuildingButton.css';

const AddBuildingButton = ({ buildingData, onClick }) => {
  return (
    <div className="button" onClick={() => onClick(buildingData)}>
      <div className={'buttonimage add' + buildingData.type}></div>
      <p>
        Add{' '}
        {buildingData.type.charAt(0).toUpperCase() + buildingData.type.slice(1)}
      </p>
    </div>
  );
};

export default AddBuildingButton;
