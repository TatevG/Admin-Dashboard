export const GET_ROOT_TYPES_SUCCESS = 'GET_ROOT_TYPES_SUCCESS';
export const GET_TYPES_SUCCESS = 'GET_TYPES_SUCCESS';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const DELETE_TYPE_SUCCESS = 'DELETE_TYPE_SUCCESS';
export const ACTION_ERROR_SHOP = 'ACTION_ERROR_SHOP';
export const FRANCHISER_SUCCESS = 'FRANCHISE_SUCCESS';
export const OWNER_SUCCESS = 'OWNER_SUCCESS';
export const MANAGER_SUCCESS = 'MANAGER_SUCCESS';
export const CREATE_SHOP_SUCCESS = 'CREATE_SHOP_SUCCESS';
export const GET_SHOP_SUCCESS = 'GET_SHOP_SUCCESS';
export const GET_SHOPS_SUCCESS = 'GET_SHOPS_SUCCESS';
export const GET_SHOP_LOADING = 'GET_SHOP_LOADING';
export const GET_SHOPS_LOADING = 'GET_SHOPS_LOADING';
export const DELETE_SHOP_SUCCESS = 'DELETE_SHOP_SUCCESS';
export const ADD_FRANCHISER_SUCCESS = 'ADD_FRANCHISER_SUCCESS';
export const REMOVE_FRANCHISER_SUCCESS = 'REMOVE_FRANCHISER_SUCCESS';
export const CHANGE_OWNER_SUCCESS = 'CHANGE_OWNER_SUCCESS';
export const ADD_MANAGER_SUCCESS = 'ADD_MANAGER_SUCCESS';
export const CREATE_SHOP_LOADING = 'CREATE_SHOP_LOADING';
export const ADD_TYPE_TO_SHOP_SUCCESS = 'ADD_TYPE_TO_SHOP_SUCCESS';
export const REMOVE_TYPE_FROM_SHOP_SUCCESS = 'REMOVE_TYPE_FROM_SHOP_SUCCESS';
export const UPDATE_SHOP_DETAILS_SUCCESS = 'UPDATE_SHOP_DETAILS_SUCCESS';
export const UPDATE_SHOP_LOADING = 'UPDATE_SHOP_LOADING';
export const ADD_USER_TO_SHOP_SUCCESS = 'ADD_USER_TO_SHOP_SUCCESS';
export const DELETE_USER_FROM_SHOP_SUCCESS = 'DELETE_USER_FROM_SHOP_SUCCESS';
export const ADD_SHOP_USER_PERMISSION_SUCCESS = 'ADD_SHOP_USER_PERMISSION_SUCCESS';
export const DELETE_SHOP_USER_PERMISSION_SUCCESS = 'DELETE_SHOP_USER_PERMISSION_SUCCESS';
export const UPDATE_SHOP_TYPE_DETAILS_SUCCESS = 'UPDATE_SHOP_TYPE_DETAILS_SUCCESS';
export const GET_PROVIDERS_SUCCESS = 'GET_PROVIDERS_SUCCESS';

const initStore = {
    rootTypes: [],
    types: [],
    owners: [],
    franchisers: [],
    managers: [],
    error: '',
    shops: [],
    providers: [],
    shopsLoading: false,
    shop: {},
    shopLoading: false,
    createShopLoading: false,
    updateShopLoading: false,
    count: 0,
}
const ShopReducer = (store = initStore, action) => {
    switch (action.type) {
        case GET_ROOT_TYPES_SUCCESS:
            return { ...store, rootTypes: action.playload };
        case GET_TYPES_SUCCESS:
            return { ...store, types: action.playload };
        case ADD_SUCCESS:
            return { ...store, types: [...store.types, action.playload] };
        case UPDATE_SUCCESS:
            return {
                ...store, types: store.types.map((type) => {
                    return type._id === action.playload._id ? action.playload : type
                })
            };
        case DELETE_TYPE_SUCCESS:
            store.types.splice(store.types.findIndex((type) => type._id === action.playload._id), 1);
            return { ...store, types: [...store.types] };
        case FRANCHISER_SUCCESS:
            return { ...store, franchisers: action.playload };
        case OWNER_SUCCESS:
            return { ...store, owners: action.playload };
        case MANAGER_SUCCESS:
            return { ...store, managers: action.playload };
        case ACTION_ERROR_SHOP:
            return { ...store, error: action.playload };
        case CREATE_SHOP_SUCCESS:
            return { ...store, shops: [...store.shops, action.playload] };
        case ADD_MANAGER_SUCCESS:
            return { ...store, shop: { ...store.shop, shopManager: action.playload } };
        case GET_SHOPS_SUCCESS:
            return { ...store, shops: [...action.playload] };
        // return { ...store, shops: action.playload.shops, count: action.playload.count };
        case GET_SHOP_SUCCESS:
            return { ...store, shop: action.playload };
        case GET_SHOP_LOADING:
            return { ...store, shopLoading: action.playload };
        case GET_SHOPS_LOADING:
            return { ...store, shopsLoading: action.playload };
        case DELETE_SHOP_SUCCESS:
            store.shops.splice(store.shops.findIndex((shop) => shop._id === action.playload._id), 1);
            return { ...store, shops: [...store.shops] };
        case REMOVE_FRANCHISER_SUCCESS:
            store.shop.franchiser.splice(store.shop.franchiser.findIndex((franchiser) => franchiser._id === action.playload._id), 1);
            return { ...store, shop: { ...store.shop } };
        case ADD_FRANCHISER_SUCCESS:
            return { ...store, shop: { ...store.shop, franchiser: [...store.shop.franchiser, action.playload] } };
        case CHANGE_OWNER_SUCCESS:
            return { ...store, shop: { ...store.shop, owner: action.playload } }
        case CREATE_SHOP_LOADING:
            return { ...store, createShopLoading: action.playload };
        case REMOVE_TYPE_FROM_SHOP_SUCCESS:
            store.shop.type.splice(store.shop.type.findIndex((item) => item._id === action.playload._id), 1);
            return { ...store, shop: { ...store.shop } };
        case ADD_TYPE_TO_SHOP_SUCCESS:
            return { ...store, shop: { ...store.shop, type: [...store.shop.type, action.playload] } };
        case UPDATE_SHOP_LOADING:
            return { ...store, updateShopLoading: action.playload };
        case UPDATE_SHOP_DETAILS_SUCCESS:
            return {
                ...store, shop: {
                    ...store.shop,
                    name: action.playload.name,
                    location: action.playload.location,
                    address: action.playload.address,
                    bonus: action.playload.bonus,
                    comission: action.playload.comission,
                    price: action.playload.price,
                    cumulative: action.playload.cumulative,
                    spendable: action.playload.spendable,
                }
            };
        case ADD_USER_TO_SHOP_SUCCESS:
            return { ...store, shop: { ...store.shop, shopUser: [...store.shop.shopUser, action.playload] } };
        case DELETE_USER_FROM_SHOP_SUCCESS:
            store.shop.shopUser.splice(store.shop.shopUser.findIndex((item) => item._id === action.playload._id), 1);
            return { ...store, shop: { ...store.shop } };
        case UPDATE_SHOP_TYPE_DETAILS_SUCCESS:
            (store.shop.type.find(item => item.type_id._id === action.playload.shopTypeId)).comission = action.playload.comission;
            (store.shop.type.find(item => item.type_id._id === action.playload.shopTypeId)).bonus = action.playload.bonus;
            (store.shop.type.find(item => item.type_id._id === action.playload.shopTypeId)).price = action.playload.price;
            return { ...store, shop: { ...store.shop } };
        case DELETE_SHOP_USER_PERMISSION_SUCCESS:
            const ShopUserTypePermission = (store.shop.shopUser.find(userItem => userItem._id === action.playload.userId)).shopTypePermission;
            ShopUserTypePermission.splice(ShopUserTypePermission.findIndex((item) => item === action.playload._id), 1);
            return { ...store, shop: { ...store.shop } };
        case ADD_SHOP_USER_PERMISSION_SUCCESS:
            (store.shop.shopUser.find(userItem => userItem._id === action.playload.userId)).shopTypePermission.push(action.playload._id);
            return { ...store, shop: { ...store.shop } };
        case GET_PROVIDERS_SUCCESS:
            return { ...store, providers: action.playload };
        default:
            return store;
    }
}
export default ShopReducer;