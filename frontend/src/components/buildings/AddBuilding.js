import React from 'react';
import AddBuildingButton from './AddBuildingButton';
import './AddBuilding.css';

const buttons = [
    { type: 'farm' },
    { type: 'mine' },
    { type: 'academy' }
];

const onButtonClick = (type) => {
    alert(type);
};

const AddBuilding = ({goldAmount}) => {

    return (
        <section className='add_building'>
            {buttons.map( (button,i) => (
                <AddBuildingButton key={i} type={button.type} onClick={ () => onButtonClick(button.type) }/>
            ))}
        </section>
    );
};

export default AddBuilding;
