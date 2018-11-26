export const ACTION_ERROR_TRANSACTIONS = 'ACTION_ERROR_TRANSACTIONS';
export const GET_TRANSACTIONS_LOADING = 'GET_USERS_LOADING';
export const GET_BONUS_IN_SUCCESS = 'GET_BONUS_IN_SUCCESS';
export const GET_BONUS_OUT_SUCCESS = 'GET_BONUS_OUT_SUCCESS';
export const CHANGE_COUNT_SUCCESS = 'CHANGE_COUNT_SUCCESS';

const initStore = {
    loading: false,
    dataIn: [],
    dataOut: [],
    count: 0,
    error: "",
}
const TransactionsReducer = (store = initStore, action) => {
    switch (action.type) {
        case ACTION_ERROR_TRANSACTIONS:
            return { ...store, error: action.playload };
        case GET_TRANSACTIONS_LOADING:
            return { ...store, loading: action.playload };
        case GET_BONUS_IN_SUCCESS:
            return { ...store, dataIn: action.playload.data, count: action.playload.count };
        case GET_BONUS_OUT_SUCCESS:
            return { ...store, dataOut: action.playload.data, count: action.playload.count };
        case CHANGE_COUNT_SUCCESS:
        store.dataIn.map((item) => { return item._id === action.playload._id ? action.playload : item })
        return { ...store, dataIn: [ ...store.dataIn ]};
        default:
            return store;
    }
}
export default TransactionsReducer;