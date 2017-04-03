import axios from 'axios';

const ROOT_URL = 'http://shielded-basin-84367.herokuapp.com';

export const CREATE_ENTRY_AND_TAGS = 'CREATE_ENTRY_AND_TAGS';
export const GET_ENTRIES_AND_TAGS = 'GET_ENTRIES_AND_TAGS';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';

export const GET_TASKS = 'GET_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_SUBTASK = 'CREATE_SUBTASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_SUBTASK = 'UPDATE_SUBTASK';

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

export function getEntriesAndTags(userId) {
    const request = axios.get(
        ROOT_URL + '/entries/' + userId
    );

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

export function getTasks(userId) {
    const request = axios.get(
        ROOT_URL + '/tasks/' + userId
    );

    return {
        type: GET_TASKS,
        payload: request
    };
}

export function createTask(task) {
    const request = axios.post(
        ROOT_URL + '/tasks',
        task
    );

    return {
        type: CREATE_TASK,
        payload: request
    };
}

export function createSubtask(subtask, userId) {
    const request = axios.post(
        ROOT_URL + '/tasks/' + userId + '/' + subtask.taskId + '/subtasks',
        subtask
    );

    return {
        type: CREATE_SUBTASK,
        payload: request
    };
}

export function updateTask(task, userId) {
    const request = axios.post(
        ROOT_URL + '/tasks/' + userId + '/' + task.id,
        task
    );

    return {
        type: UPDATE_TASK,
        payload: request
    };
}

export function updateSubtask(subtask, userId) {
    const request = axios.post(
        ROOT_URL + '/tasks/' + userId + '/' + subtask.taskId + '/subtasks/' + subtask.id,
        subtask
    );

    return {
        type: UPDATE_SUBTASK,
        payload: request
    };
}