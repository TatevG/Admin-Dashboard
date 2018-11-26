import {
    ACTION_ERROR_SHOP,
    REMOVE_FRANCHISER_SUCCESS,
    ADD_FRANCHISER_SUCCESS,
    CHANGE_OWNER_SUCCESS,
    ADD_MANAGER_SUCCESS,
    REMOVE_TYPE_FROM_SHOP_SUCCESS,
    ADD_TYPE_TO_SHOP_SUCCESS,
    UPDATE_SHOP_DETAILS_SUCCESS,
    UPDATE_SHOP_LOADING,
    ADD_USER_TO_SHOP_SUCCESS,
    DELETE_USER_FROM_SHOP_SUCCESS,
    ADD_SHOP_USER_PERMISSION_SUCCESS,
    UPDATE_SHOP_TYPE_DETAILS_SUCCESS,
    DELETE_SHOP_USER_PERMISSION_SUCCESS,
    DELETE_SHOP_SUCCESS,

} from '../reducers/shop-reducer';
import axios from 'axios';

import {
    getShopSuccess
} from './shop';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_SHOP,
        playload: error,
    }
}

function removeFranchiserSuccess(data) {
    return {
        type: REMOVE_FRANCHISER_SUCCESS,
        playload: data,
    }
}

function assignFranchiserSuccess(data) {
    return {
        type: ADD_FRANCHISER_SUCCESS,
        playload: data,
    }
}

function changeOwnerSuccess(data) {
    return {
        type: CHANGE_OWNER_SUCCESS,
        playload: data,
    }
}
function addManagerSuccess(data){
    return {
        type: ADD_MANAGER_SUCCESS,
        playload: data,
    }
}

function removeTypeFromShopSuccess(data) {
    return {
        type: REMOVE_TYPE_FROM_SHOP_SUCCESS,
        playload: data
    }
}

function addTypeToShopSuccess(data) {
    return {
        type: ADD_TYPE_TO_SHOP_SUCCESS,
        playload: data
    }
}

function updateShopDetailsSuccess(data) {
    return {
        type: UPDATE_SHOP_DETAILS_SUCCESS,
        playload: data
    }
}

function updateShopLoading(data) {
    return {
        type: UPDATE_SHOP_LOADING,
        playload: data
    }
}
function deleteShopSuccess(data){
    return{
        type: DELETE_SHOP_SUCCESS,
        playload: data
    }
}
function addUserToShopSuccess(data) {
    return {
        type: ADD_USER_TO_SHOP_SUCCESS,
        playload: data
    }
}

function deleteUserFromShopSuccess(data) {
    return {
        type: DELETE_USER_FROM_SHOP_SUCCESS,
        playload: data
    }
}

function addShopUserPermissionSuccess(data) {
    return {
        type: ADD_SHOP_USER_PERMISSION_SUCCESS,
        playload: data,
    };
}
function updateTypeBonusAndComission(data){
    return {
        type: UPDATE_SHOP_TYPE_DETAILS_SUCCESS,
        playload: data
    }
}

function deleteShopUserPermissionSuccess(data) {
    return {
        type: DELETE_SHOP_USER_PERMISSION_SUCCESS,
        playload: data,
    };
}
export function RemoveFranchiserFromShop(shopId, franchisorId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/removeAssignFranchisor`, {
                franchisorId,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(removeFranchiserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function AssignFranchiserToShop(shopId, franchisorId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/assignFranchisor`, {
                franchisorId,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(assignFranchiserSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}


export function ChangeOwner(shopId, ownerId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/changeOwner`, {
                ownerId,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(changeOwnerSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function AddManager(shopId, managerId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/changeManager`, {
                managerId,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(addManagerSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function RemoveTypeFromShop(shopId, typeId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/popType`, {
                typeId,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(removeTypeFromShopSuccess(data.data.data));
            const data1 = await axios.get(`${BASE_URL}/shop/${shopId}`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getShopSuccess(data1.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function AddTypeToShop(shopId, typeId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/pushType`, {
                ...typeId,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(addTypeToShopSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function UpdateShopDetails(shopId, updateData, file) {
    return async (dispatch) => {
        try {
            dispatch(updateShopLoading(true));
            const data = await axios.post(`${BASE_URL}/shop/updateDetalis`, {
                shopId,
                shop: updateData,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(updateShopDetailsSuccess(data.data.data));
            if(file) {
                const formData = new FormData();
                formData.append('shopId', shopId);
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
        } finally {
            dispatch(updateShopLoading(false));
        }
    };
}
export function AddUserToShop(shopId, shopUserData) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/addShopUserToShop`, {
                user: shopUserData,
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(addUserToShopSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}

export function DeleteUserFromShop(shopUserId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/dellShopUserFormShop`, {
                shopUserId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteUserFromShopSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function DelShopUserPermission(shopUserId, permissionId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/delShopUserPermission`, {
                userId: shopUserId,
                permissionId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteShopUserPermissionSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AddShopUserPermission(shopUserId, permissionId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/addShopUserPermission`, {
                userId: shopUserId,
                permissionId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(addShopUserPermissionSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function UpdateTypeBonusAndComission(shopId, shopTypeId, changes) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/shop/EdistShopBonuseOrCommision`, {
                shopId,
                shopTypeId,
                ...changes,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(updateTypeBonusAndComission(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function DeleteShop(shopId, history) {
    return async (dispatch) => {
        try {
            const data = await axios.delete(`${BASE_URL}/shop/`, { // endpoint
                shopId,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteShopSuccess(data.data.data));
            history.push('/shopsList');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}