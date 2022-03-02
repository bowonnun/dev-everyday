import React, { Component } from "react";
import Page from '../../../layouts/main'
import Router, { withRouter } from 'next/router'
import { withTranslation } from '../../../i18n'
import Address from '../../../components/Cart/address'
import Conpon from '../../../components/Cart/conpon'
import Base64 from '../../../components/Base64'
import Checkout from '../../../components/Cart/checkout'
import Confirm from '../../../components/Cart/confirm'
import Thankyou from '../../../components/Cart/thankyou'
import Cartitem from '../../../components/Cart/cartitem'
import Informaton from '../../../components/Cart/information'
import Rightbar from '../../../components/Cart/rightbar'
import { AppContext } from '../../../components/Context/AppContext'
import { getWoocomData } from "../../../services/WooService";
import client from '../../../components/Apollo/apolloClient'
import Link from 'next/link'
import gql from 'graphql-tag'
class Succ extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            sectionActive: 'thankyou',
            textarea_note: '',
            textarea_note_length: '',
            selectAll: false,
            isLoading: true,
            productInCartManageStock: null
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
    
    callsection = (e) => {
        var namesec = e.currentTarget.dataset.target
        this.setState({
            sectionActive: namesec
        })
    }
    componentDidMount = async (e) => {
        localStorage.removeItem('woo-next-cart')
        let encode = localStorage.getItem('woo-next-carts');
        let existingCart = Base64.atob(encode);
        existingCart = JSON.parse(existingCart);
        const products = (null !== existingCart && Object.keys(existingCart).length) ? existingCart.products : ''
        const existingCarts = (null !== existingCart && Object.keys(existingCart).length) ? existingCart : ''
        if(existingCarts.orderNumber != null){
            const Order_QUERY = gql`query {
                order(orderId: ${existingCarts.orderNumber}) {
                    date
                    orderId
                    currency
                    customerNote
                    datePaid
                    paymentMethod
                    billing {
                      address1
                      address2
                      city
                      country
                      email
                      firstName
                      lastName
                      phone
                      postcode
                      state
                    }
                    couponLines {
                      nodes {
                        discount
                        orderId
                      }
                    }
                    lineItems {
                      nodes {
                        variation {
                          name
                          sku
                          price
                        }
                        quantity
                        subtotal
                        total
                      }
                    }
                    subtotal
                    total
                  }
            }`;
            const itemdw = await client.query({ query: Order_QUERY, fetchPolicy: 'no-cache', });
            let orderPutERP = itemdw.data.order
            
            orderPutERP.billing = {...orderPutERP.billing,address1:orderPutERP.billing.address1+" "+orderPutERP.billing.address2+" "+orderPutERP.billing.city+" "+orderPutERP.billing.state +" "+orderPutERP.billing.postcode}
            delete orderPutERP.billing['address2'];
            delete orderPutERP.billing['city'];
            delete orderPutERP.billing['state'];
            if(orderPutERP.couponLines != undefined){
                orderPutERP.couponLines = {...orderPutERP.couponLines.nodes}
            }
            
            orderPutERP.lineItems = {...orderPutERP.lineItems.nodes}
            this.setState({ isLoading: false,product:existingCarts,orderNumber:existingCarts.orderNumber })
        }
    }
    handleInputChange = e => {
        const { name, value } = e.target
        if (name == "textarea_note" && value.length <= 1000) {
            this.setState({
                textarea_note_length: value.length,
                textarea_note: value
            })
        }
        if (name != "textarea_note") {
            this.setState({
                [name]: value.length
            })
        }

    }
    titlepage = () => {
        if (this.state.sectionActive == 'thankyou') {
            return <h1>THANK YOU FOR ORDERS</h1>
        } else {
            return <h1>CART {this.state.sectionActive != '' ? <span> {this.state.sectionActive}</span> : ''}</h1>
        }
    }
    bindsection = () => {
        const { isLoading } = this.state;
        if (this.state.sectionActive == 'coupon') {
            return (
                <Conpon callsection={this.callsection} />
            )
        } else if (this.state.sectionActive == 'address') {
            return (
                <Address  callsection={this.callsection}   />
            )
        } else if (this.state.sectionActive == 'checkout') {
            return (
                <Checkout />
            )
        } else if (this.state.sectionActive == 'confirm') {
            return (
                <Confirm />
            )
        } else if (this.state.sectionActive == 'thankyou') {
            return (
                <Thankyou orderNumber={this.state.orderNumber} />
            )
        }
    }
    render() {
        var sectionName = this.state.sectionActive
        let address = []
        return (
            <Page title="Karmakamet Online" description="" images="/static/images/lazada.jpg" keywords="">
                <div className="cart-page pdtop-site" >
                    <div className="margin-container" >
                        <div className="title-page">
                            {this.state.sectionActive != 'thankyou' ?
                                <button className="btn_back  pl-0"
                                    data-target=""
                                    onClick={this.callsection}>
                                    <i className="icon-arrow-left"></i> BACK
                                </button>
                                :
                                <Link href='/onlinestores'>
                                    <a href='' className="toShopping pl-0">
                                        BACK TO SHOPPING<i className="icon-arrow-right3"></i>
                                    </a>
                                </Link>

                            }

                            {this.titlepage()}

                        </div>
                        <div className="cart-wrapper-content">
                            {this.bindsection()}
                            <div className="cart-col_R">
                                <section className="sec-checkoutBox">
                                    {this.state.sectionActive == 'thankyou' ?
                                        <div className='OrderNum'>
                                            <p>Order No. {this.state.orderNumber}</p>
                                        </div>
                                        : ''
                                    }
                                    <div className="shipping-wrapper">
                                        <p className="subject">Shipping</p>
                                        <Informaton callsection={this.callsection}  sectionActive={this.state.sectionActive} />
                                    </div>
                                    
                                    {/* <div className="discount_wrapper">
                                        <p className="subject">Discount</p>
                                        <div className="discount_detail">
                                            <div className='discount_item'>
                                                <p>Discount 10% Coupon on Order Original Room Perfume Diffuser</p>
                                                <p>1,000 THB</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    <Rightbar callsection={this.callsection} sectionActive={this.state.sectionActive} />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </Page >
        )
    }
}
export default withRouter(withTranslation('layout')(Succ));