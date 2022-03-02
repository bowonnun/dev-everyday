import React,{ Component } from "react";
import App from 'next/app'
import { appWithTranslation } from '../i18n'
import { AnimatePresence } from "framer-motion"
import "../public/static/sass/main.scss";
import "aos/dist/aos.css"; // You can also use <link> for styles
class MyApp extends App {
    
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        if (!pageProps.namespacesRequired) {
            pageProps.namespacesRequired = []
        }
        return { pageProps }
    }
    
    render() {
        const { Component, pageProps, router } = this.props;
        return (
            <AnimatePresence exitBeforeEnter>
                 <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        );
    }
}

export default appWithTranslation(MyApp)