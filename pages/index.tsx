import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getWeather } from '../features/weather/slice';
import { NextPage } from 'next';
import moment from 'moment';
import WeatherCard from 'components/WeatherCard';
import SearchBar from 'src/components/SearchBar';

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { city, list, error, current, pending } = useAppSelector((state) => state.weather);
  let dayInt = moment(current.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('dddd');

  useEffect(() => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(location => {
        console.log(location.coords.longitude)
        dispatch(getWeather(location.coords));
      });


    } else {
      console.log("Location is not available.")
    }
  }, []);

  return (
    <>

      <SearchBar />
      <div className="w-full mt-16 lg:mt-64 lg:px-40 justify-center container mx-auto">
        <div className="flex flex-wrap w-full lg:w-auto">
          <div className="w-full lg:w-1/2 flex rounded-lg bg-auto" >
            <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
              {
                pending === true ? (
                  <div>Loading</div>
                ) : (
                  <>
                    <div className="mb-20">
                      <h2 className="font-bold text-3xl leading-none pb-1">{moment(current.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('dddd')}</h2>
                      <h3 className="leading-none pb-2 pl-1">{moment(current.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('D')} {moment(current.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('MMMM')} </h3>
                      <p className="flex aling-center opacity-75">
                        <svg className=" w-4 inline mr-1" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
                          viewBox="0 0 425.963 425.963"><g></g><path
                            d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   
                c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   
                c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   
                C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   
                c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
                            data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" /></svg>
                        {city.name}, {city.country}
                      </p>
                    </div>
                    <div>
                      <img src={`http://openweathermap.org/img/wn/${current.weather?.[0].icon}@4x.png`} />
                      <strong className="leading-none text-6xl block font-weight-bolder">{Math.ceil(current.main?.temp)}ºC</strong>
                      <b className="text-2xl block font-bold">{current.weather?.[0].main}
                      </b>
                    </div>
                  </>
                )}
            </div>

          </div>

          <div className="w-full lg:w-1/2 flex ml-0">
            <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
              <div className="flex justify-between w-64 mb-4 w-full">
                <div className="w-auto font-bold uppercase text-90">Wind</div><div className="w-auto text-right">{(current.wind?.speed * 1.6).toFixed(2)} km/hour</div>
              </div>
              <div className="flex justify-between w-64 mb-4 w-full">
                <div className="w-auto font-bold uppercase text-90">Humidity</div><div className="w-auto text-right">{current.main?.humidity}%</div>
              </div>
              <div className="flex justify-between w-64 mb-8 w-full">
                <div className="w-auto font-bold uppercase text-90 ">Feels Like</div><div className="w-auto text-right capitalize">{current.weather?.[0].description}</div>
              </div>
              <div className="flex flex-row">
                {list.map((weather, index) => (
                  <WeatherCard weather={weather} index={index} key={index} />
                )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default IndexPage;
