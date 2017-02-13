import * as actionCreators from '../actions/index';

const entries = (state = null, action) => {
    switch(action.type) {
        case actionCreators.CREATE_ENTRY:
            var response = action.payload.data;
            console.log("createEntry", response);
        case actionCreators.GET_ENTRIES:
        case actionCreators.UPDATE_ENTRY:
        case actionCreators.DELETE_ENTRY:
        default:
            return state;
    }
}

export default entries;