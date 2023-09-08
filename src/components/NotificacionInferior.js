import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const NotificacionInferior = ({ open, type, message, handleClose }) => {
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Set the anchor origin
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleCloseSnackbar}
        severity={type}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default NotificacionInferior;
