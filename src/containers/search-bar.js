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
// Purpose of this function is to take the applications state, and whatever gets returned will show up as props for SearchBar. EG fetchWeather()
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchWeather }, dispatch);
    // bindActionCreators makes sure the function fetchWeather is dispatched through middleware and then given to reducers
}
// Connect takes a function which in this case is mapStateToProps and takes a Component and makes it a container
// mapDispatchToProps must be second argument, by passing null your telling the application not to care about the state
export default connect(null, mapDispatchToProps)(SearchBar)
