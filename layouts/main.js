import React, { Component } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Footer_Ecom from "../components/footer_Ecom";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Router from 'next/router';
import { AppProvide } from '../components/Context/AppContext'
import MessengerCustomerChat from 'react-messenger-customer-chat';
class Page extends Component {
  constructor(props) {
    super(props);
  }
  state = { isLoading: false }
  Spinner = () => {
    const { posts } = this.state
    const content = <div className="loading-pages">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#000"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(275.845 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>;
    return content
  }
  componentDidMount() {
    // Logging to prove _app.js only mounts once,
    // but initializing router events here will also accomplishes
    // goal of setting state on route change

    Router.events.on('routeChangeStart', () => {
      this.setState({ isLoading: true });
      var body = document.body;
      body.classList.add("lockPage");
      
    });
    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false });
      var body = document.body;
      body.classList.remove("lockPage");
    });

    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { isLoading } = this.state;
    return (
      <AppProvide>
        <NextSeo
          title={this.props.title + " | Aromatic and Scents"}
          description={this.props.description}
          canonical={this.props.url}
          openGraph={{
            url: this.props.url,
            title: this.props.title,
            description: this.props.description,
            images: [{ url: this.props.images }],
            site_name: "Karmakamet",
          }}
        />
        <Head>
          <link rel="icon" href="/static/favicon.png" />
          <link
            href="/static/css/bootstrap.css"
            rel="stylesheet"
            type="text/css"
            crossOrigin="anonymous"
            integrity=""
          />
          <link
            href="/static/css/font-awesome.css"
            rel="stylesheet"
            type="text/css"
            crossOrigin="anonymous"
            integrity=""
          />
          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"

          />
          <link
            href="/static/css/animations.css"
            rel="stylesheet"
            type="text/css"
            crossOrigin="anonymous"
            integrity=""
          />
          <link
            href="/static/css/owl.carousel.min.css"
            rel="stylesheet"
            crossOrigin="anonymous"
            integrity=""
          />
          <script
            src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
            integrity="sha384-J6qa4849blE2poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZn"
            crossOrigin="anonymous"
            integrity=""
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            integrity="sha384-Q6E9RHvbIyZFJoft2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            crossOrigin="anonymous"
            integrity=""
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
            integrity=""
          ></script>
          <script src="/static/js/mixitup.min.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110967068-1"></script>
          <script
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-110967068-1');
                  `,
              }}
            />
            {/* <!-- Hotjar Tracking Code for https://karmakamet.co.th/ --> */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:1952974,hjsv:6};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                  `,
              }}
            />
        </Head>
        <Header />
        <main id="containerContent">
          <div className='Overlay'></div>
        {isLoading ? this.Spinner() : ''}
          <motion.div className={(isLoading ? 'loadingBlur' : '')} initial="initial" animate="animate" exit={{ opacity: 0 }}>
            {this.props.children}
          </motion.div>
        </main>
        <MessengerCustomerChat pageId="103602953016419" appId="297951178285918" />
        <Footer_Ecom/>
      </AppProvide>
    );
  }
}
export default Page;
