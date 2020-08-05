import React from 'react';
import './AddBuildingButton.css';

const AddBuildingButton = ({type}) => {
    return (
        <div className='button'>
            <div className={'buttonimage ' + type}></div>
            <h4>Add {type.charAt(0).toUpperCase() + type.slice(1)}</h4>
        </div>
    );
};

export default AddBuildingButton;
