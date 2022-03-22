import { createAction } from '@reduxjs/toolkit';

export const requestLocation = createAction<any>('weather/location');
export const setCurrent = createAction<any>('weather/set-current');