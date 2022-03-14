import axios from 'axios';
// Axios is a package that can perform AJAX request,    
import {API_KEY} from './types/';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

// Middleware - A function that can is like a gate before the action gets to reducer that can let it pass, manipulate it, log it or stop it
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);
      console.log('this is a request:', request)
    return{
        type: FETCH_WEATHER,
        payload: request
        // Redux promise was used here as middleware when the action creator tried to send an action, and before giving to all reducers it 'unravelled' the promise for us and gave all reducers a data response instead of a promise. A promise was used because axios package.
        // The reason middleware was good for changing the response from promise to normal data is because if it gave a promise to the reducer, the reducer would have to wait and run its switch statement, but using a promise, the switch statement only runs after the data has been received from API        
    }
     
 
}
