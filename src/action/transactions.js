import {
    ACTION_ERROR_TRANSACTIONS,
    GET_BONUS_IN_SUCCESS,
    GET_BONUS_OUT_SUCCESS,
    GET_TRANSACTIONS_LOADING,
    CHANGE_COUNT_SUCCESS,
} from '../reducers/transactions-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_TRANSACTIONS,
        playload: error,
    }
}
function getTransactionsLoading(data) {
    return {
        type: GET_TRANSACTIONS_LOADING,
        playload: data
    }
}
function getBonusInSussess(data) {
    return {
        type: GET_BONUS_IN_SUCCESS,
        playload: data
    }
}
function getBonusOutSussess(data) {
    return {
        type: GET_BONUS_OUT_SUCCESS,
        playload: data
    }
}
function getChangeCountSussess(data){
    return {
        type: CHANGE_COUNT_SUCCESS,
        playload: data
    }
}
export function GetBonusIn(filter) {
    return async (dispatch) => {
        try {
            dispatch(getTransactionsLoading(true));
            const data = await axios.get(`${BASE_URL}/transaction/in`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getBonusInSussess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(getTransactionsLoading(false));
        }
    };
}
export function GetBonusOut(filter) {
    return async (dispatch) => {
        try {
            dispatch(getTransactionsLoading(true));
            const data = await axios.get(`${BASE_URL}/transaction/out`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getBonusOutSussess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(getTransactionsLoading(false));
        }
    };
}
export function ChangeCount(id, count) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/transaction`, {
                transactionId: id,
                total: count,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getChangeCountSussess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}