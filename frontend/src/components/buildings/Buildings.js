import React, { useEffect } from 'react';
import './Buildings.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import farm from '../../assets/buildings/farm.svg';
import mine from '../../assets/buildings/mine.svg';
import townhall from '../../assets/buildings/townhall.svg';
import academy from '../../assets/buildings/barracks.svg';
import { setErrorAction } from '../../actions/ErrorActions';
import { getBuildingsAction} from '../../actions/BuildingsActions';
import { useHistory } from 'react-router-dom';

function Buildings(){
  
  const buildingIcons = {
    farm: farm,
    mine: mine,
    townhall: townhall,
    academy: academy,
  };

  const buildings = useSelector(state => state.buildings)
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    dispatch(getBuildingsAction)
  }, [dispatch])

  function goToBuilding(buildingId){
    history.push(`/kingdom/buildings/${buildingId}`);
  }

  return (
    <section className="buildings">
        
    {buildings.map(building => (
      <div className="icons" onClick={() => goToBuilding(building.id)}>
        <img src={buildingIcons[building.type]} alt={building.type} className="image"></img>
        <p className="buildingName">{building.type} level {building.level}</p> 
        <p></p>
      </div>
      ))}
        
    </section>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    getBuilding: (kingdomID, type) => {
      dispatch(getBuildingsAction(kingdomID, type));
    },
    setErrorState: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
