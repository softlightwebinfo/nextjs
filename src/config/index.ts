import getConfig from "next/config";

const env: string = process.env.ENV || 'development';
const {publicRuntimeConfig} = getConfig();
export const config = publicRuntimeConfig;
export const AppName = "VideoMusic";
export const Web = "https://www.yourdomain.com";
export const apiImages = "";
export const apiServer = process.env;
export const Company = {
    appName: AppName,
    address: "34 Street Name, City Name Here, United States",
    phone: "+34 123 456 789",
    email: "info@yourdomain.com",
};

export const apiRoutes = {
    allCategories: "api/retrieve_categories",
    createAccount: "api/users/insert_user",
    signIn: "api/users/user",
    createPublication: "api/publications/insert_publications",
    publications: "api/publications/retrieve_publications",
};
export const routes = {
    index: {route: '/', page: '/'},
    login: {route: '/login', page: '/login'},
    watch: {route: '/watch/:category/:subcategory/:slug', page: '/watch'},
    trends: {route: '/trending', page: '/trending'},
    subscriptions: {route: '/subscriptions', page: '/subscriptions'},
};
export const getApiRoute = (url: string) => {
    return `${publicRuntimeConfig.WEB}${url}`
};
