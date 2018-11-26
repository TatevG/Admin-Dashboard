import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import ShopReducer from './shop-reducer';
import AdministrativeUserReducer from './administrative-users';
import ProductReduser from './products-reducer';
import CardsReducer from './card-reducer';
import UserReducer from './user-reducer';
import NewsReducer from './news-reducer';
import UtilitiesReducer from './utilities-reducer';
import TransactionsReducer from './transactions-reducer';


export default combineReducers({
    user: AuthReducer,
    shop: ShopReducer,
    administrativeUsers: AdministrativeUserReducer,
    products: ProductReduser,
    cards: CardsReducer,
    users: UserReducer,
    news: NewsReducer,
    utilities: UtilitiesReducer,
    transactions: TransactionsReducer,
});
