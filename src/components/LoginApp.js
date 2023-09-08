import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Alert, CircularProgress, Collapse, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateUser } from '../helpers/airTableHelper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Estilo personalizado para el Paper con efecto de vidrio
const GlassPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: `rgba(255, 255, 255, 0.5)`, // Fondo con transparencia
  backdropFilter: `blur(10px)`, // Efecto de desenfoque
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LoginApp({handleIniciarSesion}) {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [cargando, setCargando] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [textoAlerta, setTextoAlerta] = useState()
  const [iconoAlerta, setIconoAlerta] = useState("error")
  const [showPassword, setShowPassword] = useState(false);


  const handleUpdateUsuario = (e) => {
    const usuario = e.target.value
    setUser(usuario)
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };  

  const handleUpdatePassword = (e) => {
    const pass = e.target.value
    setPassword(pass)
  }

  const handleEnter = (e) => {
    if(e.key === "Enter"){
      handleValidarDatos()
    }
  }

  const handleValidarDatos = async () => {
      if (!user || !password) {
        setTextoAlerta("Por favor, complete ambos campos.");
        setIconoAlerta("warning");
        setOpenAlert(true);
        return; // Salir de la función si los campos están vacíos
      }

      let tableName = process.env.REACT_APP_TABLE_NAME_USER;
      setCargando(true)
      let validacion = await validateUser(user, password, tableName)
      setCargando(false)

      if(validacion[0] === true){
        handleLocalStorageSesion(validacion[1])
        handleIniciarSesion()
      }else{
        handleMostrarAlerta(true,"Inicio de sesión fallido, verifica el usuario y contraseña.","warning")
      }
  }

  const handleMostrarAlerta = (estado, texto, tipo) =>{
    let segundosDuracion = 5

    setOpenAlert(estado)
    setTextoAlerta(texto)
    setIconoAlerta(tipo)
    setTimeout(() => {
      setOpenAlert(false)
    }, segundosDuracion*1000); // Ocultar el mensaje después de 2 segundos
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto
    handleValidarDatos()
    // Realiza aquí la lógica de envío del formulario
  };

  // eslint-disable-next-line
  const handleLocalStorageSesion = (datos) => {
    let idPerfil = datos[0]["id"]
    localStorage.setItem("idPerfil", idPerfil)
  }

  

  useEffect(() => {
    // Obtén una referencia al cuerpo de la página
    const body = document.body;

    // Cambia la imagen de fondo
    body.style.backgroundImage = "url('https://wallpapercosmos.com/w/full/8/d/7/1209987-3840x2160-desktop-4k-glow-in-the-dark-background-image.jpg')";

    // Limpieza del efecto (si es necesario)
  
}, [])


  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={4}>
          {/* Utilizamos el componente Paper personalizado con efecto de vidrio */}
          <GlassPaper elevation={3}>
            <img 
            src="https://1000logos.net/wp-content/uploads/2023/04/Starbucks-logo.png" 
            alt="Logo" 
            style={{ width: '50%', maxWidth: 200, marginBottom: 16 }} 
            />
            <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre de usuario"
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={handleUpdateUsuario}
              onKeyDown={handleEnter}
              autoComplete='name'
              inputProps={{
                style: { color: '#ffffff', borderColor: '#ffffff'},
                autoComplete: 'current-password'
              }}
              InputLabelProps={{
                style: { color: '#ffffff' }, // Cambiar el color del label a blanco
              }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              onChange={handleUpdatePassword}
              onKeyDown={handleEnter}
              fullWidth
              variant="outlined"
              margin="dense"
              autoComplete='password'
              inputProps={{
                style: { color: '#ffffff' },
              }}
              InputLabelProps={{
                style: { color: '#ffffff' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                      sx={{color: "white"}}
                    >
                      {showPassword ? <VisibilityIcon  /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Collapse in={openAlert}>
              <Alert
                severity={iconoAlerta}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {textoAlerta}
              </Alert>
            </Collapse>
            <Button
              variant="contained"
              style={{ backgroundColor: '#614BC3', color: '#ffffff' }} // Color de fondo transparente azul
              fullWidth
              sx={{marginTop:"20%"}}
              type='submit'
            >

              {cargando ? <CircularProgress size={25} thickness={5} style={{color: "white"}}/>:"Iniciar Sesion" }
            </Button>
            </form>
          </GlassPaper>
        </Grid>
      </Grid>
    </Box>
  );
}
<LoginApp/>