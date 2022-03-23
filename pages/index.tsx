import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getWeather } from '../features/weather/slice';
import { NextPage } from 'next';
import moment from 'moment';
import WeatherCard from 'components/WeatherCard';
import SearchBar from 'src/components/SearchBar';
import { setError } from '../features/weather/actions';

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { city, list, error, current, pending } = useAppSelector((state) => state.weather);

  useEffect(() => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(location => {
        console.log(location.coords.longitude)
        dispatch(getWeather(location.coords));
      }, function () {
        dispatch(setError("User denied geolocation, please active your location to use our services."))
      });
    }
  }, [dispatch]);

  return (
    <>
      {
        error == null ? (
          <div className="from-green-100  min-h-screen">
            <div className="pt-12"></div>
            <SearchBar />
            <div className="w-full mt-16 lg:mt-16 lg:px-40 justify-center container mx-auto ">
              <div className="flex flex-wrap w-full lg:w-auto">
                <div className="w-full lg:w-1/2 flex rounded-lg bg-auto" >
                  <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white relative">
                    {
                      pending === true ? (
                        <div className="flex justify-center h-full place-items-center absolute top-0 left-0 right right-0">
                          <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                        </div>
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
                            <img src={`http://openweathermap.org/img/wn/${current.weather?.[0].icon}@4x.png`} alt="Current weather logo"/>
                            <strong className="leading-none text-6xl block font-weight-bolder">{Math.ceil(current.main?.temp)}ºC</strong>
                            <b className="text-2xl block font-bold">{current.weather?.[0].main}
                            </b>
                          </div>
                        </>
                      )}
                  </div>

                </div>

                <div className="w-full lg:w-1/2 flex ml-0">
                  <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full lg:min-h-[478px]">
                    {
                      pending === true ? (
                        <div className="flex justify-center  h-full place-items-center">
                          <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg></div>
                      ) : (
                        <>
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
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : <div className="w-full flex justify-center h-screen place-items-center">{error}</div>
      }
    </>
  );
};

export default IndexPage;
