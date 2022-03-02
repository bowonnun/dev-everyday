import React, { Component } from 'react'
import Head from 'next/head'
import { AppContext } from '../components/Context/AppContext'
import { removeItemFromCart, priceCommas  } from '../services/function'
import Base64 from '../components/Base64'
import Link from 'next/link'
import { getWoocomData } from "../services/WooService";
import client from '../components/Apollo/apolloClient'
import gql from 'graphql-tag'
class IconCart extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }
    Spinner = () => {
        const { posts } = this.state
        const content = <div className="loading-productCart">
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
                    stroke="#fff"
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
    componentDidMount= async ()=>{

    }
    render() {
        return (
            "sss"
        )
    }
}
export default IconCart