import {combineReducers} from "redux";
import placesReducers from "./PlacesReducers";

const allReducers = combineReducers({
    places: placesReducers,
});

export default allReducers;
