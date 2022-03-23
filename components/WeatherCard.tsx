import React from 'react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrent } from '../features/weather/actions';

interface IProps {
    weather: {
        dt_txt: string,
        weather: any
    },
    index: number
}

function WeatherCard(props:IProps) {
    const dispatch = useAppDispatch();
    const { weather, index } = props;
    const { current } = useAppSelector((state) => state.weather);

    function setCurrentEvent(): void{
      dispatch(setCurrent(weather))
    }

    return (
        <>
        <div onClick={setCurrentEvent} className={`${weather == current ? 'flex flex-col w-1/4 bg-gray-100 text-black rounded-lg pb-4 cursor-pointer' : 'cursor-pointer flex flex-col w-1/4 bg-gray-900 rounded-lg'}`}>
          <div className="text-center pt-2 mb-2">
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`} alt="Weather Icon"/>
           </div>
          <div className="text-center">
            <b className="font-normal">{moment(weather.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('dddd').substr(0, 3)}</b><br />
            <strong className="text-xl">29ºC</strong>
          </div>
        </div>
      </>
    )
}

export default WeatherCard
