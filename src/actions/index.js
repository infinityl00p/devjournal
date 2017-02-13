import axios from 'axios'

const ROOT_URL = 'http://shielded-basin-84367.herokuapp.com';

export const CREATE_ENTRY = 'CREATE_ENTRY';
export const GET_ENTRIES = 'GET_ENTRIES';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';

export const GET_TAGS = 'GET_TAGS';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';

// TODO: ADD ERROR HANDLING
export function createEntry(entry) {
    const request = axios.post(
        ROOT_URL + '/entries',
        entry
    );

    return {
        type: CREATE_ENTRY,
        payload: request
    };
}

export function getEntries() {
    const request = axios.get(
        ROOT_URL + '/entries'
    );

    return {
        type: GET_ENTRIES,
        payload: request
    };
}

export function updateEntry(entryId, entryData) {
    const request = axios.post(
        ROOT_URL + '/entries/' + entryId,
        entryData
    );

    return {
        type: UPDATE_ENTRY,
        payload: request
    };
}

export function deleteEntry(entryId) {
    const request = axios.get(
        ROOT_URL + '/entries/' + entryId
    );

    return {
        type: DELETE_ENTRY,
        payload: request
    };
}

export function createTag(tag) {
    const request = axios.post(
        ROOT_URL + '/tags',
        tag
    );

    return {
        type: CREATE_TAG,
        payload: request
    };
}

export function getTags() {
    const request = axios.get(
        ROOT_URL + '/tags'
    );

    return {
        type: GET_TAGS,
        payload: request
    };
}

export function deleteTag(tagId) {
    const request = axios.post(
        ROOT_URL + '/tags/' + tagId
    );

    return {
        type: DELETE_TAG,
        payload: request
    };
}