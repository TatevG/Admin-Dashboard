import {
    ACTION_ERROR_SHOPS_ACTIVITY,
    SHOPS_ACTIVITY_LOADING,
    GET_SHOPS_ACTIVITY_SUCCESS,
    GET_DEMO_REQUESTS_SUCCESS,
    GET_DEMO_REQUESTS_LOADING,
    ACTION_ERROR_DEMO_REQUEST,
} from '../reducers/utilities-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_SHOPS_ACTIVITY,
        playload: error,
    }
}
function shopsActivityLoading(data) {
    return {
        type: SHOPS_ACTIVITY_LOADING,
        playload: data
    }
}
function demoRequestsError(error){
    return {
        type: ACTION_ERROR_DEMO_REQUEST,
        playload: error
    }
}
function getDemoRequestsLoading(data) {
    return {
        type: GET_DEMO_REQUESTS_LOADING,
        playload: data
    }
}
function getShopsActivitySuccess(data) {
    return {
        type: GET_SHOPS_ACTIVITY_SUCCESS,
        playload: data
    }
}
function getDemoRequestsSuccess(data) {
    return {
        type: GET_DEMO_REQUESTS_SUCCESS,
        playload: data
    }
}
export function SearchCards(text) {
    const data = axios.get(`${BASE_URL}/card/search`, {
        params: { search: text },
        headers: {
            'Authorization': window.localStorage.getItem('accessToken'),
        }
    });
    return data;
}
export function GetShopsActivity(filter) {
    return async (dispatch) => {
        try {
            dispatch(shopsActivityLoading(true));
            const data = await axios.get(`${BASE_URL}/shop/shopActivite`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getShopsActivitySuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(shopsActivityLoading(false));
        }
    };
}
export function SearchCardsUnassigned(text) {
    const data = axios.get(`${BASE_URL}/card/searchUnAssign`, {
        params: { search: text },
        headers: {
            'Authorization': window.localStorage.getItem('accessToken'),
        }
    });
    return data;
}
export function GetUserFile(filter) {
    axios({
        url: `${BASE_URL}/user/exportUser`,
        method: 'GET',
        responseType: 'blob', // important
        headers: { 'Authorization': window.localStorage.getItem('accessToken') },
        params: filter,
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
    });
}
export function GetShopsFile(filter) {
    axios({
        url: `${BASE_URL}/`, // endpoint
        method: 'GET',
        responseType: 'blob',
        headers: { 'Authorization': window.localStorage.getItem('accessToken') },
        params: filter,
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'shops.csv');
        document.body.appendChild(link);
        link.click();
    });
}
export function GetProductsFile(filter) {
    axios({
        url: `${BASE_URL}/products/export`,
        method: 'GET',
        responseType: 'blob',
        headers: { 'Authorization': window.localStorage.getItem('accessToken') },
        params: filter,
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.csv');
        document.body.appendChild(link);
        link.click();
    });
}
export function GetBonusInFile(filter) {
    axios({
        url: `${BASE_URL}/transaction/inExport`,
        method: 'GET',
        responseType: 'blob',
        headers: { 'Authorization': window.localStorage.getItem('accessToken') },
        params: filter,
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'bonusIn.csv');
        document.body.appendChild(link);
        link.click();
    });
}
export function GetBonusOutFile(filter) {
    axios({
        url: `${BASE_URL}/transaction/outExport`,
        method: 'GET',
        responseType: 'blob',
        headers: { 'Authorization': window.localStorage.getItem('accessToken') },
        params: filter,
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'bonusOut.csv');
        document.body.appendChild(link);
        link.click();
    });
}
export function GetDemoRequests(filter) {
    return async (dispatch) => {
        try {
            dispatch(getDemoRequestsLoading(true));
            const data = await axios.get(`${BASE_URL}/request/all`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getDemoRequestsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(demoRequestsError(error.response.data.errors));
            }
        } finally {
            dispatch(getDemoRequestsLoading(false));
        }
    };
}