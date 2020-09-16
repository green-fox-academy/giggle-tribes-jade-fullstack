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

function TroopUpgradeBox({ open, setOpen, kingdom, upgrade }) {
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const upgradeTroopClickOn = () => {
    upgrade(kingdom, amount);
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
        <Button onClick={upgradeTroopClickOn} color="primary">
          Upgrade
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TroopUpgradeBox.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  kingdom: PropTypes.number.isRequired,
  troops: PropTypes.array.isRequired,
};

const mapStateToProps = ({ kingdom, troops }) => {
  return { kingdom, troops };
};

const mapDispatchToProps = dispatch => {
  return {
    upgrade: (kingdomId, amount) => {
      dispatch(upgradeTroopAction(kingdomId, amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TroopUpgradeBox);
