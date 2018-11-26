
export const ACTION_ERROR_SHOPS_ACTIVITY = 'ACTION_ERROR_SHOPS_ACTIVITY';
export const SHOPS_ACTIVITY_LOADING = 'SHOPS_ACTIVITY_LOADING';
export const GET_SHOPS_ACTIVITY_SUCCESS = 'GET_SHOPS_ACTIVITY_SUCCESS';
export const GET_DEMO_REQUESTS_SUCCESS = 'GET_DEMO_REQUESTS_SUCCESS';
export const GET_DEMO_REQUESTS_LOADING = 'GET_DEMO_REQUESTS_LOADING';
export const ACTION_ERROR_DEMO_REQUEST = 'ACTION_ERROR_DEMO_REQUEST';

const initStore = {
    loading: false,
    data: [],
    demoRequestData: [],
    demoRequestCount: 0,
    error: "",
}
const UtilitiesReducer = (store = initStore, action) => {
    switch (action.type) {
        case ACTION_ERROR_SHOPS_ACTIVITY:
            return { ...store, error: action.playload };
        case SHOPS_ACTIVITY_LOADING:
            return { ...store, loading: action.playload };
        case GET_SHOPS_ACTIVITY_SUCCESS:
            return { ...store, data: action.playload.shops, count: action.playload.count };
        case ACTION_ERROR_DEMO_REQUEST:
            return { ...store, requestError: action.playload };
        case GET_DEMO_REQUESTS_LOADING:
            return { ...store, loading: action.playload };
        case GET_DEMO_REQUESTS_SUCCESS:
        console.log(action.playload.data);
        console.log(action.playload.count);
            return { ...store, demoRequestData: action.playload.data, demoRequestCount: action.playload.count };
        default:
            return store;
    }
}
export default UtilitiesReducer;