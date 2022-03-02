import React, { Component } from "react";
import { AppContext } from '../Context/AppContext'
import Link from 'next/link'

class Carticon extends Component {
    static contextType = AppContext
    constructor(props){
        super(props)
    }
    CountProducts(){
        const [cart , setCart] = this.context
        const productCount = ( null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : ''
        const totalPrice = ( null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice : ''
        return(
            <>
            <Link href="/cart">
                <a>
                    <div className="cart-icon">
                        {totalPrice ? <span>฿ {totalPrice.toFixed(2)}</span>:''}
                        <span className="group-cart">
                            Count {productCount ? <span>{productCount}</span>:''}
                        </span>
                    </div>
                </a>
            </Link>
            </>
        )
    }
    render(){
        return(
            <div>
                {
                    this.CountProducts()
                }
            </div>
        )
    }
}
export default Carticon