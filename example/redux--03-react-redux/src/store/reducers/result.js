import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            // change data
            // return {
            //     ...state,
            //     results: state.results.concat({id: new Date(), value: action.result})
            // }
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})})
        case actionTypes.DELETE_RESULT:
            return updateObject(state, {results: state.results.filter(result => result.id !== action.id)})
    }
    return state;
};

export default reducer;