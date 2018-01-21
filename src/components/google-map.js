import React, {Component} from 'react';

class GoogleMap extends Component{
    componentDidMount(){
        // When a component is mounting to the DOM it is called mounting
        // ComponentDidMount runs when the component is rendered on the screen
        // NOW you see what reference does, it tells google Map WHERE to embed the map 
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


// componentDidMount(){ //One of our life cycle 
//     //methods that gets ran when Google Map component gets rendererd on screen

//     }

export default GoogleMap;

