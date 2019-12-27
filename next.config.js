// next.config.js
const {withPlugins, optional} = require('next-compose-plugins');
const images = require('next-images');
const sass = require('@zeit/next-sass');
// const typescript = require('@zeit/next-typescript');
const optimizedImages = require('next-optimized-images');
const withProgressBar = require('next-progressbar');
const withSize = require('next-size');
const withReactSvg = require('next-react-svg');
const withCSS = require('@zeit/next-css');
const path = require('path');
const {
    PHASE_PRODUCTION_BUILD,
    PHASE_PRODUCTION_SERVER,
    PHASE_DEVELOPMENT_SERVER,
    PHASE_EXPORT,
} = require('next-server/constants');
// next.js configuration
const nextConfig = {
    // useFileSystemPublicRoutes: false,
    // target: 'serverless',
    distDir: 'build',
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2
    },
    pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
    env: {
        customKey: 'value'
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        //import getConfig from 'next/config';
        staticFolder: '/static',
        WEB: process.env.WEB,
        ENV: process.env.APP_ENV,
    },
    // exportPathMap: function () {
    //     return {
    //         '/': {page: '/'},
    //         '/login': {page: '/login'},
    //         '/watch/:slug': {page: '/watch'},
    //         '/watch/:category/:subcategory/:slug': {page: '/watch'},
    //         '/trending': {page: '/trending'},
    //         '/subscriptions': {page: '/subscriptions'},
    //     }
    // },
};

module.exports = withPlugins([
    
    // add a plugin with specific configuration
    [sass, {}],
    [withCSS, {}],
    // add a plugin without a configuration
    images,
    // another plugin with a configuration (applied in all phases except development server)
    // [typescript],
    // [withProgressBar, {
    //     progressBar: {
    //         profile: true
    //     }
    // }],
    [withSize],
    [withReactSvg, {
        include: path.resolve(__dirname, 'src/assets/svg'),
    }],
    [optimizedImages, {
        // these are the default values so you don't have to provide them if they are good enough for your use-case.
        // but you can overwrite them here with any valid value you want.
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
        optimizeImages: false,
        optimizeImagesInDev: false,
        mozjpeg: {
            quality: 80,
        },
        optipng: {
            optimizationLevel: 3,
        },
        pngquant: false,
        gifsicle: {
            interlaced: true,
            optimizationLevel: 3,
        },
        svgo: {
            // enable/disable svgo plugins here
        },
        webp: {
            preset: 'default',
            quality: 75,
        },
    }],
], nextConfig);
