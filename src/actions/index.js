import axios from 'axios'

const ROOT_URL = 'shielded-basin-84367.herokuapp.com';

export const CREATE_ENTRY = 'CREATE_ENTRY';
export const GET_ENTRIES = 'GET_ENTRIES';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';

export const GET_LABELS = 'GET_LABELS';
export const CREATE_LABEL = 'CREATE_LABEL';
export const DELETE_LABEL = 'DELETE_LABEL';

// TODO: Add user_id filter when we get to that stage
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

export function createLabel(label) {
    const request = axios.post(
        ROOT_URL + '/labels',
        label
    );

    return {
        type: CREATE_LABEL,
        payload: request
    };
}

export function getLabels() {
    const request = axios.get(
        ROOT_URL + '/labels'
    );

    return {
        type: GET_LABELS,
        payload: request
    };
}

export function deleteLabel(labelId) {
    const request = axios.post(
        ROOT_URL + '/labels/' + labelId
    );

    return {
        type: DELETE_LABEL,
        payload: request
    };
}