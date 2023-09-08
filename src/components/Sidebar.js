import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//iconos
import ApiIcon from '@mui/icons-material/Api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
//otros
import '../App.css'
import MenuProfile from './MenuProfile';

//Modulos Sidebar
import ApiModulo from '../modules/ApiModulo/ApiModulo';
import Dashboard from '../modules/Dashboard/Dashboard';
import Usuarios from '../modules/Usuarios/Usuarios';

//reducers
import { useSelector, useDispatch } from 'react-redux';
import { updateValueSelected, updateDashboard ,updateApiModulo, updateUsuariosModulo } from '../reducers/sidebarSlice';
import { useEffect } from 'react';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


//agregar el nuevo menú aquí
const menu = ["Dashboard", "API", "Usuarios"]

export default function Sidebar() {
  const dispatch = useDispatch();
  const selectedSidebarValue = useSelector((state) => state.selectedSidebar);
  //const sesionValue = useSelector((state) => state.sesionSlice);

 
  //activate modules
  const apiModuloValue = useSelector((state) => state.apiModulo);
  const usuariosModuloValue = useSelector((state) => state.usuariosModulo);
  const dashboardValue = useSelector((state) => state.dashboardModulo);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

 



  useEffect(() => {
      // Obtén una referencia al cuerpo de la página
      const body = document.body;
   
      // Cambia la imagen de fondo
      body.style.backgroundImage = "url('')";

      handleModuleChange(0)
      handleListItemClick(0)
      // eslint-disable-next-line
  }, [])
  


  //Modulos
  const indexToModuleMap = {
    0: 'dashboard',
    1: 'api',
    2: 'usuarios'
    // Agrega más índices y nombres de módulos según sea necesario
  };

  function handleModuleChange(index) {
    const selectedModule = indexToModuleMap[index];
  
    // Actualizar el estado según el módulo seleccionado
    //setDashboardModulo(selectedModule === 'dashboard');
    dispatch(updateApiModulo(selectedModule === 'api'))
    dispatch(updateDashboard(selectedModule === 'dashboard'))
    dispatch(updateUsuariosModulo(selectedModule === 'usuarios'))
  }

  const handleListItemClick = (index) => {
    /*
    Dashboard = 0
    API = 1
    */
  // eslint-disable-next-line
    handleModuleChange(index)
    dispatch(updateValueSelected(index));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='secondary'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Panel Admin MD
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <MenuProfile sx={{justifyContent: 'flex-right',}}/>
        </Toolbar>
        
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Horizontal_Logo.png"
          alt="Imagen Responsiva"
          style={{
            maxWidth: '60%',
            height: 'auto',
            width: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {menu.map((text, index) => {
          let icon;
        // eslint-disable-next-line 
          switch (text) {
            case 'Dashboard':
              icon = <DashboardIcon />;
              break;
            case 'API':
              icon = <ApiIcon />;
              break;
            case 'Usuarios':
              icon = <ManageAccountsIcon />;
              break;

          }

          return (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={selectedSidebarValue === index}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { apiModuloValue &&    <ApiModulo/> }
        { dashboardValue && <Dashboard/>}
        { usuariosModuloValue &&    <Usuarios/> }
      </Box>
    </Box>
  );
}
