export const GET_ADMINISTRATIVE_USER_SUCCESS = 'GET_ADMINISTRATIVE_USER_SUCCESS';
export const ADMINISTRATIVE_USER_LOADING = 'ADMINISTRATIVE_USER_LOADING';
export const UPDATE_ADMINISTRATIVE_USER_SUCCESS = 'UPDATE_ADMINISTRATIVE_USER_SUCCESS';
export const ADD_ADMINISTRATIVE_USER_SUCCESS = 'ADD_ADMINISTRATIVE_USER_SUCCESS';
export const DELETE_ADMINISTRATIVE_USER_SUCCESS = 'DELETE_ADMINISTRATIVE_USER_SUCCESS';
export const ACTION_ERROR_ADMINISTRATIVE_USER = 'ACTION_ERROR_ADMINISTRATIVE_USER';


const initStore = {
    loading: false,
    data: [],
    count: 0,
    error: "",
}
const AdministrativeUserReducer = (store = initStore, action) => {
    switch (action.type) {
        case GET_ADMINISTRATIVE_USER_SUCCESS:
            return { ...store, data: action.playload.data, count: action.playload.count };
        case ACTION_ERROR_ADMINISTRATIVE_USER:
            return { ...store, error: action.playload };
        case ADMINISTRATIVE_USER_LOADING:
            return { ...store, loading: action.playload };
        case UPDATE_ADMINISTRATIVE_USER_SUCCESS:
            return {
                ...store, data: store.data.map((item) => {
                    return item._id === action.playload._id ? action.playload : item
                })
            };
        case ADD_ADMINISTRATIVE_USER_SUCCESS:
            return { ...store, data: [...store.data, action.playload], count: ++store.count };
        case DELETE_ADMINISTRATIVE_USER_SUCCESS:
            store.data.splice(store.data.findIndex((adUser) => adUser._id === action.playload._id), 1);
            return { ...store, data: [ ...store.data ], count:--store.count };
        default:
            return store;
    }
}
export default AdministrativeUserReducer;