import * as actionCreators from '../actions/index';

export default function(state = null, action) {
    switch(action.type) {
        case actionCreators.CREATE_TAG:
            var response = action.payload.data;
            console.log("createTag", response);
        case actionCreators.GET_TAGS:
        case actionCreators.DELETE_TAG:
        default:
            return state;
    }
}