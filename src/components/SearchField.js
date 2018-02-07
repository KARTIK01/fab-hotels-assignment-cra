import React, {Component} from "react";
import Store from "./../StoreProvider";
import {connect} from "react-redux";
import Autosuggest from "react-autosuggest";

class SearchField extends Component {

    constructor(props) {
        super(props);
        this.service = new window.google.maps.places.AutocompleteService();
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, {newValue, method}) => {
        let value = newValue;
        this.setState({value});
        if (value && value.length > 0) {
            //getting places from google api
            this.service.getPlacePredictions({input: value, types: ['(cities)']}, (predictions, status) => {
                if (status === 'OK' && predictions && predictions.length > 0) {
                    Store.dispatch({
                        type: 'locations_fetched',
                        payload: predictions.map(item => {
                            return ({name: item.description})
                        })
                    });
                }
            });

            //todo: get hotels form some other apis
            Store.dispatch({
                type: 'hotels_fetched',
                payload: [{name: "FabHotels, Goa"}]
            });
        }
    };

    onSuggestionsFetchRequested = ({value}) => {
        this.onChange(null, {newValue: value});
    };

    onSuggestionsClearRequested = () => {
        Store.dispatch({
            type: 'empty_list',
        });
    };


    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: "Type Delhi",
            value,
            onChange: this.onChange
        };

        return (
            <div className="pt-4">
                <Autosuggest
                    multiSection={true}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.name}
                    renderSuggestion={suggestion => <span>{suggestion.name}</span>}
                    renderSectionTitle={section => <strong>{section.title}</strong>}
                    getSectionSuggestions={section => section.item}
                    inputProps={inputProps}
                />

            </div>
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props !== nextProps) {
            let newSuggestions = [];
            if (this.props.locations.length) {
                newSuggestions.push({
                    title: "Locations",
                    item: this.props.locations
                })
            }
            if (this.props.hotels.length) {
                newSuggestions.push({
                    title: "Hotels",
                    item: this.props.hotels
                })
            }
            this.setState({suggestions: newSuggestions})
        }
    }

}

SearchField.propTypes = {};
SearchField.defaultProps = {};

function mapStateToProps(state) {
    return {
        locations: state.places.locations,
        hotels: state.places.hotels
    }
}

export default connect(mapStateToProps)(SearchField);
