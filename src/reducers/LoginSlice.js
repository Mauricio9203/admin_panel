import { createSlice } from '@reduxjs/toolkit';

//esto es para abrir la sesión
export const sesionSlice = createSlice({
    name: 'sesionSlice',
    initialState: false,
    reducers: {
      updateSesion: (state, action) => {
        return action.payload;
      },
    },
  });
  
  export const { updateSesion } = sesionSlice.actions;
  export const sesionSliceReducer = sesionSlice.reducer;

//esto es para abrir la sesión
export const cierreSesionSlice = createSlice({
    name: 'cierreSesionSlice',
    initialState: false,
    reducers: {
      updateCierreSesion: (state, action) => {
        return action.payload;
      },
    },
  });
  
  export const { updateCierreSesion } = cierreSesionSlice.actions;
  export const cierreSesionSliceReducer = cierreSesionSlice.reducer;