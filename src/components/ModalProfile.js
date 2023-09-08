import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Divider, Fade, Typography, Grid, TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateValueModalProfile } from '../reducers/ModalSlice';
import { editAirtableRecord, getUserById } from '../helpers/airTableHelper';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NotificacionInferior  from '../components/NotificacionInferior'

const ModalProfile = () => {
  const dispatch = useDispatch();
  const modalValue = useSelector((state) => state.ModalProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = () => {
    dispatch(updateValueModalProfile(false));
  };

  const handleGetInfo = async () => {
    let id = localStorage.getItem("idPerfil");
    setCargando(true);
    let datos = await getUserById(id, process.env.REACT_APP_TABLE_NAME_USER);
    setCargando(false);
    
    setNombre(datos["Name"]);
    setEmail(datos["Email"]);
    setPassword(datos["Password"]);
  };

  useEffect(() => {
    if (modalValue === true) {
      handleGetInfo();
    }
  }, [modalValue]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSaveChanges = async () => {
    try {
      setActualizando(true);

      let valorEditar = {"Name": nombre, "Email": email, "Password": password};
      let nombreTabla = process.env.REACT_APP_TABLE_NAME_USER;
      let idUsuario = localStorage.getItem("idPerfil");
      let response = await editAirtableRecord(idUsuario, nombreTabla, valorEditar);

      if(response === true){
        handleClose()
        setSnackbarMessage("Datos Perfil actualizados.");
        setSnackbarType("success");
        setSnackbarOpen(true);
      }

      setActualizando(false);
    } catch (error) {
      console.error("Error:", error);
      setActualizando(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSaveChanges();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal
        open={modalValue}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Fade in={modalValue} timeout={400}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '600px',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              '@media (max-width:600px)': {
                top: '10%',
                left: '5%',
                width: '90%',
                transform: 'none',
                maxWidth: '100%',
                maxHeight: '80%',
                overflowY: 'auto'
              },
            }}
          >
            <Typography variant='h6' >
              Configuración de Perfil
            </Typography>
            <Divider/>
            {cargando && (
              <Box
                sx={{
                  marginTop: "5%",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress size={60} color='secondary' />
              </Box>
            )}
            {!cargando && (
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2} sx={{marginTop: "5px"}}>
                  <Grid item xs={12} md={12}>
                      <TextField sx={{width: '100%'}}  label="Nombre" autoComplete='username' value={nombre} onChange={(e) => setNombre(e.target.value)} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <TextField sx={{width: '100%'}}  label="Email" autoComplete='email'  value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                      <TextField
                        sx={{width: '100%'}}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete='current-password'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Button
                        type="submit"
                        variant="outlined"
                        sx={{width:"100%"}}
                        color='primary'
                        disabled={actualizando}
                      >
                        {actualizando ? <CircularProgress size={24} color='primary' /> : "Guardar Cambios"}
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        color='error'
                        sx={{width:"100%"}}
                        disabled={actualizando}
                      >
                        Cancelar
                      </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Box>
        </Fade>
      </Modal>
      <NotificacionInferior
        open={snackbarOpen}
        type={snackbarType}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
};

export default ModalProfile;
