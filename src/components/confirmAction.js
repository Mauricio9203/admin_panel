import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmAction({confirmacionOpen, setConfirmacionOpen, message, handleAction}) {
  const [open, setOpen] = useState(confirmacionOpen);

  const handleClose = () => {
    setOpen(false);
    setConfirmacionOpen(false)
  };

  const handleConfirm = () => {
    handleAction()
    setConfirmacionOpen(false)
  }

  useEffect(() => {
    setOpen(confirmacionOpen)
  }, [confirmacionOpen])
  

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>No</Button>
          <Button color='primary' onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmAction;
