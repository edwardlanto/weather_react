import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState, AppThunk } from '..';

export const LocationSlice = createSlice({
  name: 'location',

  initialState: {
    coordinates: null
  },

  reducers: {
    setLocationData: (state, action) => {
      state.coordinates = action.payload;
    },
    requestLocation: () => {
        console.log("RAN")
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);

      if (!action.payload.product.name) {
        return state;
      }

      state.coordinates = action.payload.product.name;
    }
  }
});

export const { setLocationData } = LocationSlice.actions;

export const selectLocation = (state: AppState) => state.location;

export const fetchWeather =
    (props:any): AppThunk =>
      async dispatch => {
          console.log("RAN HERE", props)
        const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

        await timeoutPromise(200);

        dispatch(
            setLocationData('name from thunk')
        );
      };


export default LocationSlice.reducer;