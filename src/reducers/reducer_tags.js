import * as actionCreators from '../actions/index';

const tags = (state = null, action) => {
    switch(action.type) {
        case actionCreators.CREATE_TAG:
        case actionCreators.GET_TAGS:
        case actionCreators.DELETE_TAG:
        default:
            return state;
    }
}

export default tags;