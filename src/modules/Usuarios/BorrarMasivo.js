import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { deletById } from '../../helpers/airTableHelper';
import NotificacionInferior from '../../components/NotificacionInferior';

const BorrarMasivo = ({ cantidad, selectedItems = [], handleGetDataTable }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [elementosEliminados, setElementosEliminados] = useState(`¿Estás seguro de que deseas borrar estos elementos?`);
  const [eliminacionEnProgreso, setEliminacionEnProgreso] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmBorrar = async () => {
    const tabla = process.env.REACT_APP_TABLE_NAME_USER
    let eliminados = 0;

    setEliminacionEnProgreso(true);

    for (const item of selectedItems) {
      try {
        const success = await deletById(item, tabla);
        if (success) {
          eliminados = eliminados + 1;
          setElementosEliminados(`${eliminados} de ${cantidad} registros eliminados.`);
        } else {
          console.log("error en la eliminación");
        }
      } catch {
        // Manejar el error si es necesario
      }
    }

    setSnackbarMessage('Registros eliminados exitosamente.')
    setSnackbarType("success")
    setSnackbarOpen(true)
    handleCloseDialog()
    setEliminacionEnProgreso(false);
    setTimeout(() => {
      handleGetDataTable(tabla)
      setElementosEliminados("¿Estás seguro de que deseas borrar estos elementos?")
    }, 1000); 
    
  };

  return (
    <div>
      <Button onClick={handleOpenDialog} color='error' size='small' startIcon={<DeleteIcon />}>
        Borrar selección ({cantidad})
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Eliminar selección</DialogTitle>
        <DialogContent>
          {elementosEliminados}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" disabled={eliminacionEnProgreso}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmBorrar} color="error" disabled={eliminacionEnProgreso}>
            {eliminacionEnProgreso ? <CircularProgress size={24} /> : `Borrar (${cantidad})`}
          </Button>
        </DialogActions>
      </Dialog>
      <NotificacionInferior
        open={snackbarOpen}
        type={snackbarType}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
        />
    </div>
  );
};

export default BorrarMasivo;
