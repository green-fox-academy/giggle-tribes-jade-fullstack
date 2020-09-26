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

const AddBuilding = ({ resources, addBuilding, setErrorState }) => {
  const onButtonClick = buildingData => {
    const goldAmount = resources.find(resource => resource.type === 'gold')
      .amount;
    if (buildingData.cost > goldAmount) {
      setErrorState('Not enough gold');
    } else {
      addBuilding(buildingData.type);
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

const mapStateToProps = ({ resources }) => {
  return { resources };
};
const mapDispatchToProps = dispatch => {
  return {
    addBuilding: type => {
      dispatch(addBuildingAction(type));
    },
    setErrorState: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBuilding);
