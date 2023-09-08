import React from 'react';
import { Card, CardContent, Divider, Grid, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import VisualizadorJson from './VisualizadorJson';
import { fetchGet } from '../../helpers/Api';
import { updateApi, updateRespuestaApi, updateCargando } from '../../reducers/ApiSlice';
import { useEffect, useState } from 'react';

const ContentApiModulo = () => {
  const dispatch = useDispatch();
  const selectedApiValue = useSelector((state) => state.apiSlice);
  const cargandoValue = useSelector((state) => state.cargandoSlice.updateCargando);
  const [disabled, setDisabled] = useState(false);

  const handleConectarApi = () => {
    fetchData(selectedApiValue);
  };

  const handleActualizarApi = (valor) => {
    dispatch(updateApi(valor));
  };

  const fetchData = async (apiUrl) => {
    try {
      dispatch(updateCargando(true));
      setDisabled(true);
      const responseData = await fetchGet(apiUrl);
      dispatch(updateRespuestaApi(responseData));
      dispatch(updateCargando(false));
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      dispatch(updateCargando(false));
      console.error('Error:', error);
      dispatch(updateRespuestaApi({ "error": "Error en la Api" }));
    }
  };

  useEffect(() => {
    dispatch(updateRespuestaApi({}));
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: "12px" }}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Conexión GET API
            </Typography>
            <Divider sx={{ marginBottom: "10px" }} />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={10}>
                <TextField 
                  id="outlined-basic"  
                  size='small' 
                  label="Inserta un URL para realizar el GET" 
                  variant="outlined" 
                  onChange={(e) => handleActualizarApi(e.target.value)}
                  sx={{ width: "100%" }}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button 
                  variant="outlined" 
                  onClick={handleConectarApi} 
                  size='normal' 
                  color="error" 
                  sx={{ width: "100%" }}
                  disabled={disabled}
                >
                   {cargandoValue ? <CircularProgress color='error' size={24} /> : "Conectar"}
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={12}>
                  <VisualizadorJson/>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ContentApiModulo;
