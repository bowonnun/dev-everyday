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
            productInCartManageStock: null
        }
    }
    Spinner = () => {
        const { posts } = this.state
        const content = <div className="loading-productCart SpinnerCart">
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
    splitScents = (text,index) => {
        var res = text.split("-");
        return res[index]
    }
    componentDidMount= async ()=>{
        let encode = localStorage.getItem('woo-next-cart');
        let existingCart = Base64.atob(encode);
        if(encode == null){
            this.setState({ isLoading: false})
        }
        existingCart = existingCart != undefined ? JSON.parse(existingCart) : '';
        const products = (null !== existingCart && Object.keys(existingCart).length) ? existingCart.products : ''
        let productInCartManageStock = []
        for (let index = 0; index < products.length; index++) {
            const PRODUCTS_QUERY = gql`query {
                product(idType: DATABASE_ID,  id:"${products[index].productId}") {
                  id
                  productId
                  name
                  sku
                  slug
                  shortDescription
                  description
                  purchaseNote
                  image {
                    id
                    sourceUrl
                    slug
                    title
                  }
                  galleryImages {
                    nodes {
                      sourceUrl
                      slug
                      id
                    }
                  }
                  ... on VariableProduct {
                    name
                    id
                    price
                    variations(first: 99, where: {search: "${products[index].name}"}) {
                      nodes {
                        variationId
                        sku
                        name
                        description
                        price(format: FORMATTED)
                        onSale
                        manageStock
                        stockQuantity
                        stockStatus
                        image {
                          sourceUrl
                          mediaItemUrl
                          mediaItemId
                        }
                        regularPrice(format: FORMATTED)
                        salePrice(format: FORMATTED)
                      }
                    }
                  }
                  ... on SimpleProduct {
                    id
                    name
                    price
                    salePrice
                    regularPrice
                    productId
                    manageStock
                    stockStatus
                  }
                  productCategories {
                    nodes {
                      name
                      slug
                    }
                  }
                }
               
            }`;
            const item = await client.query({ query: PRODUCTS_QUERY, fetchPolicy: 'no-cache', });
            if (item.data.product.__typename != "SimpleProduct") {
                productInCartManageStock.push(item.data.product.variations.nodes[0])
            }
            else {
                productInCartManageStock.push(item.data.product)
            }
        }
        this.setState({ isLoading: false, productInCartManageStock: productInCartManageStock })
        
    }
    updateItemCart = async () =>{
        this.setState({ isLoading: true})
        let encode = localStorage.getItem('woo-next-cart');
        if(encode == null){
            this.setState({ isLoading: false})
            return false
        }
        let existingCart = Base64.atob(encode);
        existingCart = JSON.parse(existingCart);
        const products = (null !== existingCart && Object.keys(existingCart).length) ? existingCart.products : ''
        let productInCartManageStock = []
        for (let index = 0; index < products.length; index++) {
            const PRODUCTS_QUERY = gql`query {
                product(idType: DATABASE_ID,  id:"${products[index].productId}") {
                  id
                  productId
                  name
                  sku
                  slug
                  shortDescription
                  description
                  purchaseNote
                  image {
                    id
                    sourceUrl
                    slug
                    title
                  }
                  galleryImages {
                    nodes {
                      sourceUrl
                      slug
                      id
                    }
                  }
                  ... on VariableProduct {
                    name
                    id
                    price
                    variations(first: 99, where: {search: "${products[index].name}"}) {
                      nodes {
                        variationId
                        sku
                        name
                        description
                        price(format: FORMATTED)
                        onSale
                        manageStock
                        stockQuantity
                        stockStatus
                        image {
                          sourceUrl
                          mediaItemUrl
                          mediaItemId
                        }
                        regularPrice(format: FORMATTED)
                        salePrice(format: FORMATTED)
                      }
                    }
                  }
                  ... on SimpleProduct {
                    id
                    name
                    price
                    salePrice
                    regularPrice
                    productId
                    manageStock
                    stockStatus
                  }
                  productCategories {
                    nodes {
                      name
                      slug
                    }
                  }
                }
               
            }`;
            const item = await client.query({ query: PRODUCTS_QUERY, fetchPolicy: 'no-cache', });
            if (item.data.product.__typename != "SimpleProduct") {
                productInCartManageStock.push(item.data.product.variations.nodes[0])
            }
            else {
                productInCartManageStock.push(item.data.product)
            }
        }
        this.setState({ isLoading: false, productInCartManageStock: productInCartManageStock })
    }
    removeToCart = (productId,variationId) =>{
        const [cart , setCart] = this.context
        if(process.browser) {
            const updateCart = removeItemFromCart(productId,variationId)
            setCart( updateCart )
        }
        
    }
    CountProducts() {
        const [cart, setCart] = this.context
        const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : ''
        const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice : ''
        const products = (null !== cart && Object.keys(cart).length) ? cart.products : ''
        const { isLoading } = this.state;

        return (
            <>
                <button className="btn-callCart icon-cart btnIcon-call_item" onClick={() => {this.updateItemCart()}}>
                    <div className="count-cart">
                        {!productCount ? <span>0</span> : productCount <= 99 ? <span>{productCount}</span> : <span>99+</span>}
                    </div>
                </button>
                <div className='cart_overlay'></div>
                <div className="cart-component">
                    <div className={"cart-detail_wrapper " + (isLoading ? 'isLoading' : '')}>
                        {isLoading ? this.Spinner() : ''}
                        <div className="cart-title">
                            <h2>CART</h2>
                            <div className="close-cart"><i className="icon-closer"></i></div>
                            <p>Total : {productCount} Products</p>
                        </div>
                        
                        <div className="group-cart-item">
                            {
                                products.length !== 0 ?
                                    products.map((item, i) => {
                                        return (
                                            <div className="cart-item" key={i}>
                                                <div className="img-pd_cart">
                                                    <div className="img-pd_cart-inner" style={{ backgroundImage: "url(" + item.image + ")" }} />
                                                </div>
                                                <div className="detail-pd_cart">
                                                    <h4>{this.splitScents(item.name,0)}</h4>
                                                    <h5>{this.splitScents(item.name,1)}</h5>
                                                    <h5>{item.qty} x {item.price} THB</h5>
                                                </div>
                                                <div className="delete-pd_cart"  onClick={()=> this.removeToCart(item.productId,item.variationId)}>
                                                    <i className="icon-trash-bin" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="cart-item">
                                        <div className="detail-pd_cart">
                                            <h4>ไม่มีสินค้าในตะกร้า</h4>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="footer-cartComponent">
                            <div className="subtotal">
                                <span>Total Purchase </span>
                                {totalPrice ? <span>{priceCommas(totalPrice.toFixed(2))}</span> : ''}
                                <small>VAT included</small>
                            </div>
                            <div className="group-btn-cart">
                                <Link href="/onlinestores"><button className="btn-shop-now">LET’S SHOP NOW</button></Link>
                                <Link href="/cart"><button className="btn-check-out">CHECK OUT</button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
    render() {

        return (
            this.CountProducts()
        )
    }
}
export default IconCart