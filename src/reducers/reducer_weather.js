import { FETCH_WEATHER } from '../actions/index';
// REMEMBER THESE CURLY BRACES WHEN IMPORTNING CONSTANTS!
// State is now equalled to an array because we are going to query multiple cities
// In redux reducers DO NOT mutate the current state, always return a new instance of state 
export default function(state=[],  action){
    switch(action.type){
        case FETCH_WEATHER:
        if(action.payload.data === undefined){
            alert('Sorry we did not find your city, please try again');
        }else{
            return [ action.payload.data, ...state ]; // This says take all entries in the old state and insert it into new array
        }
 

    }
    return state
}
