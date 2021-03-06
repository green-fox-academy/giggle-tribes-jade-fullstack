import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Resource.css';
import { setResources } from '../../actions/ResourcesActions';

import Farm from '../../assets/buildings/farm.svg';
import Mine from '../../assets/buildings/mine.svg';
import Food from '../../assets/sources/FoodIcon.svg';
import Gold from '../../assets/sources/GoldIcon.svg';

function Resource({ resources, set }) {
  useEffect(() => {
    set();
  }, [set]);

  if (resources.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="resources">
      <img className="resource farm" src={Farm} alt="farm icon" />
      <div className="resource food">
        <div>
          <h1>{resources.find(resource => resource.type === 'food').amount}</h1>
          <img className="food" src={Food} alt="food icon" />
        </div>
        <p
          className={
            resources.find(resource => resource.type === 'food').generation < 0
              ? 'red'
              : 'green'
          }
        >
          {resources.find(resource => resource.type === 'food').generation < 0
            ? '-'
            : '+' +
              resources.find(resource => resource.type === 'food')
                .generation}{' '}
          / minute
        </p>
      </div>
      <img className="resource mine" src={Mine} alt="mine icon" />
      <div className="resource gold">
        <div>
          <h1>{resources.find(resource => resource.type === 'gold').amount}</h1>
          <img className="gold" src={Gold} alt="gold icon" />
        </div>
        <p
          className={
            resources.find(resource => resource.type === 'gold').generation < 0
              ? 'red'
              : 'green'
          }
        >
          {resources.find(resource => resource.type === 'gold').generation < 0
            ? '-'
            : '+' +
              resources.find(resource => resource.type === 'gold')
                .generation}{' '}
          / minute
        </p>
      </div>
    </div>
  );
}

Resource.propTypes = {
  resources: PropTypes.array,
};

const mapStateToProps = ({ resources }) => {
  return { resources };
};
const mapDispatchToProps = dispatch => {
  return {
    set: () => {
      dispatch(setResources());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
