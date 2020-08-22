import React from 'react';
import { connect } from 'react-redux';
import AddBuildingButton from './AddBuildingButton';
import './AddBuilding.css';
import addBuildingService from '../../services/addBuildingService';
import { addBuildingAction } from '../../actions/BuildingsActions';
import { setErrorAction, resetErrorAction } from '../../actions/ErrorActions';

const buttons = [
  { type: 'farm', cost: 1000 },
  { type: 'mine', cost: 100 },
  { type: 'academy', cost: 100 },
];

const AddBuilding = ({
  resources,
  kingdom,
  addBuilding,
  error,
  setErrorState,
  resetErrorState,
}) => {
  //const [error, setError] = useState(false);

  const onButtonClick = buildingData => {
    const goldAmount = resources[1].amount;
    if (error) resetErrorState();
    if (buildingData.cost > goldAmount) {
      setErrorState('Not enough gold');
    } else {
      console.log(addBuilding(kingdom, buildingData.type));
    }
  };

  const onErrorClick = () => {
    if (error) resetErrorState();
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
      {error && (
        <p className="error visible" onClick={onErrorClick}>
          {error}
        </p>
      )}
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
    resetErrorState: () => {
      dispatch(resetErrorAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBuilding);
