import { 
    ACTION_ERROR_ADMINISTRATIVE_USER,
    GET_ADMINISTRATIVE_USER_SUCCESS,
    ADMINISTRATIVE_USER_LOADING,
    UPDATE_ADMINISTRATIVE_USER_SUCCESS,
    ADD_ADMINISTRATIVE_USER_SUCCESS,
    DELETE_ADMINISTRATIVE_USER_SUCCESS,
} from '../reducers/administrative-users';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_ADMINISTRATIVE_USER,
        playload: error,
    }
}
function administrativeUserLoading(data){
    return{
        type: ADMINISTRATIVE_USER_LOADING,
        playload: data
    }
}
function getAdministrativeUsersSuccess(data){
    return{
        type: GET_ADMINISTRATIVE_USER_SUCCESS,
        playload: data,
    }
}
function updateAdministrativeUser(data){
    return{
        type: UPDATE_ADMINISTRATIVE_USER_SUCCESS,
        playload: data,
    }
}

function addAdministrativeUser(data){
    return{
        type: ADD_ADMINISTRATIVE_USER_SUCCESS,
        playload: data,
    }
}
function deleteAdministrativeUser(data){
    return{
        type: DELETE_ADMINISTRATIVE_USER_SUCCESS,
        playload: data,
    }
}
export function GetAdministrativeUsers(type){
    return async (dispatch) => {
        try {
            dispatch(administrativeUserLoading(true));
            const data = await axios.post(`${BASE_URL}/user/administrativeUsers`, type,
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getAdministrativeUsersSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally{
            dispatch(administrativeUserLoading(false));
        }
    };
}
export function UpdateAdministrativeUser(rowId, dataUpdate) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/user/UpdateAdministrativeUsers`, { ...dataUpdate, userId: rowId }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(updateAdministrativeUser(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AddAdministrativeUser(dataAdd) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/user/AddAdministrativeUsers`, dataAdd, 
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(addAdministrativeUser(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function DeleteAdministrativeUser(adUserId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/user/delAdministrativeUsers`, {
                userId: adUserId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteAdministrativeUser(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}