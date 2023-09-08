import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { selectedSidebarReducer, dashboardReducer ,apiModuloReducer, usuariosModuloReducer } from './reducers/sidebarSlice';
import { apiSliceReducer, respuestaApiReducer, respuestaCargandoReducer } from './reducers/ApiSlice';
import { modalProfileReducer } from './reducers/ModalSlice';
import { sesionSliceReducer, cierreSesionSliceReducer } from './reducers/LoginSlice';

const store = configureStore({
  reducer: {
    selectedSidebar: selectedSidebarReducer,
    apiModulo: apiModuloReducer,
    usuariosModulo: usuariosModuloReducer,
    dashboardModulo : dashboardReducer,
    apiSlice: apiSliceReducer,
    respuestaApiSlice: respuestaApiReducer,
    cargandoSlice: respuestaCargandoReducer,
    ModalProfile : modalProfileReducer,
    sesionSlice : sesionSliceReducer,
    cierreSesionSlice: cierreSesionSliceReducer
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
