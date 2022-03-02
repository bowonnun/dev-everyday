import React, {Component} from 'react'
import Moment from 'react-moment';
import { AppContext } from '../Context/AppContext'
import { updateCart, removeItemFromCart, priceCommas, ConponFromCart } from '../../services/function'
import { withTranslation } from '../../i18n'

class Conpon extends Component {
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state = {
            conponSelect : {}
        }
    }
    componentDidMount = () => {
        // this.props.couponAll
    }
    ConponCode = async (conpon) =>{
        this.setState({conponSelect:conpon})
    }
    SelectConponCode = async (conpon) =>{
        const [cart, setCart, address, setAddress,billing, setBilling] = this.context
        const product = cart.products
        
        await cart.products.map((item,i)=>{
            let updateisChecked = ConponFromCart(cart, item, conpon,item.isChecked,this.props.productsInCartManageStock)
            setCart( updateisChecked )
        })
        this.setState({products:product})
        this.props.couponSelected(conpon)
    }
    render(){
        const couponLists = this.props.couponAll
        return(
            <div className="cart-col_L">
                <section className="sec-allCoupon">
                    <form>
                        <div className="allCoupon_wrapper">
                            {
                                
                                couponLists != null ? 
                                couponLists.map((couponList,i)=>{
                                    return (
                                        <label className="coupon-item" for={"coupon-"+i}>
                                            <input type="radio" name="coupon" value={i} id={"coupon-"+i} onClick={() => this.ConponCode(couponList)} />
                                            <div className="coupon-item_wrapper">
                                                <div className="coupon-img">
                                                    <img src={couponList.images_coupons} />
                                                </div>
                                                <div className="coupon-detail">
                                                    <p className="name-coupon">{couponList.description}</p>
                                                    <p className="valid-till">Valid Till: <Moment date={couponList.date_expires} format="DD.MM.YYYY" /></p>
                                                    
                                                </div>
                                                <div className="ico-check_wrapper">
                                                    <i className="icon-circle-check " aria-hidden="true" />
                                                </div>
                                            </div>
                                        </label>
                                    )
                                })
                                
                                : ''
                            }
                        </div>
                        <div className="allCoupon_footer">
                            <p>1 Coupon / 1 Order Purchase</p>
                            <button  type="button"   className="btn-cfCoupon" data-target="" onClick={() => this.SelectConponCode(this.state.conponSelect)}>CONFIRM COUPON</button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}
export default withTranslation('layout')(Conpon)