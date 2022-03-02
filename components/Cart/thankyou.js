import React, { Component } from 'react'
import { withTranslation } from '../../i18n'
import { AppContext } from '../Context/AppContext'
import Script from 'react-load-script'
import CHECKOUT_MUTATION from '../../Graphql/checkout'
import UPDATEORDER_MUTATION from '../../Graphql/updateOrder'
import { priceCommas } from '../../services/function'
import Base64 from '../../components/Base64'
import client from '../../components/Apollo/apolloClient'
import gql from 'graphql-tag'
class Thankyou extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            nextstep: false,
            products:[]
        }
    }
    componentDidMount = () => {
        const [cart, setCart, address, setAddress, billing, setBilling,cartThx,setCartThx] = this.context
        let encode = localStorage.getItem('woo-next-carts');
        let existingCart = Base64.atob(encode);
        existingCart = JSON.parse(existingCart);
        this.setState({items: existingCart})
        this.UpdateOrder(cartThx)
    }
    UpdateOrder = async (cart) => {
        const lineItemsMutation = []
        let encode = localStorage.getItem('woo-next-carts')
        let existingCart = Base64.atob(encode);
        existingCart = JSON.parse(existingCart)
        const items = await client.mutate({ 
        mutation: UPDATEORDER_MUTATION, variables: {
            input: {
                "clientMutationId": "myID",
                "orderId": existingCart.orderNumber,
                "paymentMethod": "omise",
                "isPaid": true,
            }
        }, fetchPolicy: 'no-cache',
        })
        let orderNumber = items.data.updateOrder.order.orderId
        
        let all = {...existingCart,orderNumber}
    // localStorage.setItem('woo-next-carts', Base64.btoa(JSON.stringify(all)))
        
        
        
    }
    splitScents = (text, index) => {
        var res = text.split("-");
        return res[index]
    }
    render() {
        return (
            <div className="cart-col_L">
                <section className="sec-confirm ">
                    <p className='subText'>
                        Thank you for purchasing our super cool product.Your satistaction is of upmost<br />
                        importance to us,Wish you enjoy the scent of Karmakamet.
                    </p>
                    <div className="table-order">
                        <div className="table-orderTitle">
                            <div className="table-orderTitle_wrapper">
                                <p>Product ({this.state.items != undefined?  this.state.items.totalProductsCount : '0'} items)</p>
                                <p className="text-center">Quantity</p>
                                <p className="text-center">Price</p>
                            </div>
                        </div>
                        <div className='scroll-container'>
                            <div className="table-order_wrapper">
                                {
                                    this.state.items != undefined ?
                                    this.state.items.products.map((item,i)=>{
                                        return <div className="order-item">
                                            <div className="img-wrapper">
                                                <img src={item.image} />
                                            </div>
                                            <div className="detail">
                                            <h3>{this.splitScents(item.name,0)}</h3> 
                                            <p>{this.splitScents(item.name,1)}</p>
                                            <p>{priceCommas(item.regularPrice)}-{priceCommas(item.price)} THB</p>
                                            </div>
                                            <div className="count-item text-center">
                                                <p>{item.qty}</p>
                                            </div>
                                            <div className="price text-center">
                                                <h3>{item.totalPrice} THB</h3>
                                            </div>
                                        </div>
                                    }):''
                                }
                                
                                
                            </div>
                            <div className="show-noteUser">
                                <h5>Note</h5>
                                <p>{this.props.note}
                            </p>
                            </div>
                        </div>


                    </div>
                </section>
            </div>
        )
    }
}
export default withTranslation('layout')(Thankyou)