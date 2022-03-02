import React, { Component } from 'react'
import { AppContext } from '../Context/AppContext'
import { updateCart, removeItemFromCart, priceCommas } from '../../services/function'
import Router, {withRouter} from 'next/router'
import Base64 from '../Base64'
import Link from 'next/link'
import axios from 'axios'
import Script from 'react-load-script'
import CHECKOUT_MUTATION from '../../Graphql/checkout'
import client from '../../components/Apollo/apolloClient'
import { getWoocomData } from "../../services/WooService";
import gql from 'graphql-tag'
class Rightbar extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            sectionActive: '',
            textarea_note: '',
            textarea_note_length: '',
            selectAll: false,
        }
    }
    callsection = (e) => {
        var namesec = e.currentTarget.dataset.target
        this.setState({
            sectionActive: namesec
        })
    }
    handleLoadScript = () => {

        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: 'pkey_5hbuk23zpu5e8dbc7m9',
            frameLabel: 'Karmakamet Online',
            currency: 'THB',
            country: false,
            submitLabel: 'PAY NOW',
            buttonLabel: 'Pay with Omise'
        });

    }
    creditCardConfigure = async () => {
        await OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            // otherPaymentMethods: ['truemoney', 'alipay', 'internet_banking_bay', 'internet_banking_bbl', 'internet_banking_ktb', 'internet_banking_scb'],
            image: 'https://karmakamet.co.th/static/images/icon-logo/LOGO_circle.png'
        });
        await OmiseCard.configureButton('#checkout-button');
        await OmiseCard.attach();

    }
    CreateOrder = async (cart, address, billing, chargeID) => {
        const lineItemsMutation = []
        localStorage.removeItem('woo-next-carts')
        let encode = localStorage.getItem('woo-next-cart')
        let existingCart = Base64.atob(encode);
        await cart.products.map((items) => {
            lineItemsMutation.push({
                "productId": items.productId,
                "variationId": items.variationId,
                "name": items.name,
                "quantity": items.qty
            })
        })
        const conpon = (null !== cart && Object.keys(cart).length) ? cart.isConpon : (cartThx != null && Object.keys(cartThx).length) ? cartThx.isConpon : ''
        const items = await client.mutate({
            mutation: CHECKOUT_MUTATION, variables: {
                input: {
                    "clientMutationId": "myID",
                    "shipping": {
                        "firstName": address.F_name,
                        "lastName": address.L_name,
                        "address1": address.Street,
                        "address2": address.State,
                        "city": address.Province,
                        "country": "TH",
                        "state": address.Town,
                        "postcode": address.Postcode,
                        "email": address.Email,
                        "phone": address.Phone,
                        "overwrite": true
                    },
                    "billing": {
                        "firstName": billing.BF_name,
                        "lastName": billing.BL_name,
                        "address1": billing.BStreet,
                        "address2": billing.BState,
                        "city": billing.BProvince,
                        "country": "TH",
                        "state": billing.BTown,
                        "postcode": billing.BPostcode,
                        "email": billing.BEmail,
                        "phone": billing.BPhone,
                    },
                    "shippingLines": [
                        {
                            "methodId": "flat_rate",
                            "methodTitle": "ค่าส่ง",
                            "total": cart.totalShipping
                      }
                      ],
                    "coupons": conpon.code,
                    "customerNote": this.props.note,
                    "lineItems": lineItemsMutation,
                    "paymentMethod": "omise",
                    "isPaid": false,
                    "transactionId": chargeID
                }
            }, fetchPolicy: 'no-cache',
        })
        let orderNumber = items.data.createOrder.order.orderId
        existingCart = JSON.parse(existingCart)
        let all = {...existingCart,orderNumber}
        this.props.OrderNumber(orderNumber)
        await localStorage.setItem('woo-next-carts', Base64.btoa(JSON.stringify(all)))
        
    }
    GetOrder = async (orderId) => {
        const item = await getWoocomData(
            'en',
            "orders/"
        );
    }
    createCreditCardCharge = async (email, name, amount, token, phoneNumber) => {
        const [cart, setCart, address, setAddress, billing, setBilling,cartThx,setCartThx] = this.context
        let _ = this
        
        await axios.post('/system/omise/checkout-credit-card', { email, name, amount, token, phoneNumber,cartThx})
            .then(async function (response) {
                await _.CreateOrder(cart, address, billing, response.data.charge.id, 0)
                Router.push(response.data.return_uri)
                return response
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    omiseTokenHandle = () => {
        const [cart, setCart, address, setAddress] = this.context
        // this.CreateOrder()
        OmiseCard.open({
            frameDescription: 'Invoice',
            amount: cart.totalProductsPrice + '00',
            submitFormTarget: '#checkout-form',
            onCreateTokenSuccess: (token) => {
                this.createCreditCardCharge(address.Email, address.F_name + ' ' + address.L_name, cart.totalProductsPrice + '00', token, address.Phone)
            },
            onFormClosed: (res) => {
                /* Handler on form closure. */
            },
        })
    }
    handleCheckout = e => {
        e.preventDefault()
        this.creditCardConfigure()
        this.omiseTokenHandle()
    }
    UpdateConpon = () => {

    }
    CartItems() {
        
        const [cart, setCart, address, setAddress,billing, setBilling,cartThx,setCartThx] = this.context
        const addressDetail = (null !== address && Object.keys(address).length) ? address : ''
        const billingDetail = (null !== billing && Object.keys(billing).length) ? billing : ''
        const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : (cartThx != null && Object.keys(cartThx).length) ? cartThx.totalProductsCount : ''
        const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice : (cartThx != null && Object.keys(cartThx).length) ? cartThx.totalProductsPrice : ''
        const products = (null !== cart && Object.keys(cart).length) ? cart.products : (cartThx != null && Object.keys(cartThx).length) ? cartThx.products : ''
        const totalShipping = (null !== cart && Object.keys(cart).length) ? cart.totalShipping : (cartThx != null && Object.keys(cartThx).length) ? cartThx.totalShipping : ''
        const totalSubtotal = (null !== cart && Object.keys(cart).length) ? cart.totalSubtotal : (cartThx != null && Object.keys(cartThx).length) ? cartThx.totalSubtotal : ''
        const conpon = (null !== cart && Object.keys(cart).length) ? cart.isConpon : (cartThx != null && Object.keys(cartThx).length) ? cartThx.isConpon : ''
        return (
            <>
                {conpon != undefined ?
                    <div className="discount_wrapper">
                        <p className="subject">Discount</p>
                        <div className="discount_detail">
                            <div className='discount_item'>
                                {/* <p class="error" style={{color:"red"}}> conpon date exp </p><br/> */}
                            </div>

                            <div className='discount_item'>
                                <p>{conpon.description}</p>
                                <p>{priceCommas(parseInt(conpon.priceDiscount))} THB</p>
                            </div>
                        </div>
                    </div>
                    : ''}
                <div className='checkout-detailGroup'>
                    <div className="checkout-detailItem">
                        <div className="col-subject">
                            <p>Subtotal ({productCount} items)</p>
                        </div>
                        <div className="col-resuit">
                            <p>{totalSubtotal != "" ? priceCommas(parseInt(totalSubtotal)) : 0} THB</p>
                        </div>
                    </div>
                    <div className="checkout-detailItem">
                        <div className="col-subject">
                            <p >Shipping Fee</p>
                            <span>(Free shipping with min spend of 1,500 Baht)</span>
                        </div>
                        <div className="col-resuit">
                            <p>{totalShipping != 0? totalShipping + " THB": "Free"}</p>
                        </div>
                    </div>
                    {conpon != undefined ? <div className="checkout-detailItem">
                        <div className="col-subject">
                            <p>Conpon Discount</p>
                        </div>
                        <div className="col-resuit">
                            <p>{priceCommas(parseInt(conpon.priceDiscount))} THB</p>
                        </div>
                    </div>: ''}
                    
                </div>

                <div className="coupon-wrapper">
                    <button
                        data-target="coupon"
                        onClick={this.props.callsection}
                        className="btn-allCoupon" >All Coupon Code
                    </button>
                    <div className="form-coupon">
                        <input type="text" name="coupunCode" className="input-coupunCode" placeholder="Enter Voucher Code" />
                        <button type="submit" className="btn-applyCode">APPLY</button>
                    </div>
                </div>
                <div className="purchase-wrapper">
                    <p>Total Purchase <span>{priceCommas(totalPrice) != 0 ? priceCommas(totalPrice)  : "0"} THB</span></p>
                    <small>VAT included, where applicable</small>
                </div>
                <Script url="https://cdn.omise.co/omise.js" onLoad={this.handleLoadScript}
                />
                {
                    this.props.sectionActive != 'thankyou' ?
                    this.props.sectionActive != 'confirm'  ?
                        productCount != 0 && products.length != 0 && !this.props.isLoading && addressDetail != '' && billingDetail != '' && this.props.sectionActive != 'address' ?
                            <button data-target="confirm" onClick={this.props.callsection} className="btn-checkOut">PROCESS TO CHECKOUT</button> : <button className="btn-checkOut" disabled>PROCESS TO CHECKOUT</button>
                        :
                        <form>
                            <button id="checkout-button" type="button" className="btn-checkOut btn-checkout" onClick={this.handleCheckout}>Pay with Credit Card</button>
                        </form>
                    : ''
                    // <button data-target="checkout" onClick={this.props.callsection} className="btn-checkOut">CHECKOUT</button>
                }
            </>
        )
    }
    render() {

        return (
            this.CartItems()
        )
    }
}
export default Rightbar