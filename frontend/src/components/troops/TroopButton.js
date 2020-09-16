import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import './TroopButton.css';
import Troop from '../../assets/icons/troops.svg';
import TroopUpgradeBox from './TroopUpgradeBox';
import Error from '../Error';

function TroopButton({ troopSummary }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className="troops button" onClick={handleClickOpen}>
        <img className="troops button image" src={Troop} alt="troop icon" />
        <p>{troopSummary.amount + ' Troop level ' + troopSummary.level}</p>
      </Button>
      <TroopUpgradeBox open={open} setOpen={setOpen} />
      <Error />
    </div>
  );
}

TroopButton.propTypes = {
  troopSummary: PropTypes.object.isRequired,
};

const mapStateToProps = ({ kingdom, troops }) => {
  return { kingdom, troops };
};

export default connect(mapStateToProps)(TroopButton);
