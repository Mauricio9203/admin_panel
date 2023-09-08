import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { updateCierreSesion,updateSesion } from '../reducers/LoginSlice';


export default function ModalConfirmacion({handleCerrarModalCerrarSesion}) {
  const dispatch = useDispatch();
  const selectedModal = useSelector((state) => state.cierreSesionSlice);
  

  const handleClose = () => {
    dispatch(updateCierreSesion(false))
  };

  const cerrarSesion = () => {
    dispatch(updateSesion(false))
    localStorage.setItem('isLoggedIn', false);
    handleCerrarModalCerrarSesion()  
  }

  return (
    <div>
      <Dialog
        open={selectedModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            backgroundColor: `rgba(255, 255, 255, 0.2)`, // Fondo con transparencia
            backdropFilter: `blur(10px)`, // Efecto de desenfoque
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Cierre de sesión"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas cerrar la sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant='outlined' onClick={handleClose}>No</Button>
          <Button variant='outlined' onClick={cerrarSesion} autoFocus>Si</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
