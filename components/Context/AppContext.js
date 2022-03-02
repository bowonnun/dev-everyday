import React, { useState, useEffect } from "react";
import { json } from "body-parser";
import Base64 from '../Base64'
export const AppContext = React.createContext([
    {},
    () => { }
])
export const AppProvide = (props) => {
    const [cart, setCart] = useState(null);
    const [cartThx, setCartThx] = useState(null);
    const [address, setAddress] = useState(null);
    const [billing, setBilling] = useState(null);
    useEffect(() => {
        if (process.browser) {

            //    let cartData = localStorage.getItem('woo-next-cart')
            let encode = localStorage.getItem('woo-next-cart')
            //    var cartData= Base64.atob(encode);
            if (encode != null) {
                let cartData = Base64.atob(encode);
                cartData = null !== cartData ? JSON.parse(cartData) : ''
                setCart(cartData)
            } else {
                let cartData = null;
                cartData = null !== cartData ? JSON.parse(cartData) : ''
                setCart(cartData)

            }
            let addresEncode = localStorage.getItem('address')
            if (addresEncode != null) {
                let addressData = addresEncode
                addressData = null !== addressData ? JSON.parse(addressData) : ''
                setAddress(addressData)
            } else {
                let addressData = addresEncode
                addressData = null !== addressData ? JSON.parse(addressData) : ''
                setAddress(addressData)
            }
            let billingEncode = localStorage.getItem('billing')
            if (billingEncode != null) {
                let billingData = billingEncode
                billingData = null !== billingData ? JSON.parse(billingData) : ''
                setBilling(billingData)
            } else {
                let billingData = billingEncode
                billingData = null !== billingData ? JSON.parse(billingData) : ''
                setBilling(billingData)
            }
            let cartThxencode = localStorage.getItem('woo-next-carts')
            //    var cartData= Base64.atob(encode);
            if (cartThxencode != null) {
                let cartThxData = Base64.atob(cartThxencode);
                cartThxData = null !== cartThxData ? JSON.parse(cartThxData) : ''
                setCartThx(cartThxData)
            } else {
                let cartThxData = null;
                cartThxData = null !== cartThxData ? JSON.parse(cartThxData) : ''
                setCartThx(cartThxData)

            }



        }
    }, [])
    return (
        <AppContext.Provider value={[cart, setCart, address, setAddress, billing, setBilling, cartThx,setCartThx]}>
            {props.children}
        </AppContext.Provider>
    )
}