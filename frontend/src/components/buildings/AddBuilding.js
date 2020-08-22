import React from 'react';
import { connect } from 'react-redux';
import AddBuildingButton from './AddBuildingButton';
import './AddBuilding.css';
import { addBuildingAction } from '../../actions/BuildingsActions';
import { setErrorAction } from '../../actions/ErrorActions';
import Error from '../Error';

const buttons = [
  { type: 'farm', cost: 1000 },
  { type: 'mine', cost: 100 },
  { type: 'academy', cost: 100 },
];

const AddBuilding = ({ resources, kingdom, addBuilding, setErrorState }) => {
  const onButtonClick = buildingData => {
    const goldAmount = resources[1].amount;
    if (buildingData.cost > goldAmount) {
      setErrorState('Not enough gold');
    } else {
      console.log(addBuilding(kingdom, buildingData.type));
    }
  };

  return (
    <section className="add_building">
      {buttons.map((buildingData, i) => (
        <AddBuildingButton
          key={i}
          buildingData={buildingData}
          onClick={onButtonClick}
        />
      ))}
      <Error />
    </section>
  );
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    addBuilding: (kingdomID, type) => {
      dispatch(addBuildingAction(kingdomID, type));
    },
    setErrorState: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBuilding);
