import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import { LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useAppDispatch } from 'hooks';
import { getWeather } from 'features/weather/slice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [libraries] = useState(['places']);
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API,
    libraries: ['places']
  })
  const [autocomplete, setAutocomplete] = useState(null)
  const inputEl = useRef(null)

  // Handle the keypress for input
  const onKeypress = (e: any) => {
    // // On enter pressed
    // if (e.key === 'Enter') {
    //   e.preventDefault()
    //   return false
    // }
  }

  const handleSubmit = (e: any) => {
    // e.preventDefault();
  }

  // useEffect()

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
          <div>Google Map script can't be loaded, please reload the page</div>
        )}

        {isLoaded && (
          <React.Fragment>
            <div className='max-w-md mx-auto'>
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <Autocomplete
                      onLoad={onLoad}
                      fields={['place_id']}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <input
                        ref={inputEl}
                        type="text"
                        className="form-input block py-3 w-full rounded-md"
                        placeholder="Search Places"
                        onKeyPress={onKeypress}
                      />
                    </Autocomplete>
                  </div>
                </form>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  )
}