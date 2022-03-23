import React, { useRef, useState } from 'react';
import {
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import { getLatLng, geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useAppDispatch } from 'hooks';
import { getWeather } from 'features/weather/slice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API,
    libraries: ['places']
  })
  const [autocomplete, setAutocomplete] = useState(null)
  const inputEl = useRef(null)

  const onLoad = (autocompleteObj: any) => {
    setAutocomplete(autocompleteObj)
  }

  interface ICoords{
    latitude: number,
    longitude: number
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      geocodeByPlaceId(place.place_id)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng}) => {
          const coords: ICoords = {
            latitude:0,
            longitude: 0
          }

          coords.latitude = lat;
          coords.longitude = lng;
          dispatch(getWeather(coords));
        });
    }
  }

  return (
    <>
      <div>
        {loadError && (
          <div>Google Map script cant be loaded, please reload the page</div>
        )}

        {isLoaded && (
          <React.Fragment>
test
          </React.Fragment>
        )}
      </div>
    </>
  )
}