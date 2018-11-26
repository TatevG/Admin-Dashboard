import {
    ACTION_ERROR_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    ADD_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    PRODUCTS_LOADING,
} from '../reducers/products-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_PRODUCTS,
        playload: error,
    }
}
function productsLoading(data) {
    return {
        type: PRODUCTS_LOADING,
        playload: data
    }
}
function getProductsSuccess(data) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        playload: data,
    }
}
function updateProduct(data) {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        playload: data,
    }
}

function addProduct(data) {
    return {
        type: ADD_PRODUCT_SUCCESS,
        playload: data,
    }
}
function deleteProduct(data) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        playload: data,
    }
}
export function GetProducts(filter) {
    return async (dispatch) => {
        try {
            dispatch(productsLoading(true));
            const data = await axios.get(`${BASE_URL}/products/`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getProductsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(productsLoading(false));
        }
    };
}
export function UpdateProduct(rowId, dataUpdate) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/products/${rowId}`, dataUpdate,
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(updateProduct(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AddProduct(dataAdd) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/products/`, dataAdd,
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(addProduct(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function DeleteProduct(productId) {
    return async (dispatch) => {
        try {
            const data = await axios.delete(`${BASE_URL}/products/${productId}`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteProduct(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}