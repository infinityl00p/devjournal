import * as actionCreators from '../actions/index';

const entries = (state = null, action) => {
    switch(action.type) {
        case actionCreators.CREATE_ENTRY_AND_TAGS:
            var response = action.payload.data.data;
            return Object.assign({}, state, {
                entries: [
                    ...state.entries,
                    {
                        id: response.entry.id,
                        entryText: response.entry.entryText,
                        date: response.entry.date,
                        tags: response.entry.tags
                    }
                ],
                tags: [
                    ...state.tags,
                    ...response.tags,
                ]
            });
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