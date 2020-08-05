import React from 'react';
import './AddBuildingButton.css';

const AddBuildingButton = ({buildingData,onClick,goldAmount}) => {
    return (
        <div className='button' onClick={() => onClick(buildingData,goldAmount)}>
            <div className={'buttonimage ' + buildingData.type}></div>
            <h4>Add {buildingData.type.charAt(0).toUpperCase() + buildingData.type.slice(1)}</h4>
        </div>
    );
};

export default AddBuildingButton;
