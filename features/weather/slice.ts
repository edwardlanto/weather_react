import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../store';
import { setCurrent, requestLocation } from './actions'
import { useAppSelector } from '../../hooks';
interface ICity {
  name: string,
  country: string,
}

interface ICoords{

}

export type WeatherState = {
  list: any[],
  pending: boolean;
  error: boolean;
  current: any,
  city: ICity,
  latitude: number,
  longitude: number
};

interface ICoords {
  latitude: number,
  longitude: number

}

const initialState: WeatherState = {
  list: [],
  pending: false,
  error: false,
  current: {},
  city: {
    name: "",
    country: ""
  },
  latitude: 0,
  longitude: 0
};

export const getWeather = createAsyncThunk('weather/get', async (coords: ICoords) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.OPEN_WEATHER_API}&mode=json&units=metric`);

  return response.data;
});

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.pending = true;
      })
      .addCase(getWeather.fulfilled, (state, { payload }) => {
        state.pending = false;
        let dateCounter:string = ''
        state.list = payload.list.filter((item:any)=> {

          /**
           * Filter by days
           */
          const date  = item?.dt_txt.split(' ')[0];
          if(date != dateCounter){
            dateCounter = date;
            return item;
          }
        }).splice(0, 4)

        state.current = payload.list[0];
        state.city = payload.city;

      })
      .addCase(getWeather.rejected, state => {
        state.pending = false;
        state.error = true;
      })
      .addCase(setCurrent, (state, { payload }) => {
        state.current = payload
      })
      .addCase(requestLocation, (state, { payload}) => {
        state.latitude = payload.latitude;
        state.longitude = payload.longitude;
      })
  },
});

export const selectWeather = (state: RootState) => state.weather;
export default WeatherSlice.reducer;