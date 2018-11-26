import {
    ACTION_ERROR_CARD,
    CARDS_LOADING,
    GET_CARDS_SUCCESS,
    GET_CARD_BY_ID_SUCCESS,
    ADD_CARD_SUCCESS,
    ADD_CARD_MANY_SUCCESS,
    DELETE_CARD_SUCCESS,
    UNASSIGNED_SUCCESS,
    GET_AGENTS_SUCCESS,
    ASSIGN_CARD_SUCCESS,
} from '../reducers/card-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: ACTION_ERROR_CARD,
        playload: error,
    }
}
function cardsLoading(data) {
    return {
        type: CARDS_LOADING,
        playload: data
    }
}
function getCardsSuccess(data){
    return {
        type: GET_CARDS_SUCCESS,
        playload: data
    }
}
function getCardByIdSuccess(data){
    return {
        type: GET_CARD_BY_ID_SUCCESS,
        playload: data
    }
}
function addCardSuccess(data){
    return {
        type: ADD_CARD_SUCCESS,
        playload: data
    }
}
function addCardManySuccess(data){
    return {
        type: ADD_CARD_MANY_SUCCESS,
        playload: data
    }
}
function deleteCardSuccess(data){
    return {
        type: DELETE_CARD_SUCCESS,
        playload: data
    }
}
function unAssignedSuccess(data){
    return {
        type: UNASSIGNED_SUCCESS,
        playload: data
    }
}
function assignCardSuccess(data){
    return {
        type: ASSIGN_CARD_SUCCESS,
        playload: data
    }
}
function getAgentsSucess(data){
    return {
        type: GET_AGENTS_SUCCESS,
        playload: data
    }
}
export function GetCards(filter) {
    return async (dispatch) => {
        try {
            dispatch(cardsLoading(true));
            const data = await axios.get(`${BASE_URL}/card`, {
                params: filter,
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getCardsSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(cardsLoading(false));
        }
    };
}
export function GetCardById(id) {
    return async (dispatch) => {
        try {
            dispatch(cardsLoading(true));
            const data = await axios.get(`${BASE_URL}/card/byId/${id}`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getCardByIdSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(cardsLoading(false));
        }
    };
}
export function AddCard(number, agentId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/card`, {
                number,
                agentId,
            },
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(addCardSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AddCardMany(range){
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/card/many`, range,
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(addCardManySuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function DeleteCard(cardId) {
    return async (dispatch) => {
        try {
            const data = await axios.delete(`${BASE_URL}/`, { // endpoint
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(deleteCardSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AssignAgent(cardId, agentId) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/card/AssignTo/${cardId}`, {
                agentId,
            },{
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(unAssignedSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function UnAssigned(id) {
    return async (dispatch) => {
        try {
            const data = await axios.put(`${BASE_URL}/card/unAssign/${id}`, {},{
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(unAssignedSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function AssignCard(userId, cardId) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`${BASE_URL}/card/assignUser`, {
                userId,
                cardId,
            },{
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(assignCardSuccess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
export function GetAgents(){
    return async (dispatch) => {
        try {
            const data = await axios.get(`${BASE_URL}/user/agents`, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getAgentsSucess(data.data.data));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}