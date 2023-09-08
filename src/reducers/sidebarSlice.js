import { createSlice } from '@reduxjs/toolkit';

//esto es para que quede seleccionado el modulo correspondiente
export const selectedSidebarSlice = createSlice({
  name: 'selectedSidebar',
  initialState: null,
  reducers: {
    updateValueSelected: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateValueSelected } = selectedSidebarSlice.actions;
export const selectedSidebarReducer = selectedSidebarSlice.reducer;

//esto es para mostrar el modulo de Dashbpard
export const dashboardSlice = createSlice({
  name: 'dashboardModulo',
  initialState: true,
  reducers: {
    updateDashboard: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateDashboard } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;


//esto es para mostrar el modulo de API
export const apiModuloSlice = createSlice({
  name: 'apiModulo',
  initialState: false,
  reducers: {
    updateApiModulo: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateApiModulo } = apiModuloSlice.actions;
export const apiModuloReducer = apiModuloSlice.reducer;


//esto es para mostrar el modulo de Usuarios
export const usuariosModuloSlice = createSlice({
  name: 'usuariosModulo',
  initialState: false,
  reducers: {
    updateUsuariosModulo: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateUsuariosModulo } = usuariosModuloSlice.actions;
export const usuariosModuloReducer = usuariosModuloSlice.reducer;