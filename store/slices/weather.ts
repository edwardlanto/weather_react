import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState, AppThunk } from '..';

export const WeatherSlice = createSlice({
  name: 'weather',

  initialState: {
    weather: null
  },

  reducers: {
    setProductData: (state, action) => {
      state.weather = action.payload;
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);

      if (!action.payload.product.name) {
        return state;
      }

      state.weather = action.payload.product.name;
    }
  }
});

export const { setProductData } = WeatherSlice.actions;

export const selectProduct = (state: AppState) => state.product;

export const fetchProduct =
    (): AppThunk =>
      async dispatch => {
        const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

        await timeoutPromise(1000);

        dispatch(
          setProductData('BA DUM DA THUNK')
        );
      };


export default WeatherSlice.reducer;