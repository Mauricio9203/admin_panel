import { createSlice } from '@reduxjs/toolkit';

//esto es para que quede seleccionado el modulo correspondiente
export const ModalProfileSlice = createSlice({
  name: 'modalProfile',
  initialState: false,
  reducers: {
    updateValueModalProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateValueModalProfile } = ModalProfileSlice.actions;
export const modalProfileReducer = ModalProfileSlice.reducer;