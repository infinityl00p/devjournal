import * as actionCreators from '../actions/index';

const defaultEntry = [{
  date: "2017-02-22T04:50:46.729656Z",
  entryText:"Default entry, create an entry to remove this text",
  id: 1,
  tags: [1]
}];

const defaultTags = [{
    id: 1,
    tagText: '#defaultEntry'
}]

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
            if (response.entries.length === 0) {
              return {
                entries: defaultEntry,
                tags: defaultTags
              }
            }
            return {
                entries: action.payload.data.data.entries,
                tags: action.payload.data.data.tags
            };
        case actionCreators.UPDATE_ENTRY:
            var response = action.payload.data.success;
            //return entries with updated entry
            var min = 0;
            var max = state.entries.length - 1;
            //TODO: look at this again, do i need it???
            while (min <= max) {
              var guess = Math.floor((max + min) / 2);
              if (state.entries[guess].id === response.id) {
                break;
              } else if (state.entries[guess].id < response.id) {
                min = guess + 1;
              } else {
                max = guess - 1;
              }
            }
            state.entries[guess].entryText = response.entryText;
            return Object.assign({}, state);
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
          return state;
        case actionCreators.LOGIN_USER:
            var response = action.payload.data;
            if (response) {
              var userId = response.userId
              localStorage.setItem('userId', JSON.stringify(userId));

              return Object.assign({}, state, {
                ...state,
                  user: {
                      id: response.userId,
                      loggedIn: true
                  }
              });
            }
            else {
              return Object.assign({}, state, {
                ...state,
                  user: {
                      loggedIn: false
                  }
              });
            }
            return state;
    }
    return state;
}

export default entries;

