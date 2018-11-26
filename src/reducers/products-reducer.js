export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const ACTION_ERROR_PRODUCTS = 'ACTION_ERROR_PRODUCTS';


const initStore = {
    loading: false,
    data: [],
    count: 0,
    error: "",
}
const ProductReduser = (store = initStore, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return { ...store, data: action.playload.data, count: action.playload.count };
        case ACTION_ERROR_PRODUCTS:
            return { ...store, error: action.playload };
        case PRODUCTS_LOADING:
            return { ...store, loading: action.playload };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...store, data: store.data.map((item) => {
                    return item._id === action.playload._id ? action.playload : item
                })
            };
        case ADD_PRODUCT_SUCCESS:
            return { ...store, data: [...store.data, action.playload], count: ++store.count };
        case DELETE_PRODUCT_SUCCESS:
            store.data.splice(store.data.findIndex((product) => product._id === action.playload._id), 1);
            return { ...store, data: [...store.data], count: --store.count };
        default:
            return store;
    }
}
export default ProductReduser;