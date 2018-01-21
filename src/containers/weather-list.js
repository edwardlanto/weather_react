import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google-map';
// All containers need the connect function to connect to redux

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temp = cityData.list.map((weather) => { return weather.main.temp });
        const humidities = cityData.list.map((weather) => {return weather.main.humidity});
        const pressures = cityData.list.map((weather) => { return weather.main.pressure });
        const { lat , lon } = cityData.city.coord;
       
        // When mapping USE arrow functions
        // console.log(temp);
        // cityData would be equivalent to each object that contains city, temperature etc.
        return (
            <tr id="city-info" key={cityData.city.id}>
                <td id="g-map">
                    <GoogleMap lat={lat} lon={lon}/>
                    <h2 class="city-name">{cityData.city.name}</h2>
                </td>
                <td>  
                    <Chart data={humidities} color="blue" />
                </td>
                <td>  
                    <Chart data={pressures} color="green" />
                </td>
                <td>  
                    <Chart data={temp} color="orange" />
                </td>

            </tr>
        )
    }
    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr class="headings">
                            <th>Map</th>
                            <th>Temperature(K)</th>
                            <th>Pressure(hPA)</th>
                            <th>Humidity(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weather.map(this.renderWeather)}
                        {/* Maps over every item in the weather list and runs the renderWeather method on it    */}
                    </tbody>
                </table>
                <ul>

                </ul>
            </div>
        )
    }
}

//Takes applications state and passes it as props to Weather List
function mapStateToProps(state) {
    return {
        weather: state.weather
    }
}
// Connect makes our container a smart container which is aware of applications state & redux itself.
export default connect(mapStateToProps)(WeatherList);