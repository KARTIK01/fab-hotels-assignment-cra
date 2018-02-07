const initial_state = {
    locations: [],
    hotels: []
};

export default (state = initial_state, action) => {
    let {type, payload} = action;
    if (action) {
        switch (type) {
            case 'hotels_fetched':
                return {...state, hotels: payload};
                break;
            case 'locations_fetched':
                return {...state, locations: payload};
                break;
            case "empty_list":
                return {...state, locations: [], hotels: []};
            default:
                return {...state};
                break;
        }
    }
    return initial_state;
};
