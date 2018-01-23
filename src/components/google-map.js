import React, {Component} from 'react';

class GoogleMap extends Component{
    componentDidMount(){
        new google.maps.Map(this.refs.map,{
            zoom:12,
            center:{
                lat:this.props.lat,
                lng:this.props.lon
            }
        })
    }
    render(){
        return(
            // Ref is reference for the div element by using this.ref.map
            <div ref="map" /> 
        )
    }
   
}

export default GoogleMap;

