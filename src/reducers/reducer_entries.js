import * as actionCreators from '../actions/index';

const entries = (state = null, action) => {
    switch(action.type) {
        case actionCreators.CREATE_ENTRY_AND_TAGS:
            var response = action.payload.data;
            console.log("createEntryReducer", response);
        case actionCreators.GET_ENTRIES:
        case actionCreators.UPDATE_ENTRY:
        case actionCreators.DELETE_ENTRY:
        default:
            return state;
    }
}

export default entries;