import React, { Component } from 'react'
// Since SearchBar needs to tell the action creator in Redux to create an action, it must use the connect function
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = { term : ''}
        this.onInputChange = this.onInputChange.bind(this);
        // This line of code is saying for this instance of SearchBar there is a function called onInputChange, bind that function to SearchBar and replaced onInputChange
        // You must bind callback functions when it uses the keyword 'this'
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    onInputChange(event){
        this.setState({
            term: event.target.value
        })
    }

    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term);
        // Passes in the search term into the fetchWeatherFunction 
        this.setState({ term: '' })
        // Then clears out the term
    }


    render(){
        return(
            <form onSubmit={this.onFormSubmit}className="input-group">
                <input
                placeholder="Get a 5-day weather forecast"
                className="form-control"
                value={this.state.term}
                onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        )
    }
}
// Purpose of this function is to take the applications state, and whatever gets returned will show up as props for SearchBar
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchWeather }, dispatch);
    // bindActionCreators binded the function fetchWeather to all reducers and allowed us to use it
}
// Connect takes a function which in this case is mapStateToProps and takes a Component and makes it a container
// By passing null, your telling redux not to care about state
//
export default connect(null, mapDispatchToProps)(SearchBar)
