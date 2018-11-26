import {
    GET_ALL_NEWS_SUCCESS,
    GET_NEWS_SUCCESS,
    ACTION_ERROR_NEWS,
    NEWS_LOADING,
    ADD_NEWS_SUCCESS,
    UPDATE_NEWS_SUCCESS,
    ONE_NEWS_LOADING,
} from '../reducers/news-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_NEWS,
        playload: error,
    }
}
function newsLoading(data) {
    return {
        type: NEWS_LOADING,
        playload: data
    }
}
function oneNewsLoading(data) {
    return {
        type: ONE_NEWS_LOADING,
        playload: data,
    }
}
function getNewsSuccess(data){
    return {
        type: GET_NEWS_SUCCESS,
        playload: data,
    }
}
function getAllNewsSuccess(data){
    return {
        type: GET_ALL_NEWS_SUCCESS,
        playload: data,
    }
}
function addNewsSuccess(data){
    return {
        type: ADD_NEWS_SUCCESS,
        playload: data,
    }
}

function updateNewsSuccess(data) {
    return {
        type: UPDATE_NEWS_SUCCESS,
        playload: data
    }
}
export function GetAllNews(filter) {
    return async (dispatch) => {
        try {
            dispatch(newsLoading(true));
            const data = await axios.get(`${BASE_URL}/news/`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getAllNewsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(newsLoading(false));
        }
    };
}

export function GetNews(id){
    return async (dispatch) => {
        try {
            dispatch(oneNewsLoading(true));
            const data = await axios.get(`${BASE_URL}/news/${id}`,
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getNewsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally{
            dispatch(oneNewsLoading(false));
        }
    };
}
export function AddNews(formData){
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/news`, formData, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                }
            });
            dispatch(addNewsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function UpdateNews(id, formData){
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/news/${id}`, formData, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                }
            });
            dispatch(updateNewsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

