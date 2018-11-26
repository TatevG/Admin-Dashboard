import { 
    GET_ROOT_TYPES_SUCCESS,
    GET_TYPES_SUCCESS,
    ACTION_ERROR_SHOP, ADD_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_TYPE_SUCCESS,
    FRANCHISER_SUCCESS,
    OWNER_SUCCESS,
    MANAGER_SUCCESS,
    CREATE_SHOP_SUCCESS,
    GET_SHOPS_SUCCESS,
    GET_SHOP_SUCCESS,
    GET_SHOP_LOADING,
    GET_SHOPS_LOADING,
    CREATE_SHOP_LOADING,
    GET_PROVIDERS_SUCCESS,
} from '../reducers/shop-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function getRootTypesSuccess(data) {
    return {
        type: GET_ROOT_TYPES_SUCCESS,
        playload: data,
    }
}
function getTypesSuccess(data) {
    return {
        type: GET_TYPES_SUCCESS,
        playload: data,
    }
}
function addTypesSuccess(data) {
    return {
        type: ADD_SUCCESS,
        playload: data,
    }
}
function updateTypesSuccess(data){
    return{
        type: UPDATE_SUCCESS,
        playload: data,
    }
}
function deleteTypesSuccess(data) {
    return {
        type: DELETE_TYPE_SUCCESS,
        playload: data,
    }
}
function getFranchiserSuccess(data) {
    return {
        type: FRANCHISER_SUCCESS,
        playload: data,
    }
}
function getOwnerSuccess(data) {
    return {
        type: OWNER_SUCCESS,
        playload: data,
    }
}
function getManagerSuccess(data){
    return {
        type: MANAGER_SUCCESS,
        playload: data,
    }
}
function actionError(error) {
    return {
        type: ACTION_ERROR_SHOP,
        playload: error,
    }
}
function createShopSuccess(data){
    return{
        type: CREATE_SHOP_SUCCESS,
        playload: data
    }
}
function getShopsSuccess(data){
    return{
        type: GET_SHOPS_SUCCESS,
        playload: data
    }
}
export function getShopSuccess(data){
    return{
        type: GET_SHOP_SUCCESS,
        playload: data
    }
}
function shopLoading(data){
    return{
        type: GET_SHOP_LOADING,
        playload: data
    }
}
function shopsLoading(data){
    return{
        type: GET_SHOPS_LOADING,
        playload: data
    }
}
function createShopLoading(data){
    return{
        type: CREATE_SHOP_LOADING,
        playload: data
    }
}
function getProvidersSuccess(data){
    return{
        type: GET_PROVIDERS_SUCCESS,
        playload: data
    }
}

export function GetRootTypes() {
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/shop/rootTypes`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getRootTypesSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function GetTypes(){
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/shop/alltypes`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getTypesSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AddType(formData){
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/createType`, formData, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                }
            });
            dispatch(addTypesSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function UpdateType(formData) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/shop/type`, formData, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                }
            });
            dispatch(updateTypesSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function DeleteType(typeId) {
    return async (dispatch) => {
        try {
            const data = await axios.delete(`${BASE_URL}/shop/type/${typeId}`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteTypesSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function GetFranchiser(){
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/user/franchiser/`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getFranchiserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function GetOwner() {
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/user/owner/`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getOwnerSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function GetManager() {
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/user/freeManagers`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getManagerSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function CreateShop(body, file) {
    return async (dispatch) => {
        try {
            dispatch(createShopLoading(true));
            const data = await axios.post(`${BASE_URL}/shop/create/`, body, 
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(createShopSuccess(data.data.data));
            if(file) {
                const formData = new FormData();
                formData.append('shopId', data.data.data._id);
                formData.append('image', file);
                axios.post(`${BASE_URL}/shop/updateImage/`, formData, 
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                        'Content-Type': 'multipart/form-data',
                    }
                }).then();
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
        finally{
            dispatch(createShopLoading(false));
        }
    };
}

export function GetShops(filter){
    return async (dispatch) => {
        try {
            dispatch(shopsLoading(true));
            const data = await axios.get(`${BASE_URL}/shop/all`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getShopsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
        finally{
            dispatch(shopsLoading(false));
        }
    };
}

export function GetShop(id){
    return async (dispatch) => {
        try {
            dispatch(shopLoading(true));
            const data = await axios.get(`${BASE_URL}/shop/${id}`, 
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getShopSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally{
            dispatch(shopLoading(false));
        }
    };
}

export function GetProviders(){
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/user/providers`,
            {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getProvidersSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}