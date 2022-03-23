import { createAction } from '@reduxjs/toolkit';

export const requestLocation = createAction<any>('weather/location');
export const setCurrent = createAction<any>('weather/set-current');
export const setError = createAction<any>('weather/set-error');