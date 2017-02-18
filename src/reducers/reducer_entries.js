import * as actionCreators from '../actions/index';

const entries = (state = null, action) => {
    switch(action.type) {
        case actionCreators.CREATE_ENTRY_AND_TAGS:
            var response = action.payload.data;
            console.log("createEntryReducer", response);
            // TODO: Update states for Entries and Tags
            //       First, load state.
        case actionCreators.GET_ENTRIES_AND_TAGS:
            var response = action.payload.data.data;
            return {
                entries: action.payload.data.data.entries,
                tags: action.payload.data.data.tags
            };
        case actionCreators.UPDATE_ENTRY:
        case actionCreators.DELETE_ENTRY:
    }
    return state;
}

export default entries;