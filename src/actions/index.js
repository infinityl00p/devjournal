import axios from 'axios';

const ROOT_URL = 'http://shielded-basin-84367.herokuapp.com';

export const CREATE_ENTRY_AND_TAGS = 'CREATE_ENTRY_AND_TAGS';
export const GET_ENTRIES_AND_TAGS = 'GET_ENTRIES_AND_TAGS';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';

export const GET_TAGS = 'GET_TAGS';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';

const USER_ID = localStorage.getItem('userId');

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CHECK_LOGIN = 'CHECK_LOGIN';

// TODO: ADD ERROR HANDLING
export function createEntryAndTags(entry) {
    const request = axios.post(
        ROOT_URL + '/entries/' + USER_ID,
        entry
    );
    return {
        type: CREATE_ENTRY_AND_TAGS,
        payload: request
    };
}

export function getEntriesAndTags() {
    const request = axios.get(
        ROOT_URL + '/entries/' + USER_ID
    )

    return {
        type: GET_ENTRIES_AND_TAGS,
        payload: request
    };
}

export function updateEntry(entryId, entryData) {
    const request = axios.post(
        ROOT_URL + '/entries/' + USER_ID + '/' + entryId,
        entryData
    );

    return {
        type: UPDATE_ENTRY,
        payload: request
    };
}

export function deleteEntry(entryId) {
    const request = axios.delete(
        ROOT_URL + '/entries/' + USER_ID + '/' + entryId
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

export function createUser(user) {
    const request = axios.post(
        ROOT_URL + '/users/add',
        user
    );

    return {
        type: CREATE_USER,
        payload: request
    };
}

export function loginUser(user) {
    const request = axios.post(
        ROOT_URL + '/users/login',
        user
    );

    return {
        type: LOGIN_USER,
        payload: request
    };
}
