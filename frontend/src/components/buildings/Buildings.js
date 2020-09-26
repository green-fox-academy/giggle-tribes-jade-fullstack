import React from 'react';
import './Buildings.css';
import { connect } from 'react-redux';
import farm from '../../assets/buildings/farm.svg';
import mine from '../../assets/buildings/mine.svg';
import townhall from '../../assets/buildings/townhall.svg';
import academy from '../../assets/buildings/barracks.svg';
import { setErrorAction } from '../../actions/ErrorActions';
import { getBuildingsAction} from '../../actions/BuildingsActions';


function Buildings(){
      
        const buildingIcons = {
          farm: farm,
          mine: mine,
          townhall: townhall,
          academy: academy,
        };
      const buildings = useSelector(state => state.buildings)
      const dispatch = useDispatch()
      useEffect(() => {
        dispatch(getBuildingsAction)
      }, [])

function buildingLevel({kingdom}){

}
        
  return (
    <section className="buildings">
        
  { buildings.map(building => (
      <div className="icons" onClick={() => goToBuilding(building.id)}>
        <img src={buildingIcons[building.type]} alt={building.type} className="image"></img>
        <p className="buildingName">{building.name}</p> 
        <p>{building.level}</p>
      </div>
      ))}
      
      <div className="icons">
        <img src={buildingIcons.farm} alt="farm" className="image"></img>
        <p className="buildingName">Farm</p>
        <p>{buildingLevel.farm}</p>
      </div>
      
      <div className="icons">
        <img src={buildingIcons.academy} alt="academy" className="image"></img>
        <p className="buildingName">Academy</p>
        <p>{buildingLevel.academy}</p>
      </div>
      
      <div className="icons">
        <img src={buildingIcons.mine} alt="mine" className="image"></img>
        <p className="buildingName">Mine</p>
        <p>{buildingLevel.mine}</p>
      </div>
        
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
