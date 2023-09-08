import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {  useDispatch } from 'react-redux';
import { updateValueModalProfile } from '../reducers/ModalSlice';
import ModalProfile from './ModalProfile';
//import { updateSesion } from '../reducers/LoginSlice';
import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';
import { updateCierreSesion } from '../reducers/LoginSlice';



export default function MenuProfile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModalProfile = () => {
    dispatch(updateValueModalProfile(true))
    setAnchorEl(null);
  };


  const handleOpenModalCerrarSesion = () => {
    dispatch(updateCierreSesion(true))
  };

  const handleCerrarModalCerrarSesion = () => {
    dispatch(updateCierreSesion(false))
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex',  alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }} src='https://merak.pe/wp-content/uploads/2022/08/hombre-negocios-sonriente-barbudo-hermoso-ropa-formal-que-habla-telefono-mientras-que-sienta-cafeteria_232070-2862.jpg'></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenModalProfile}>
          <Avatar /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenModalCerrarSesion}>
          <ListItemIcon>
            <Logout fontSize="small" /> 
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
      <ModalProfile/>
      <ModalConfirmacion handleCerrarModalCerrarSesion={handleCerrarModalCerrarSesion}/>
    </React.Fragment>
  );
}
