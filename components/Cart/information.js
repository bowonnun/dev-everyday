import React, { Component } from 'react'
import { AppContext } from '../Context/AppContext'
import { updateCart, removeItemFromCart } from '../../services/function'
import Base64 from '../Base64'
import Link from 'next/link'
class Information extends Component {
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
    CartItems() {
        const [cart, setCart, address, setAddress,billing, setBilling,cartThx,setCartThx] = this.context
        const addressDetail = (null !== address && Object.keys(address).length) ? address : ''
        return (
            <>
                {
                addressDetail == '' ? 
                    <div className="Add-address_Element">
                        <button className="btn-addAddress"
                            data-target="address"
                            onClick={this.props.callsection}>ADD SHIPPING ADDRESS
                        </button>
                    </div>
                : <div className="Change-address_Element">
                        <div className="shipping-detail">
                            <p>{addressDetail.F_name + " " + addressDetail.L_name}</p>
                            <p>{addressDetail.Street + " " + addressDetail.State + " " + addressDetail.Town + " " + addressDetail.Province + " " + addressDetail.Postcode}</p>
                            <p>{addressDetail.Phone}</p>
                        </div>
                        {this.props.sectionActive != 'thankyou' ?
                        <span href="" onClick={this.props.callsection} className="link-changeAddress" data-target="address">Change address</span>: ''}
                    </div>
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
export default Information