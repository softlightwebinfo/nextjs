import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from "react";
class MyDocument extends Document {
    render() {
        return (
            <Html prefix="og: http://ogp.me/ns#" lang={"es"}>
            <Head>
                <meta httpEquiv="Cache-Control" content="no-cache"/>
                <meta httpEquiv="Expires" content="Fri, Jan 01 1970 00:00:00 GMT"/>
                <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0"/>
                {/*<link rel="shortcut icon" href={""}/>*/}
                {/*<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://localhost.com/oc-content/themes/bender/favicon/favicon-144.png">*/}
                {/*<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://localhost.com/oc-content/themes/bender/favicon/favicon-144.png">*/}
                {/*<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://localhost.com/oc-content/themes/bender/favicon/favicon-144.png">*/}
                {/*<link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://localhost.com/oc-content/themes/bender/favicon/favicon-144.png">*/}
                <meta name="robots" content="index, follow"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="author" content="Author"/>
                <meta name="keywords" content="keywords"/>
                <meta name="description" content="Description"/>
                {/*<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>*/}
                {/*<script async src="https://www.googletagmanager.com/gtag/js?id="/>*/}
                {/*<script dangerouslySetInnerHTML={{*/}
                    {/*__html: `*/}
                    {/*window.dataLayer = window.dataLayer || [];*/}
                    {/*function gtag(){dataLayer.push(arguments);}*/}
                    {/*gtag('js', new Date());*/}

                    {/*gtag('config', '');*/}
                {/*`*/}
                {/*}}/>*/}
                <meta name="theme-color" content="#ff6600"/>
                {/*<link rel="apple-touch-icon" href={""}/>*/}
                {/*<meta name="apple-mobile-web-app-title" content={"}/>*/}
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="mobile-web-app-capable" content="yes"/>
            </Head>
            <body className="custom_class softAdminDashboard-body">
            <Main/>
            <NextScript/>
            </body>
            </Html>
        );
    }
}

export default MyDocument;
