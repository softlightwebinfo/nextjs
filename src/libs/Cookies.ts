import cookie from 'js-cookie';

export class Cookies {
    public static setCookie = (key, value) => {
        if (process.browser) {
            cookie.set(key, value, {
                expires: 1,
                path: '/'
            });
        }
    };


    public static removeCookie = (key) => {
        if (process.browser) {
            cookie.remove(key, {
                expires: 1
            });
        }
    };


    public static getCookie = (key, req?) => {
        return process.browser
            ? Cookies.getCookieFromBrowser(key)
            : Cookies.getCookieFromServer(key, req);
    };


    public static getCookieFromBrowser = key => {
        return cookie.get(key);
    };


    public static getCookieFromServer = (key, req) => {
        if (!req.headers.cookie) {
            return undefined;
        }
        const rawCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith(`${key}=`));
        if (!rawCookie) {
            return undefined;
        }
        return rawCookie.split('=')[1];
    };
}
