import React, { Component } from 'react'
import { withTranslation } from '../../i18n'
class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            nextstep: false
        }
    }
    render() {
        return (
            <div className="cart-col_L">
                <section className="sec-checkout">
                    <form>
                        <div className="subText">
                            <p>Credit/Debit Card</p>
                            <div className="group-typeCard">
                                <img className="typeCard-item" src="/static/images/cart/visa.png"/>
                                <img className="typeCard-item" src="/static/images/cart/mastercard.png" />
                            </div>
                        </div>
                        <div className="formCheckout-inner">
                            <div className="fullCol-input">
                                <label className="label-title" for="card_number">Card number<span>*</span></label>
                                <input className="inputCheckout " type="text" name="card_number" id="card_number" placeholder="XXXX XXXX XXXX XXXX" />
                            </div>
                            <div className="fullCol-input">
                                <label className="label-title" for="name_card">Name card<span>*</span></label>
                                <input className="inputCheckout " type="text" name="name_card" id="name_card" placeholder="Name card" />
                            </div>
                            <div className="halfCol-input">
                                <label className="label-title" for="exp_card">Expiration date<span>*</span></label>
                                <input className="inputCheckout " type="text" name="exp_card" id="exp_card" placeholder="MM/YY" />
                            </div>
                            <div className="halfCol-input">
                                <label className="label-title" for="cvv">CVV<span>*</span></label>
                                <input className="inputCheckout " type="text" name="cvv" id="cvv" placeholder="CVV"/>
                            </div>
                            <button className="btn-payNow mt-3">PAY NOW</button>
                        </div>
                        
                    </form>
                </section>
            </div>
        )
    }
}
export default withTranslation('layout')(Checkout)