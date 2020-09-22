import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

import './TroopButton.css';
import { upgradeTroopAction } from '../../actions/TroopsActions';
import { setErrorAction } from '../../actions/ErrorActions';

function TroopUpgradeBox({
  open,
  setOpen,
  level,
  troopAmount,
  kingdom,
  upgrade,
  resources,
  buildings,
  setError,
}) {
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const upgradeTroopClickOn = () => {
    const troopUpgradeConditions = {
      upgradeCost: 10,
      goldAmount: resources.find(resource => resource.type === 'gold').amount,
      academyLevel:
        buildings.length > 0
          ? buildings.find(e => e.type === 'academy').level
          : 1,
    };

    if (
      troopUpgradeConditions.goldAmount >= troopUpgradeConditions.upgradeCost &&
      level < troopUpgradeConditions.academyLevel &&
      amount <= troopAmount
    ) {
      upgrade(kingdom, amount, level);
    } else if (
      troopUpgradeConditions.goldAmount < troopUpgradeConditions.upgradeCost
    ) {
      setError("You don't have enough money.");
    } else if (amount > troopAmount) {
      setError(
        `Amount was too much, you have ${troopAmount} troops in that troop level`
      );
    } else {
      setError('Upgrade is not allowed, academy level too low');
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Troop Upgrade</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide amount of troops to be upgraded and click upgrade.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Amount"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          className="TroopUpgradeBTN"
          onClick={upgradeTroopClickOn}
          color="primary"
        >
          Upgrade
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TroopUpgradeBox.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  troopAmount: PropTypes.number.isRequired,
  kingdom: PropTypes.string.isRequired,
  troops: PropTypes.array.isRequired,
  resources: PropTypes.array.isRequired,
  buildings: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = ({ kingdom, troops, resources, buildings }) => {
  return { kingdom, troops, resources, buildings };
};

const mapDispatchToProps = dispatch => {
  return {
    upgrade: (kingdomId, amount) => {
      dispatch(upgradeTroopAction(kingdomId, amount));
    },
    setError: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TroopUpgradeBox);
