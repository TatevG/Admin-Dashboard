
export const ACTION_ERROR_CARD = 'ACTION_ERROR_CARD';
export const CARDS_LOADING = 'CARDS_LOADING';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARD_BY_ID_SUCCESS = 'GET_CARD_BY_ID_SUCCESS';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_MANY_SUCCESS = 'ADD_CARD_MANY_SUCCESS';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const UNASSIGNED_SUCCESS = 'UNASSIGNED_SUCCESS';
export const GET_AGENTS_SUCCESS = 'GET_AGENTS_SUCCESS';
export const ASSIGN_CARD_SUCCESS = 'ASSIGN_CARD_SUCCESS';
const initStore = {
    loading: false,
    data: [],
    agents: [],
    count: 0,
    error: "",
}
const CardsReducer = (store = initStore, action) => {
    switch (action.type) {
        case ACTION_ERROR_CARD:
            return { ...store, error: action.playload };
        case CARDS_LOADING:
            return { ...store, loading: action.playload };
        case GET_CARDS_SUCCESS:
            return { ...store, data: action.playload.data, count: action.playload.count };
        case GET_CARD_BY_ID_SUCCESS:
            return { ...store, data: [action.playload], count: 1 };
        case ADD_CARD_SUCCESS:
            return { ...store, data: [...store.data, action.playload], count: ++store.count };
        case ADD_CARD_MANY_SUCCESS:
            return { ...store, data: [...store.data, ...action.playload], count: store.count + action.playload.length };
        case UNASSIGNED_SUCCESS:
            store.data.splice(store.data.findIndex((card) => card._id === action.playload._id), 1, action.playload);
            return { ...store, data: [...store.data] };
        case ASSIGN_CARD_SUCCESS:
            return {
                ...store, data: store.data.map((item) => {
                    return item._id === action.playload._id ? action.playload : item
                })
            };
        case GET_AGENTS_SUCCESS:
            return { ...store, agents: action.playload };
        default:
            return store;
    }
}
export default CardsReducer;