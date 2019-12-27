import {actionTypes} from "../actionTypes/user";
import {FetchInit} from "@src/libraries/FetchInit";
import Cookie from 'js-cookie';

export const authenticateAction = (user) => {
    return {
        type: actionTypes.AUTHENTICATE,
        payload: user
    };
};


export const deAuthenticateAction = () => {
    return {
        type: actionTypes.DEAUTHENTICATE,
    };
};


export const restoreState = (authState) => {
    return {
        type: actionTypes.RESTORE_AUTH_STATE,
        payload: authState
    }
};


export const login = loginDetails => {
    return async dispatch => {
        try {
            dispatch(deAuthenticateAction());
            // login code. And storing data in result variable
            dispatch(authenticateAction({}));


        } catch (e) {
            dispatch(deAuthenticateAction());
        }
    };
};


export const signUp = signUpDetails => {
    return async dispatch => {
        try {
            dispatch(deAuthenticateAction());
            // Signup code. And storing data in result variable
            dispatch(authenticateAction({}));


        } catch (e) {
            dispatch(deAuthenticateAction());
        }
    };
};


export const logout = () => {
    return async dispatch => {
        dispatch(deAuthenticateAction())
    }
};


export const restore = (savedState) => {
    return dispatch => {
        dispatch(restoreState(savedState));
    };
};

export function startUserVerify(token: string, ctx = null) {
    return {
        type: actionTypes.USER_LOAD_VERIFY,
        token,
        ctx,
    }
}

export function loadData() {
    return {type: actionTypes.USER_LOAD_DATA}
}

export function loadDataSuccess(data) {
    return {
        type: actionTypes.USER_LOAD_DATA_SUCCESS,
        data
    }
}

export function loadDataError(error) {
    return {
        type: actionTypes.USER_LOAD_DATA_SUCCESS,
        error
    }
}

export function setLogin(token, user) {
    return {
        type: actionTypes.USER_SET_LOGIN,
        data: {
            token,
            user
        }
    }
}

export function setLogout() {
    Cookie.remove('token');
    Cookie.remove('id');
    return {
        type: actionTypes.USER_SET_LOGOUT,
        data: {
            token: null,
            user: null
        }
    }
}

export function userLogin(data) {
    return (dispatch, getState) => {
        dispatch(setLogin(data.token, data.user));
        if (!getState().clock.isServer) {
            Cookie.set('token', data.token, {expires: 7});
            Cookie.set('id', data.user.id, {expires: 7});
        }
    }
}

export function userLoginError(data) {
    return {
        type: actionTypes.USER_ERROR_LOGIN,
        data: data
    }
}


export function userLogout() {
    return {
        type: actionTypes.USER_LOAD_LOGOUT,
    }
}

export function userVerify(token: string) {
    return async (dispatch, getState) => {
        let tokenString = token ? token : getState().user.token;
        try {
            const res = await fetch(`/api/v1/auth/verify`, FetchInit({}, "GET", tokenString));
            const data = await res.json();
            if (data.error) {
                dispatch(userLoginError(data))
            } else {
                dispatch(userLogin(data));
            }
        } catch (e) {
            console.log("error", e);
            dispatch(userLoginError(e))
        }
    }
}

export function userRegisterLoadData(user) {
    return {
        type: actionTypes.USER_UPDATE_LOAD_DATA,
        data: user,
    }
}

export function userSetUpdateError(err) {
    return {
        type: actionTypes.USER_UPDATE_LOAD_DATA_ERROR,
        data: err
    }
}

export function userSetUpdateSuccess(user) {
    return {
        type: actionTypes.USER_UPDATE_LOAD_DATA_SUCCESS,
        data: user
    }
}

export function loadPermissions(token: string) {
    return {
        type: actionTypes.USER_LOAD_PERMISSIONS,
        token
    }
}

export function userSetPermissions(data) {
    return {
        type: actionTypes.USER_SET_PERMISSIONS,
        data,
    }
}

export function userSetPermissionsError(data) {
    return {
        type: actionTypes.USER_SET_PERMISSIONS_ERROR,
        data,
    }
}

