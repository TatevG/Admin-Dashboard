import { SIGNIN_SUCCESS, SIGNIN_ERROR, LOADING_START, LOADING_END, SIGNOUT_SUCCESS } from '../reducers/auth-reducer';
import { PERMISSIONS } from '../containers/root'
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function SigniInSuccess(data) {
    return {
        type: SIGNIN_SUCCESS,
        playload: data,
    }
}

function SignInError(error) {
    return {
        type: SIGNIN_ERROR,
        playload: error,
    }
}

function Loading(bool) {
    return {
        type: bool ? LOADING_START : LOADING_END,
        playload: null,
    }
}
function SignOutSuccess(data){
    return {
        type: SIGNOUT_SUCCESS,
        playload: data,
    }
}
export function Login(username, password, history) {
    return async (dispatch) => {
        try {
            dispatch(Loading(true));
            const data = await axios.post(`${BASE_URL}/auth/sign-in`, {
                username: username,
                password: password,
            }, {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            if (data.data.data.type === 'USER' || data.data.data.type === 'SHOP_USER') {
                throw new Error('incorect token');
            }
            dispatch(SigniInSuccess(data.data.data));
            window.localStorage.setItem('accessToken', data.data.data.accessToken);
            switch (data.data.data.type) {
                case PERMISSIONS.TECHNICIAN:
                    history.push('/shopsActivity');
                    break;
                case PERMISSIONS.SHOP_OWNER:
                    history.push('/shopsList');
                    break;
                case PERMISSIONS.FRANCHISER:
                    history.push('/shopsList');
                    break;
                case PERMISSIONS.AGENT:
                    history.push('/cards');
                    break;
                case PERMISSIONS.SHOP_MANAGER:
                    history.push('/shopsList');
                    break;
                default:
                    history.push('/users');
                    break;
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(SignInError(error.response.data.errors));
            } else {
                alert(error.message)
                dispatch(SignInError(error.message));
            }
        }
        finally {
            dispatch(Loading(false));
        }
    };
}

export function IsSignIn(token) {
    return async (dispatch) => {
        try {
            dispatch(Loading(true));
            const data = await axios.get(`${BASE_URL}/auth/is-sign-in`, {
                headers: {
                    'Authorization': token,
                }
            });
            dispatch(SigniInSuccess(data.data.data));
        } catch (error) {
            dispatch(SignInError(error.response.data.errors));
        }
        finally {
            dispatch(Loading(false));
        }
    };
}
export function Logout(history) {
    return async (dispatch) => {
        try {
            window.localStorage.clear();
            dispatch(SignOutSuccess({}));
            history.push('/signin');
        } catch (error) {
            alert('somethin wrong');
        }
    };
}