import {
    ACTION_ERROR_USER,
    GET_USERS_LOADING,
    GET_USER_LOADING,
    GET_USERS_SUCCESS,
    GET_USER_SUCCESS,
    TOGGLE_DISABLE_USER_SUCCESS,
    SEND_USER_NOTIFICATION_SUCCESS,
    UPDATE_USER_FIELD_SUCESS,
    USER_TRANSACTION_LOADING,
    GET_USER_TRANSACTION_SUCCESS,
    USE_USER_BONUS_SUCCESS,
    ADD_IMAGE_TO_USER_SUCCESS,
    PROVIDE_USER_SUCCESS,
} from '../reducers/user-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_USER,
        playload: error,
    }
}
function usersLoading(data) {
    return {
        type: GET_USERS_LOADING,
        playload: data
    }
}
function userLoading(data) {
    return {
        type: GET_USER_LOADING,
        playload: data
    }
}
function getUsersSuccess(data) {
    return {
        type: GET_USERS_SUCCESS,
        playload: data
    }
}
function toggleDisableUser(data) {
    return {
        type: TOGGLE_DISABLE_USER_SUCCESS,
        playload: data
    }
}
function sendNotificationToUserSuccess(data){
    return {
        type: SEND_USER_NOTIFICATION_SUCCESS,
        playload: data
    }
}
function getUserSuccess(data) {
    return {
        type: GET_USER_SUCCESS,
        playload: data
    }
}
function updateUserFieldSuccess(data){
    return {
        type: UPDATE_USER_FIELD_SUCESS,
        playload: data
    }
}
function getUserTransactionsSuccess(data) {
    return {
        type: GET_USER_TRANSACTION_SUCCESS,
        playload: data
    }
}
function userTransactionLoading(data){
    return {
        type: USER_TRANSACTION_LOADING,
        playload: data 
    }
}
function useUserBonusSuccess(data){
    return {
        type: USE_USER_BONUS_SUCCESS,
        playload: data
    }
}
function addImageToUserSuccess(data){
    return {
        type: ADD_IMAGE_TO_USER_SUCCESS,
        playload: data
    }
}
function provideUserSuccess(data){
    return {
        type: PROVIDE_USER_SUCCESS,
        playload: data
    }
}
export function GetUsers(filter) {
    return async (dispatch) => {
        try {
            dispatch(usersLoading(true));
            const data = await axios.get(`${BASE_URL}/user/`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getUsersSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(usersLoading(false));
        }
    };
}

export function ToggleDisableUser(id) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/user/toggleRemove`, {
                userId: id,
            }, {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(toggleDisableUser(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function SendNotificationToUser(id, title, body) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/user/sendNotificationToUser`, {
                userId: id,
                title,
                body,
            }, {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(sendNotificationToUserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function GetUser(id){
    return async (dispatch) => {
        try {
            dispatch(userLoading(true));
            const data = await axios.get(`${BASE_URL}/user/${id}`, 
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getUserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally{
            dispatch(userLoading(false));
        }
    };
}
export function UpdateUserField(id, name, value){
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/user/${id}`, {
                [name]: value,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(updateUserFieldSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function GetUserTransactions(id, order){
    return async (dispatch) => {
        try {
            dispatch(userTransactionLoading(true));
            const data = await axios.get(`${BASE_URL}/transaction/${id}?order=${order}`, 
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getUserTransactionsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally{
            dispatch(userTransactionLoading(false));
        }
    };
}
export function UseUserBonus(cardNumber, balance, reason) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/transaction/dashSpend`, {
                cardNumber,
                total : balance,
                type: reason,
            }, {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(useUserBonusSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AddImageToUser(id, formData){
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/user/image/${id}`, formData, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                }
            });
            dispatch(addImageToUserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function ProvideUser(userId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/user/provideUser`, {
                userId,
            }, {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(provideUserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}