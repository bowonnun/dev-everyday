import React , { Component } from 'react'
import Head from 'next/head'
class Landing extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return (
            <>
            <Head>
                <title>Karmakamet | Aromatic and Scents</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="/static/css/normalize.css" rel="stylesheet" type="text/css" crossorigin="anonymous" />
                <link href="/static/css/bootstrap.css" rel="stylesheet" type="text/css" crossorigin="anonymous" />
                <link href="/static/css/font-awesome.css" rel="stylesheet" type="text/css" crossorigin="anonymous" />
                <link href="/static/css/animations.css" rel="stylesheet" type="text/css" crossorigin="anonymous" />
                <link href="/static/css/owl.carousel.min.css" rel="stylesheet" crossorigin="anonymous"/>
                <link rel="stylesheet" href="/static/css/bootstrap-datepicker.css" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
                </Head>
                <div style={{display: 'flex', height: '100vh',justifyContent: 'center', alignItems: 'center'}}>
                    <img src="/static/images/loading01_30sec.gif"></img>
                </div>
            </>
        )
    }
}
export default Landing