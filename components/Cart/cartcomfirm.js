import React , { Component } from 'react'
import { AppContext } from '../Context/AppContext'
import { updateCart,removeItemFromCart, SelectItemFromCart, priceCommas } from '../../services/function'
import Base64 from '../Base64'
import Link from 'next/link'
import { getWoocomData } from "../../services/WooService";
import client from '../../components/Apollo/apolloClient'
import gql from 'graphql-tag'
class Cartcomfirm extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            products : 0,
            checkedAll : false
        }
        this.checkedAll = React.createRef()
        this.qtyChange = this.qtyChange.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    removeToCart = (productId,variationId) =>{
        const [cart , setCart] = this.context
        if(process.browser) {
            const updateCart = removeItemFromCart(productId,variationId)
            setCart( updateCart )
        }
        
    }
    qtyChange = (qty,i) => {
        const [cart , setCart] = this.context
        const products = ( null !== cart && Object.keys(cart).length) ? cart.products : ''
        let encode = localStorage.getItem('woo-next-cart')
        if(process.browser) {
            let existingCart = Base64.atob(encode);
                existingCart = JSON.parse(existingCart)
                const qtyToBeAdded = parseInt(qty)
                const groupVariations = {
                    regularPrice: products[i].regularPrice,
                    saleprice: products[i].salePrice != null ? products[i].salePrice : null,
                    price: products[i].salePrice != null ? products[i].salePrice :products[i].regularPrice,
                    variationId: products[i].variationId,
                }
            const updatedCart = updateCart(existingCart, products[i],qtyToBeAdded,groupVariations)
            setCart( updatedCart )
        }
    }
    splitScents = (text, index) => {
        var res = text.split("-");
        return res[index]
    }
    handleAllChecked = async event => {
        const [cart , setCart] = this.context
        const product = cart.products
        await cart.products.map( async (item,i)=>{
            if(event.target.checked == true){
                item.isChecked = event.target.checked;
                let updateisChecked = SelectItemFromCart(cart, item, true)
                setCart( updateisChecked )
            }else{
                item.isChecked = event.target.checked;
                let updateisChecked = SelectItemFromCart(cart, item, false)
                setCart( updateisChecked )
            }
            
        })
        this.setState({products:product})
    };
    handleChange = async (e) =>{
        const [cart , setCart] = this.context
        const product = cart.products
        await cart.products.map((item,i)=>{
            if (item.variationId == e.target.value)
            {
                item.isChecked = e.target.checked;
                let updateisChecked = SelectItemFromCart(cart, item, item.isChecked)
                setCart( updateisChecked )
            }
            else if(e.target.value == item.productId){
                item.isChecked = e.target.checked;
                let updateisChecked = SelectItemFromCart(cart, item, item.isChecked)
                setCart( updateisChecked )
            }
        })
        this.setState({products:product})
    }
    CartItems(){
        const [cart , setCart] = this.context
        const productCount = ( null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : ''
        const totalPrice = ( null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice : ''
        const products = ( null !== cart && Object.keys(cart).length) ? cart.products : ''
        const isCheckedAll = ( null !== cart && Object.keys(cart).length) ? cart.isCheckedAll : ''

        return(
            <>
            <div className="table-orderTitle">
                <div className="table-orderTitle_wrapper">
                    <p>Product ({productCount} items)</p>
                    <p className="text-center">Quantity</p>
                    <p className="text-center">Price</p>
                </div>
            </div>
            <div className="group-pCart table-order_wrapper">
            {
                products.length !== 0 ?

                products.map((item,i)=>{
                    if(item.isChecked){
                        return (<div className="order-item " key={i}>
                            <div className="img-wrapper">
                                <img src={item.image} />
                            </div>
                            <div className="detail">
                                <h3>{this.splitScents(item.name,0)}</h3>
                                <p>{this.splitScents(item.name,1)}</p>
                                <p>{priceCommas(item.regularPrice)}-{priceCommas(item.price)} THB</p>
                            </div>
                            <div className="count-item  text-center ">
                                    <p>{item.qty}</p>
                            </div>
                            <div className={"price text-center "+ (item.saleprice != null ? "price-discount" : '')}>
                                {
                                    item.saleprice != null ? <><h3>{priceCommas(item.saleprice*item.qty)} THB</h3><p>{priceCommas(item.regularPrice*item.qty)} THB</p></> : <h3>{item.regularPrice*item.qty} THB</h3>
                                }
                            </div>
                        </div>)
                    }
                }): <div style={{display: 'flex',height:'100px',textAlign: 'center',fontSize: "20px",alignItems: 'center',justifyContent: 'center',borderBottom: '1px solid #000'}}>
                    No products to product Pages
                </div>
            }
            </div>
            </>
        )
    }
    render() {

        return (
            this.CartItems()
        )
    }
}
export default Cartcomfirm