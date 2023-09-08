import React from 'react'
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import TablaMaterialUi from './TablaMaterialUi';




const Usuarios = () => {
  return (
    <>
    <Typography variant="h5" gutterBottom>
        Usuarios
    </Typography>
    <Divider/>
    <TablaMaterialUi/>
    </>
  )
}

export default Usuarios
