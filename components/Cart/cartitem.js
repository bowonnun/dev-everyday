import React , { Component } from 'react'
import { AppContext } from '../Context/AppContext'
import { updateCart,removeItemFromCart, SelectItemFromCart, priceCommas } from '../../services/function'
import Base64 from '../Base64'
import Link from 'next/link'
import { getWoocomData } from "../../services/WooService";
import client from '../../components/Apollo/apolloClient'
import gql from 'graphql-tag'
class Cartitem extends Component {
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
    removeToCart = async (productId,variationId) =>{
        const [cart , setCart] = this.context
        if(process.browser) {
            const updateCart = removeItemFromCart(productId,variationId)
            setCart( updateCart )
        }
        await this.props.updateItemCart()
    }
    qtyChange = async (qty,i) => {
        const [cart , setCart] = this.context
        const products = ( null !== cart && Object.keys(cart).length) ? cart.products : ''
        const conpon = (null !== cart && Object.keys(cart).length) ? cart.isConpon : ''
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
            const updatedCart = updateCart(existingCart, products[i],qtyToBeAdded,groupVariations,false,conpon,this.props.productsInCartManageStock[i])
            setCart( updatedCart )
            await this.props.promotionStep(updatedCart)
        }
    }
    splitScents = (text, index) => {
        var res = text.split("-");
        return res[index]
    }
    componentDidMount = async () =>{
        await this.props.updateItemCart()
        const [cart , setCart] = this.context
        const products = ( null !== cart && Object.keys(cart).length) ? cart.products : ''
        const conpon = (null !== cart && Object.keys(cart).length) ? cart.isConpon : ''
        if(products != ''){
            await products.map( async (item,i)=>{
                // item.isChecked = this.props.productsInCartManageStock[i].stockStatus == "OUT_OF_STOCK" ? false : cart.isCheckedAll;
                let updateisChecked = await SelectItemFromCart(cart, item, this.props.productsInCartManageStock[i].stockStatus == "OUT_OF_STOCK" ? false : item.isChecked,this.props.productsInCartManageStock,conpon)
                setCart( updateisChecked )
            })
        }
        await this.props.promotionStep(cart)
    }
    handleAllChecked = async event => {
        const [cart , setCart] = this.context
        const product = cart.products
        const conpon = (null !== cart && Object.keys(cart).length) ? cart.isConpon : ''
        await cart.products.map( async (item,i)=>{
            if(event.target.checked == true){
                item.isChecked = event.target.checked;
                let updateisChecked = await SelectItemFromCart(cart, item, true,this.props.productsInCartManageStock,conpon)
                setCart( updateisChecked )
            }else{
                item.isChecked = event.target.checked;
                let updateisChecked = await SelectItemFromCart(cart, item, false,this.props.productsInCartManageStock,conpon)
                setCart( updateisChecked )
            }
            
        })
        this.setState({products:product})
    };
    handleChange = async (e) =>{
        const [cart , setCart] = this.context
        const product = cart.products
        const conpon = (null !== cart && Object.keys(cart).length) ? cart.isConpon : ''
        await cart.products.map(async (item,i)=>{
            if (item.variationId == e.target.value)
            {
                item.isChecked = e.target.checked;
                let updateisChecked = await SelectItemFromCart(cart, item, item.isChecked,this.props.productsInCartManageStock,conpon)
                setCart( updateisChecked )
            }
            else if(e.target.value == item.productId){
                item.isChecked = e.target.checked;
                let updateisChecked = await SelectItemFromCart(cart, item, item.isChecked,this.props.productsInCartManageStock,conpon)
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
            <div className="select-all ">
                <label className="group-checkBox">
                    Select All ({productCount} items)
                <input type="checkbox" checked={isCheckedAll} ref="selectAll" onChange={this.handleAllChecked} />
                    <span className="checkmark" />
                </label>
            </div>
            <div className="group-pCart">
            {
                products.length !== 0 ?
                products.map((item,i)=>{
                    return (
                    <div className={this.props.productsInCartManageStock != null ?this.props.productsInCartManageStock[i].stockStatus == "OUT_OF_STOCK" ? "sold-out pCart-item" : "" + " pCart-item" : "pCart-item"} key={i}>
                        <label className="group-checkBox">
                            <input type="checkbox" id={'checked'+i} ref={'checked'} name={'checked'+i} value={item.variationId != null ? item.variationId : item.productId } checked={ this.props.productsInCartManageStock == null ? cart.products[i].isChecked : this.props.productsInCartManageStock[i].stockStatus == "OUT_OF_STOCK" ? false : cart.products[i].isChecked }  onChange={(e) => this.handleChange(e)} />
                            <span className="checkmark" />
                        </label>
                        <div className="img-wrapper">
                            <img src={item.image} />
                        </div>
                        <div className="detail">
                            <h3>{this.splitScents(item.name,0)}</h3> 
                            <p>{this.splitScents(item.name,1)}</p>
                            <p>{priceCommas(item.regularPrice)}-{priceCommas(item.price)} THB</p>
                        </div>
                        <div className="count-item">
                            <button className="btn-minus" onClick={() => this.qtyChange(-1,i)}>-</button>
                                 <p>{item.qty}</p>
                            <button className="btn-plus" onClick={() => this.qtyChange(1,i)}>+</button>
                        </div>
                        <div className={"price "+ (item.saleprice != null ? "price-discount" : '')}>
                            {
                                item.saleprice != null ? <><h3>{priceCommas(item.saleprice*item.qty)} THB</h3><p>{priceCommas(item.regularPrice*item.qty)} THB</p></> : <h3>{item.regularPrice*item.qty} THB</h3>
                            }
                            
                        </div>
                        <div className="delete-item">
                            <button className="btn-delItem" onClick={()=> this.removeToCart(item.productId,item.variationId)} >
                                <i className="icon-trash-bin" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>)
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
export default Cartitem