import * as actionCreators from '../actions/index';

const entries = (state = null, action) => {
    switch(action.type) {
        case actionCreators.CREATE_ENTRY_AND_TAGS:
            var response = action.payload.data.data;
            // handle entry with no tags
            if (response.tags === null) {
                response.tags = {};
            }
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
            var response = action.payload.data.success;

        case actionCreators.DELETE_ENTRY:
          var response = action.payload.data.success;
          var entries = state.entries.filter(function(entry) {
            // TODO: Add error handling for response
            if(entry.id != response){
              return entry
            }
          })

          var tags = state.tags;
          var updatedState = {
            entries,
            tags
          };
          return Object.assign({}, state, updatedState);
        case actionCreators.CREATE_USER:
        case actionCreators.LOGIN_USER:
            var response = action.payload.data
            return Object.assign({}, state, {
                user: {
                    id: response.userId,
                    loggedIn: true
                }
            });
    }
    return state;
}

export default entries;
