const rou = require('next-routes-with-locale');
const routes = rou({locale: 'es', defaultLocale: 'es'});
export default routes;
routes
    .add('index', 'es', '/')
    .add('index', 'en', '/');
// .add('about', 'en', '/about')
// .add('blog', 'en', '/blog/:slug')
// .add('user', 'en', '/user/:id', 'profile', {myCustom: 'data'})
// .add({name: 'beta', locale: 'en', pattern: '/v3', page: 'v3'})
// .add('about', 'cs', '/o-projektu')
// .add('blog', 'cs', '/blog/:slug')
// .add('user', 'cs', '/uzivatel/:id', 'profile')
// .add({name: 'beta', locale: 'cs', pattern: '/v3', page: 'v3'})
