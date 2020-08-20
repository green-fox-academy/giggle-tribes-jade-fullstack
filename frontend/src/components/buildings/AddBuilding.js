import React,{ useState } from 'react';
import AddBuildingButton from './AddBuildingButton';
import './AddBuilding.css';
import addBuildingService from '../../services/addBuildingService';

const buttons = [
    { type: 'farm', cost: 1000 },
    { type: 'mine', cost: 100 },
    { type: 'academy', cost: 100 }
];

const AddBuilding = ({goldAmount,kingdomId}) => {

    const [error, setError] = useState(false);

    const onButtonClick = (buildingData,goldAmount) => {
        if (error) setError(false);
        if (buildingData.cost > goldAmount) {
            setError(true);
        } else {
            console.log( addBuildingService(kingdomId,buildingData.type) );
        }
    };

    const onErrorClick = () => {
        if (error) setError(false);
    };

    return (
        <section className='add_building'>
            {buttons.map( (buildingData,i) => (
                <AddBuildingButton key={i} buildingData={buildingData} goldAmount={goldAmount} onClick={onButtonClick}/>
            ))}
            { error && <p className='error visible' onClick={onErrorClick} >Not enough gold.</p> }
        </section>
    );
};

export default AddBuilding;
