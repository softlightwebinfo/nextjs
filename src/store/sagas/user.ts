import fetch from 'isomorphic-unfetch'
import {FetchInit} from "@src/libraries/FetchInit";
import {parseCookies, setCookie, destroyCookie} from 'nookies';
import {setLogin, setLogout, userLoginError} from "@store/actions/user";
import {getApiRoute} from "@src/config";


export function loadUserVerifySaga(token, ctx) {
    return async (dispatch, store) => {
        const state = store();
        let tokenString = token ? token : state.user.token;
        try {
            const res = await fetch(getApiRoute(`/api/v1/auth/user`), FetchInit({}, "GET", tokenString));
            const data = await res.json();
            if (data.error) {
                parseCookies(ctx);
                destroyCookie(ctx, 'token');
                dispatch(userLoginError(data));
                dispatch(setLogin(null, null))
            } else {
                dispatch(setLogin(data.token, data.user))
            }
        } catch (e) {
            console.log("error", e);
            dispatch(userLoginError(e));
            dispatch(setLogin(null, null));
        }
    };
}

// export const loadUserVerify = takeLatest(actionTypes.USER_LOAD_VERIFY, loadUserVerifySaga)
//
// function* loadUserLogoutSaga() {
//     yield put(setLogout());
//     Cookie.remove('token', {path: ''});
// }
//
// export const loadUserLogout = takeLatest(actionTypes.USER_LOAD_LOGOUT, loadUserLogoutSaga);
