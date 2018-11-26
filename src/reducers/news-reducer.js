export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
export const GET_ALL_NEWS_SUCCESS = 'GET_ALL_NEWS_SUCCESS';
export const NEWS_LOADING = 'NEWS_LOADING';
export const ONE_NEWS_LOADING = 'ONE_NEWS_LOADING';
export const ADD_NEWS_SUCCESS = 'ADD_NEWS_SUCCESS';
export const UPDATE_NEWS_SUCCESS = 'UPDATE_NEWS_SUCCESS';
export const ACTION_ERROR_NEWS = 'ACTION_ERROR_NEWS';


const initStore = {
    loading: false,
    oneNewsLoading: false,
    isEnd: false,
    data: [],
    news: {},
    error: "",
}
const NewsReducer = (store = initStore, action) => {
    switch (action.type) {
        case GET_NEWS_SUCCESS:
            return { ...store, news: action.playload };
        case GET_ALL_NEWS_SUCCESS:
            const end = action.playload.length < 10;
            return { ...store, data: store.data.concat(action.playload), isEnd: end };
        case ACTION_ERROR_NEWS:
            return { ...store, error: action.playload };
        case NEWS_LOADING:
            return { ...store, loading: action.playload };
        case ONE_NEWS_LOADING:
            return { ...store, oneNewsLoading: action.playload };
        case UPDATE_NEWS_SUCCESS:
            return {
                ...store, data: store.data.map((item) => {
                    return item._id === action.playload._id ? action.playload : item
                }), news: action.playload
            };
        case ADD_NEWS_SUCCESS:
            return { ...store, data: [action.playload, ...store.data], };
        default:
            return store;
    }
}
export default NewsReducer;