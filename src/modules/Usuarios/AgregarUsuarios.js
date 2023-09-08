import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { addDataToAirtable } from '../../helpers/airTableHelper';
import NotificacionInferior from '../../components/NotificacionInferior';

function AgregarUsuarios({ handleGetDataTable }) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAgregarUsuario = async () => {
    if (nombre === '' || password === '') {
      setSnackbarMessage("Completa todos los campos antes de agregar un usuario");
      setSnackbarType("error");
      setSnackbarOpen(true);
      return;
    }

    const dataToAdd = {
      "Name": nombre,
      "Password": password,
      "Email": email
    };

    let nombreTabla = process.env.REACT_APP_TABLE_NAME_USER
    setCargando(true);

    try {
      const response = await addDataToAirtable(nombreTabla, dataToAdd);
      if (response) {
        setSnackbarMessage("Usuario Agregado correctamente")
        setSnackbarType("success")
        setSnackbarOpen(true)
        handleClose();

        setTimeout(async () => {
          await handleGetDataTable(nombreTabla);
        }, 1500);
      } else {
        setSnackbarMessage("Error al agregar usuario")
        setSnackbarType("error")
        setSnackbarOpen(true)
      }
    } catch (error) {
      setSnackbarMessage("Error al agregar usuario")
      setSnackbarType("error")
      setSnackbarOpen(true)
    }

    setCargando(false);
    handleLimpiarFormulario();
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAgregarUsuario();
  };

  const handleLimpiarFormulario = () => {
    setNombre("");
    setPassword("");
    setNombreError(false);
    setPasswordError(false);
    setEmailError(false)
  }

  return (
    <div>
      <Button onClick={handleOpen} color='success' size='small' startIcon={<PersonAddIcon />}>
        Agregar Usuario
      </Button>
      <NotificacionInferior
        open={snackbarOpen}
        type={snackbarType}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginTop: '10px' }}
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              label='Nombre'
              fullWidth
              autoComplete="name"
              error={nombreError}
              helperText={nombreError ? 'Este campo es requerido' : ''}
            />
            <TextField
              sx={{ marginTop: '10px' }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label='Email'
              fullWidth
              autoComplete="email"
              error={emailError}
              helperText={emailError ? 'Este campo es requerido' : ''}
            />
            <TextField
              sx={{ marginTop: '15px' }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label='Contraseña'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge='end'
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="new-password"
              error={passwordError}
              helperText={passwordError ? 'Este campo es requerido' : ''}
            />
            <DialogActions>
              <Button onClick={handleClose} color='error'>
                Cancelar
              </Button>
              <Button type='submit' color='primary' disabled={cargando}>
                {cargando ? <CircularProgress size={24} /> : 'Agregar'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AgregarUsuarios;
