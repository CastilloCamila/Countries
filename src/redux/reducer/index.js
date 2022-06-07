import {
    GET_ALL_COUNTRIES,
    GET_COUNTRY_DETAIL,
    ADD_ACTIVITY,
    GET_ALL_ACTIVITIES,

    FILTERED,
    CLEAR_DETAIL,
    UPDATE_PAGE
} from "../actions/actionTypes.js";


const incialState = {
    currentPage:1,
    filteredCountries: [{}],
    countries: {},
    countryDetail: {},
    activity: {},
    allActivities:[{}]

    


}
const reducer = function (state = incialState, { type, payload }) {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: payload,
                filteredCountries: payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: payload
            }
        case ADD_ACTIVITY:
            return {
                ...state,
                activity: payload
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: payload
            }

        case FILTERED:
            return {
                ...state,
                filteredCountries: payload
            }
            case UPDATE_PAGE:
            return {
                ...state,
                currentPage: payload
            }

        case CLEAR_DETAIL:
            return {
                ...state,
                countryDetail: {}
            }
    
        default:
            return state;
    }
}
export default reducer;