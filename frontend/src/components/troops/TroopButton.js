import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import './TroopButton.css';
import Gold from '../../assets/sources/GoldIcon.svg';
import Troop from '../../assets/icons/troops.svg';
import TroopUpgradeBox from './TroopUpgradeBox';
import Error from '../Error';

export default function TroopButton({ troopSummary }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="troopsButton">
      <Button className="troops button" onClick={handleClickOpen} size="small">
        <img className="troops button image" src={Troop} alt="troop icon" />
        <p>{troopSummary.amount + ' Troop level ' + troopSummary.level}</p>
      </Button>
      <p className="costLabel">
        <p>
          Upgrade <br />
          10 <img className="inlineIcon" src={Gold} alt="attack icon" /> per
          troop
        </p>
      </p>
      <TroopUpgradeBox open={open} setOpen={setOpen} />
      <Error />
    </div>
  );
}

TroopButton.propTypes = {
  troopSummary: PropTypes.object.isRequired,
};
