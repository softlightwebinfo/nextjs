// const express = require('express');
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import next from "next";
import compression from "compression";
import morgan from "morgan";
import connectMongo from "connect-mongo";
import session from "express-session";
import nextI18next from "./i18n";
import nextI18NextMiddleware from "next-i18next/middleware";
import api from "./routes";
import routes from "./routesI18n";

require('custom-env').env(process.env.NODE_ENV);

const expressApp = express();
const server = require('http').createServer(expressApp);
const io = require('socket.io')(server);
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const defaultRequestHandler = app.getRequestHandler();

const LOCAL_DB = "theseed";
const MONGODB_URI =
    process.env.MONGODB_URI || `mongodb://localhost/${LOCAL_DB}`;
// const SESSION_KEY = "connect.sid";
const SESSION_SECRET = "jfoiesofj@#JIFSIOfsjieo@320923";
const SESSION_DOMAIN = undefined;
const PORT = process.env.NODE_ENV === "development" ? 3001 : 3001;
const proxyMiddleware = require('http-proxy-middleware');
const shrinkRay = require('shrink-ray-current');
var proxy = require('express-http-proxy');
// socket.io server
let sockets: any = [];
io.on('connection', (socket: any) => {
    console.log('User connect');
    sockets = [...sockets, socket]
});
const graphqlServer = process.env.GRAPHQL_SERVER;
var apiproxy = proxyMiddleware('/graphql', {pathRewrite: {'^/graphql': 'graphql'}, target: graphqlServer});
var wsproxy = proxyMiddleware('/graphql', {ws: true, target: graphqlServer});
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    // Parse application/x-www-form-urlencoded
    expressApp.use(bodyParser.urlencoded({extended: false}));
    // Parse application/json
    expressApp.use(bodyParser.json());

    // Theseed Custom
    expressApp.use(compression());
    expressApp.use(apiproxy); // the order here is important
    expressApp.use(wsproxy);
    expressApp.use(morgan("dev"));
    expressApp.get('/logout', (req, res) => {
        res.clearCookie("token");
        res.clearCookie("id");
        res.redirect("/");
        res.end();
    });
    expressApp.use('/images/:image', proxy(process.env.API_IMAGE_SERVER, {
        proxyReqPathResolver: function (req: any) {
            return process.env.API_IMAGE_SERVER + req.params.image
        }
    }));
    expressApp.use('/videos/:directory/:video', proxy(process.env.API_VIDEO_SERVER, {
        proxyReqPathResolver: function (req: any) {
            console.log(process.env.API_VIDEO_SERVER + req.params.directory + '/' + req.params.video);
            return process.env.API_VIDEO_SERVER + req.params.directory + '/' + req.params.video
        }
    }));
    expressApp.use('/api/*', proxy(process.env.API_SERVER, {
        proxyReqPathResolver: function (req: any) {
            var s = Object.keys(req.query).map(function (key) {
                return key + '=' + req.query[key];
            }).join('&');
            s = s.length ? `?${s}` : '';
            return process.env.API_SERVER + req.params['0'] + s
        }
    }));
    expressApp.use(nextI18NextMiddleware(nextI18next));
    expressApp.use(handler);
    // server.use(shrinkRay());
    // MongoDB
    // mongoose.set('debug', true);
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));

    // Session
    const MongoStore = connectMongo(session);
    expressApp.use(
        session({
            // key: SESSION_KEY,
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 365 * (24 * 60 * 60 * 1000),
                domain: dev ? undefined : SESSION_DOMAIN
            },
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                ttl: 365 * (24 * 60 * 60 * 1000)
            })
        })
    );

    // API routes
    expressApp.use("/api", api);

    // Next.js request handling
    const customRequestHandler = (
        page: any,
        req: express.Request,
        res: express.Response
    ) => {
        // Both query and params will be available in getInitialProps({query})
        const mergedQuery = Object.assign({}, req.query, req.params);
        app.render(req, res, page, mergedQuery);
    };

    // Routes
    // server.get('/', customRequestHandler.bind(undefined, '/'));
    expressApp.get("/about/:id", customRequestHandler.bind(undefined, "/about"));
    expressApp.get("*", (req: express.Request, res: express.Response) => {
        defaultRequestHandler(req, res);
    });

    expressApp.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            console.error(err.stack);
            return res.status(500).json({code: 0});
        }
    );

    server.listen(PORT, () => {
        console.log(
            `App running on http://localhost:${PORT}/\nAPI running on http://localhost:${PORT}/api/`
        );
    });
});
