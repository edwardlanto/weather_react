import { createReducer } from '@reduxjs/toolkit';
import { requestLocation } from './actions';

type WeatheState = {
  latitude: number,
  longitude: number,
  list: any[]
};

const initialState: WeatheState = {
  latitude: 0,
  longitude: 0,
  list: []
};

export const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requestLocation, (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    })
});
