export const ACTION_ERROR_USER = 'ACTION_ERROR_USER';
export const GET_USERS_LOADING = 'GET_USERS_LOADING';
export const GET_USER_LOADING = 'GET_USER_LOADING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const TOGGLE_DISABLE_USER_SUCCESS = 'TOGGLE_DISABLE_USER_SUCCESS';
export const SEND_USER_NOTIFICATION_SUCCESS = 'SEND_USER_NOTIFICATION_SUCCESS';
export const UPDATE_USER_FIELD_SUCESS = 'UPDATE_USER_FIELD_SUCESS';
export const USER_TRANSACTION_LOADING = 'USER_TRANSACTION_LOADING';
export const GET_USER_TRANSACTION_SUCCESS = 'GET_USER_TRANSACTION_SUCCESS';
export const USE_USER_BONUS_SUCCESS = 'USE_USER_BONUS_SUCCESS';
export const ADD_IMAGE_TO_USER_SUCCESS = 'ADD_IMAGE_TO_USER_SUCCESS';
export const PROVIDE_USER_SUCCESS = 'PROVIDE_USER_SUCCESS';
export const ASSIGN_CARD_SUCCESS = 'ASSIGN_CARD_SUCCESS';

const initStore = {
    loading: false,
    transactionLoading: false,
    data: [],
    transaction: [],
    user: {},
    count: 0,
    error: "",
}
const UserReducer = (store = initStore, action) => {
    switch (action.type) {
        case ACTION_ERROR_USER:
            return { ...store, error: action.playload };
        case GET_USERS_LOADING:
            return { ...store, loading: action.playload };
        case GET_USER_LOADING:
            return { ...store, loading: action.playload };
        case USER_TRANSACTION_LOADING:
            return { ...store, transactionLoading: action.playload };
        case GET_USERS_SUCCESS:
            return { ...store, data: action.playload.data, count: action.playload.count };
        case GET_USER_SUCCESS:
            return { ...store, user: action.playload };
        case TOGGLE_DISABLE_USER_SUCCESS:
            (store.data.find(item => item._id === action.playload._id)).removed = action.playload.data;
            return { ...store, data: [...store.data] };
        case SEND_USER_NOTIFICATION_SUCCESS:
            return { ...store };
        case UPDATE_USER_FIELD_SUCESS:
            return { ...store };
        case GET_USER_TRANSACTION_SUCCESS:
            return { ...store, transaction: action.playload };
        case USE_USER_BONUS_SUCCESS:
            return { ...store };
        case ADD_IMAGE_TO_USER_SUCCESS:
            return { ...store, user: action.playload };
        case PROVIDE_USER_SUCCESS:
            return { ...store, user: { ...store.user, provider: action.playload.provider } };
        case ASSIGN_CARD_SUCCESS:
            return { ...store, user: { ...store.user, username: action.playload.number } };
        default:
            return store;
    }
}
export default UserReducer;