import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

type DialogProps = {
  handleClose: () => void;
  onDelete: () => void;
  open: boolean;
};

const AlertDialog = ({ handleClose, onDelete, open }: DialogProps) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete User?</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>

        <Button onClick={onDelete} color="secondary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default AlertDialog;
