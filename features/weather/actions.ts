import { createAction } from '@reduxjs/toolkit';

export const requestLocation = createAction<any>('weather/location');
export const loadWeather = createAction<any>('weather/location');
// export const decrement = createAction('counter/decrement');
// export const incrementByAmount = createAction<number>(
//   'counter/incrementByAmount'
// );
