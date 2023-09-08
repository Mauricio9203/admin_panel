import * as React from 'react';
import { Card,CardContent, Divider, Grid, Typography} from '@mui/material';
import GraficoBarras from './Graficos/GraficoBarras';
import GraficoTorta from './Graficos/GraficoTorta';
import GraficoLineas from './Graficos/GraficoLineas';
import GraficoArea from './Graficos/GraficoArea';
import GraficoTortaLeyenda from './Graficos/GraficoTortaLeyenda';
import GraficoEmbudo from './Graficos/GraficoEmbudo';






//xs es el como se comporta en pantallas pequeñas
//md es el como se comporta en pantallas medianas o grandes

const ContentDashboard = () => {
  return (
    <Grid container spacing={2} sx={{marginTop: "12px"}}>
      <Grid item xs={12} md={4} >
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Gráfico de Barras
                </Typography>
                <Divider sx={{marginBottom: "10px"}}/>
                <GraficoBarras/>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} >
        <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gráfico de Torta
              </Typography>
              <Divider sx={{marginBottom: "10px"}}/>
              <GraficoTorta/>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} >
        <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gráfico Torta Leyenda
              </Typography>
              <Divider sx={{marginBottom: "10px"}}/>
              <GraficoTortaLeyenda/>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} >
        <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gráfico Lineas
              </Typography>
              <Divider sx={{marginBottom: "10px"}}/>
              <GraficoLineas/>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} >
        <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gráfico Área
              </Typography>
              <Divider sx={{marginBottom: "10px"}}/>
              <GraficoArea/>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} >
        <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Gráfico Embudo
              </Typography>
              <Divider sx={{marginBottom: "10px"}}/>
              <GraficoEmbudo/>
            </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ContentDashboard;
