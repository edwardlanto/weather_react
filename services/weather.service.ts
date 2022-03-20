import axios from 'axios';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.OPEN_WEATHER_API}`;
const getTodaysWeather = () => {
    return axios.get(`${ROOT_URL}`);
}

const weatherService = {
    getTodaysWeather
}

export default weatherService;
