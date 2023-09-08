import { createSlice } from '@reduxjs/toolkit';

//esto es para agregar un estado a la url escrita
export const apiSlice = createSlice({
  name: 'apiSlice',
  initialState: "",
  reducers: {
    updateApi: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateApi } = apiSlice.actions;
export const apiSliceReducer = apiSlice.reducer;

export const respuestaApiSlice = createSlice({
    name: 'respuestaApiSlice',
    initialState: {},
    reducers: {
      updateRespuestaApi: (state, action) => {
        return action.payload;
      },
    },
  });
  
export const { updateRespuestaApi } = respuestaApiSlice.actions;
export const respuestaApiReducer = respuestaApiSlice.reducer;


export const cargandoSlice = createSlice({
  name: 'cargandoSlice',
  initialState: false,
  reducers: {
    updateCargando: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateCargando } = cargandoSlice.actions;
export const respuestaCargandoReducer = cargandoSlice.reducer;