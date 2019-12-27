import {actionTypes} from "../actionTypes/user";
import {Cookies} from "@src/libs/Cookies";

let initialState: any = {
    user: {},
    token: null,
    error: false,
    isLoggedIn: false,
};

if (typeof localStorage !== "undefined") {
    const authCookie = Cookies.getCookie('auth');
    if (authCookie) {
        initialState = JSON.parse(decodeURIComponent(authCookie));
    } else {
        initialState = {
            isLoggedIn: false,
            user: {},
            error: false,
            token: null,
        }
    }
} else {
    initialState = {
        isLoggedIn: false,
        user: {},
        error: false,
        token: null,
    };
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.DEAUTHENTICATE:
            Cookies.removeCookie("auth");
            return {
                isLoggedIn: false
            };
        case actionTypes.AUTHENTICATE:
            const authObj = {
                isLoggedIn: true,
                user: action.payload
            };
            Cookies.setCookie("auth", authObj);
            return authObj;
        case actionTypes.RESTORE_AUTH_STATE:
            return {
                isLoggedIn: true,
                user: action.payload.user
            };
        case actionTypes.USER_LOAD_DATA_SUCCESS:
            return {
                ...state,
                user: action.user,
                token: action.token
            };
        case actionTypes.USER_LOAD_DATA_ERROR:
            return {
                ...state,
                ...{error: action.error}
            };
        case actionTypes.USER_SET_LOGIN: {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
                isLoggedIn: !!action.data.user,
            }
        }
        case actionTypes.USER_SET_LOGOUT: {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
                isLoggedIn: false,
            }
        }
        case actionTypes.USER_UPDATE_LOAD_DATA_SUCCESS: {
            return {
                ...state,
                user: action.data
            }
        }
        case actionTypes.USER_SET_PERMISSIONS_ERROR: {
            return {
                ...state,
                permissionsError: action.data,
            }
        }
        case actionTypes.USER_SET_PERMISSIONS: {
            return {
                ...state,
                permissions: action.data,
            }
        }
        case actionTypes.USER_ERROR_LOGIN: {
            return {
                ...state,
                isLoggedIn: false,
            }
        }
        default:
            return state
    }
}

export default reducer
