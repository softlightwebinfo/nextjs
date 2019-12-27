import React from 'react';
import {Provider} from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import reduxStore from './../src/store/reduxStore';
import {appWithTranslation} from '@server/i18n';
import withApollo from "../src/libs/withApollo";
import {ApolloProvider} from "react-apollo";
import {SoftContext} from "@softlightweb/softlightweb-components";
import NextNProgress from "@containers/NextNProgress";
import Cookie from 'js-cookie'
import io from 'socket.io-client'
import "@softlightweb/softlightweb-components/dist/theme_light.css";
import '../src/styles/index.scss';
import cookies from "next-cookies";
import {loadUserVerifySaga} from "@store/sagas/user";

// @ts-ignore
@withRedux(reduxStore)
// @ts-ignore
@withApollo
@appWithTranslation
export default class MyApp extends App<{ store: any; apollo: any; }> {
    static async getInitialProps({Component, ctx}) {
        // ctx.store.dispatch(authenticateAction({name: "pepe"}));
        let pageProps = {};
        const {token}: any = cookies(ctx);
        if (!ctx.store.getState().user.token) {
            await ctx.store.dispatch(loadUserVerifySaga(token, ctx));
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ctx})
        }
        return {
            pageProps,
            namespacesRequired: ['common'],
        };
    }

    state = {
        socket: null,
        night: false,
    };

    componentDidMount() {
        const socket = io();
        const theme = Cookie.get('theme');
        const night = (theme === 'night');
        this.listenForNightModeCommands();
        this.setState({socket, night});
    }

    listenForNightModeCommands() {

        // https://keycode.info/
        document.addEventListener("keydown", event => {

            // The keyCode for "n" is 78
            if (event.ctrlKey && event.keyCode == 78) {
                this.setState({night: !this.state.night});

                // Your choice of naming convention goes here
                Cookie.set('theme', this.state.night ? 'night' : 'day', {expires: 365});

                // Uncomment after function is implemented
                // this.toggleNightMode()
                event.preventDefault();
            }

        })
    }

    // close socket connection
    componentWillUnmount() {
        if (this.state.socket) {
            // @ts-ignore
            this.state.socket.close()
        }
    }

    get mappings() {
        return {
            es: {
                "SoftAuthSignIn2.title": "Inicia sesión en tu cuenta",
                "SoftAuthSignIn2.emailPlaceholder": "Correo electronico",
                "SoftAuthSignIn2.passwordPlaceholder": "Contraseña",
                "SoftAuthSignIn2.login": "Inicia sesión",
                "SoftAuthSignIn2.noAccount": "No tienes una cuenta?",
                "SoftAuthSignIn2.createAccount": "Crear una cuenta",
                "SoftAuthSignIn2.recovery": "Recupera la contraseña",
                "softForm.addressFormErrors": "Por favor, resuelva los errores en su formulario."
            },
        };
    }

    render() {
        const {Component, pageProps, store, apollo} = this.props;
        const i18n = {
            mapping: this.mappings["es"],
        };
        return (
            <Provider store={store}>
                <ApolloProvider client={apollo}>
                    <SoftContext i18n={i18n}>
                        <NextNProgress/>
                        <Component {...pageProps} />
                    </SoftContext>
                </ApolloProvider>
            </Provider>
        );
    }
}
