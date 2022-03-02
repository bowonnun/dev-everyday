import React, { Component } from "react";
import Page from '../layouts/main'
import Router, { withRouter } from 'next/router'
import { withTranslation } from '../i18n'
import Address from '../components/Cart/address'
import Conpon from '../components/Cart/conpon'
import Base64 from '../components/Base64'
import Checkout from '../components/Cart/checkout'
import Confirm from '../components/Cart/confirm'
import Thankyou from '../components/Cart/thankyou'
import Cartitem from '../components/Cart/cartitem'
import Informaton from '../components/Cart/information'
import Rightbar from '../components/Cart/rightbar'
import { AppContext } from '../components/Context/AppContext'
import { getWoocomData } from "../services/WooService";
import client from '../components/Apollo/apolloClient'
import Link from 'next/link'
import gql from 'graphql-tag'
import dataProvinces from '../data-clean/provinces.json'
import dataDistrict from '../data-clean/districts.json'
import dataZipcode from '../data-clean/zipcodes.json'
class Cart extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props)
        this.state = {
            sectionActive: '',
            textarea_note: '',
            textarea_note_length: '',
            selectAll: false,
            isLoading: true,
            productInCartManageStock: null,
            conponSelect: [],
            Provinces: '',
            Districts: '',
            dataDistrict: '',
            Address: '',
            ZipCode: '',
            dataZipCode: '',
            OrderNumber:'',
            pricePromotion:[],
            stepPromotionDetail:[1500,2000,4000]
        }
    }
    handleChangeProvince = (event,funcation) => {
        const { name, value } = event.target
        if (this.state.Nationality != "") {
            this.ProvinceChange(value)
        }
        funcation(event)
        this.setState({
            Provinces: value,
            ZipCode: '',
            dataDistrict: '',
            dataDistrict: '',
            Districts: ''
        })
        this.setState({ [name]: value, error: { ...this.state.error, [name]: '' } })

    }
    handleChangeDistricts = (event,funcation) => {
        const { name, value } = event.target
        var index = event.target.selectedIndex;
        var optionElement = event.target.childNodes[index]
        var option = optionElement.getAttribute('data-tag');
        this.setState({
            Districts: value
        })
        funcation(event)
        this.ZipcodeChange(option)
    }
    ProvinceChange = async (e) => {
        const PID = await dataProvinces.filter((p) => {
            return p.PROVINCE_NAME === e
        })
        if (PID !== null && PID.length !== 0) {
            this.DistrictChange(PID[0].PROVINCE_ID)
        }
    }
    DistrictChange = async (PID) => {
        const dataDist = await dataDistrict.filter((d) => {
            return d.PROVINCE_ID === PID
        })
        // usage example:
        
        this.setState({
            dataDistrict: dataDist
        })
    }
    ZipcodeChange = async (DID) => {
        const dataDist = await dataZipcode.filter((z) => {
            return z.DISTRICT_ID === DID
        })
        const uniqueTags = [];
        dataDist.map(img => {
            if (uniqueTags.indexOf(img.ZIPCODE) === -1) {
                uniqueTags.push(img.ZIPCODE)
            }
        });
        this.setState({
            dataZipCode: uniqueTags
        })
    }
    Spinner = () => {
        const { posts } = this.state
        const content = <div className="loading-productCart">
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
                    stroke="#000"
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
    callsection = (e) => {
        var namesec = e.currentTarget.dataset.target
        this.setState({
            sectionActive: namesec
        })
    }
    promotionStep = async (totalPrice) =>{
        this.setState({pricePromotion:totalPrice})
    }
    couponSelected = async (coupon) =>{
        let encode = localStorage.getItem('woo-next-cart');
        let existingCart = Base64.atob(encode);
        existingCart = JSON.parse(existingCart);
        const products = (null !== existingCart && Object.keys(existingCart).length) ? existingCart.products : ''
        const promotionItemsLists = coupon.product_ids
        if(new Date(coupon.date_expires) < new Date()){
            this.setState({
                sectionActive: ""
            })
        }
        await products.map((item,i)=>{
            if(promotionItemsLists.includes(item.productId) || promotionItemsLists.includes(item.variationId)){
            }
        })
        this.setState({conponSelect:coupon,sectionActive: ""})
    }
    componentDidMount = async () => {
        localStorage.removeItem('woo-next-carts');
        let encode = localStorage.getItem('woo-next-cart');
        let existingCart = Base64.atob(encode);
        if(encode == null){
            this.setState({ isLoading: false})
        }
        existingCart = existingCart != undefined ? JSON.parse(existingCart) : '';
        const products = (null !== existingCart && Object.keys(existingCart).length) ? existingCart.products : ''

        let productInCartManageStock = []
        let weight = []
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
                    weight
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
                    stockQuantity
                    stockStatus
                    weight
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
                weight.push(item.data.product.variations.weight)
            }
            else {
                productInCartManageStock.push(item.data.product)
                weight.push(item.data.product.weight)
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
                    stockQuantity
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
        this.setState({ isLoading: false, productInCartManageStock: productInCartManageStock  })
    }
    handleInputChange = e => {
        const { name, value } = e.target
        if (name == "textarea_note" && value.length <= 1000) {
            this.setState({
                textarea_note_length: value.length,
                textarea_note: value
            })
        }
        if (name != "textarea_note") {
            this.setState({
                [name]: value.length
            })
        }
    }
    OrderNumber = (orderID) =>{
        this.setState({OrderNumber: orderID})
    }
    titlepage = () => {
        if (this.state.sectionActive == 'thankyou') {
            return <h1>THANK YOU FOR ORDER</h1>
        } else {
            return <h1>CART {this.state.sectionActive != '' ? <span> {this.state.sectionActive}</span> : ''}</h1>
        }
    }
    bindsection = () => {
        const { isLoading } = this.state;
        
        if (this.state.sectionActive == 'coupon') {
            return (
                <Conpon callsection={this.callsection} couponAll={this.props.coupons} couponSelected={(coupon) => this.couponSelected(coupon)} productsInCartManageStock={this.state.productInCartManageStock}  />
            )
        } else if (this.state.sectionActive == 'address') {
            return (
                <Address  callsection={this.callsection} Nationality={this.state.Nationality}
                District={this.state.dataDistrict}
                ZipCode={this.state.dataZipCode}
                textarea_note_length={this.state.textarea_note_length}
                handleChangeProvince={this.handleChangeProvince}
                handleInputChange ={(e) => this.handleInputChange(e)}
                handleChangeDistricts={(e,fun)=>this.handleChangeDistricts(e,fun)}   />
            )
        } else if (this.state.sectionActive == 'checkout') {
            return (
                <Checkout />
            )
        } else if (this.state.sectionActive == 'confirm') {
            return (
                <Confirm note={this.state.textarea_note} />
            )
        } else if (this.state.sectionActive == 'thankyou') {
            return (
                <Thankyou note={this.state.textarea_note} orderNumber={this.state.OrderNumber} />
            )
        }

        else {
            return (
                <div className="cart-col_L">

                    {/* <section className="sec-giftStep">
                        <div className="giftStep-group">
                            <div className={this.state.stepPromotionDetail[0] < this.state.pricePromotion.totalSubtotal ? 'giftStep-item  giftStep-item_active': 'giftStep-item'}>
                                <i className="icon-circle-check " aria-hidden="true"></i>
                                <i className="icon-cart-icon_1" aria-hidden="true"></i>
                                <p>บริการจัดสงฟรี <br />เมื่อซื้อครบ 1,500 บาท</p>
                            </div>
                            <div className={this.state.stepPromotionDetail[1] < this.state.pricePromotion.totalSubtotal ? 'giftStep-item  giftStep-item_active': 'giftStep-item'}>
                                <i className="icon-circle-check " aria-hidden="true"></i>
                                <i className="icon-cart-icon_2" aria-hidden="true"></i>
                                <p>ฟรี Hand Sanitizer <br />กลิ่น Chinese Red Tea 1 หลอด<br />ยอดชำระ 2,000 บาท ขึ้นไป</p>
                            </div>

                            <div className={this.state.stepPromotionDetail[2] < this.state.pricePromotion.totalSubtotal ? 'giftStep-item  giftStep-item_active': 'giftStep-item'}>
                                <i className="icon-circle-check " aria-hidden="true"></i>
                                <i className="icon-cart-icon_2" aria-hidden="true"></i>
                                <p>ฟรี Original Perfume Sachet<br />กลิ่น Javanese Vanilla<br />ยอดชำระ 4,000 บาท ขึ้นไป</p>
                            </div>


                        </div>
                        <div className="giftStep-text">
                            <span>{this.state.stepPromotionDetail[2] > this.state.pricePromotion.totalSubtotal? "ช้อปเพิ่มอีกเพียง":""} {this.state.stepPromotionDetail[0] > this.state.pricePromotion.totalSubtotal ? this.state.stepPromotionDetail[0] - this.state.pricePromotion.totalSubtotal + " บาทเพื่อบริการจัดสงฟรี":this.state.stepPromotionDetail[1] > this.state.pricePromotion.totalSubtotal? this.state.stepPromotionDetail[1] - this.state.pricePromotion.totalSubtotal + " บาท รับทันที ของสมนาคุณ" :this.state.stepPromotionDetail[2] > this.state.pricePromotion.totalSubtotal?this.state.stepPromotionDetail[2] - this.state.pricePromotion.totalSubtotal + " บาท รับทันที ของสมนาคุณ" : ''}</span>
                            <a href="">สั่งซื้อสินค้าเพิ่ม</a>
                        </div>
                    </section> */}
                    <section className="sec-alertCart">
                        {


                            this.state.productInCartManageStock != null ?
                                this.state.productInCartManageStock.map((item, i) => {
                                    if (item.stockQuantity <= 5 && item.manageStock != null && item.stockStatus != "OUT_OF_STOCK") {
                                        return (
                                            <div className="alertCart-item">
                                                <p>{item.name} / {item.price}</p>
                                                <p>Stock : {item.stockQuantity} Items</p>
                                            </div>
                                        )
                                    }
                                    if (item.stockStatus == "OUT_OF_STOCK") {
                                        return (
                                            <div className="alertCart-item">
                                                <p>{item.name} / {item.price}</p>
                                                <p>SOLD OUT</p>
                                            </div>
                                        )
                                    }

                                })
                                : ''
                        }
                    </section>
                    <section className="sec-productCart">
                        <div className='inner_productCart'>
                            {isLoading ? this.Spinner() : ''}
                            <Cartitem selectAll={this.state.selectAll} productsInCartManageStock={this.state.productInCartManageStock} isLoading={isLoading} updateItemCart={() => this.updateItemCart() } conponSelect={this.state.conponSelect} promotionStep={(total) => this.promotionStep(total)} />
                        </div>
                        <div className="note-wrapper">
                            {/* <p>Note <span>({this.state.textarea_note_length.length != 0 ? this.state.textarea_note_length : '0'}/1000 )</span></p> */}
                            {/* <textarea id="textarea-note" name="textarea_note" value={this.state.textarea_note} rows="1" onChange={this.handleInputChange} placeholder="I want a paper bag and room diffuser" /> */}
                        </div>
                    </section>
                </div>
            )
        }

    }
    
    render() {
        var sectionName = this.state.sectionActive
        let address = []
        return (
            <Page title="Karmakamet Online" description="" images="/static/images/lazada.jpg" keywords="">
                <div className="cart-page pdtop-site" >
                    <div className="margin-container" >
                        <div className="title-page">
                            {this.state.sectionActive != 'thankyou' && this.state.sectionActive != '' ?
                                <button className="btn_back  pl-0"
                                    data-target=""
                                    onClick={this.callsection}>
                                    <i className="icon-arrow-left"></i> BACK
                                </button>
                                :
                                <Link href='/onlinestores'>
                                    <a href='' className="toShopping pl-0">
                                        BACK TO SHOPPING<i className="icon-arrow-right3"></i>
                                    </a>
                                </Link>

                            }

                            {this.titlepage()}

                        </div>
                        <div className="cart-wrapper-content">
                            {this.bindsection()}
                            <div className="cart-col_R">
                                <section className="sec-checkoutBox">
                                    {this.state.sectionActive == 'thankyou' ?
                                        <div className='OrderNum'>
                                            <p>Order No. KMKM1234567890</p>
                                        </div>
                                        : ''
                                    }
                                    <div className="shipping-wrapper">
                                        <p className="subject">Shipping</p>
                                        <Informaton callsection={this.callsection} />
                                    </div>
                                    {/* <div className="payment-wrapper">
                                        <p className="subject">Payment</p>
                                        <div className='payment-inner'>
                                            <div className="payment-detail">
                                                <p>5239 1000 0043 9245</p>
                                                <p>KTC Platinum Credit Card</p>
                                                <p>Exp. 10/23</p>funcation
                                                <p>Mastercard</p>
                                            </div>
                                            <div className='logoCard'>
                                                <img src='/static/images/cart/mastercard.png' />
                                            </div>
                                        </div>
                                    </div> */}
                                    <Rightbar callsection={this.callsection} sectionActive={this.state.sectionActive} conponSelect={this.state.conponSelect} note={this.state.textarea_note} OrderNumber={this.OrderNumber} />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </Page >
        )
    }
}
const isServer = () => typeof window === "undefined";
export async function getServerSideProps({ params, req }) {
  const item = await getWoocomData(
    req.language,
    "coupons"
  );
  // const result = [];
  // if(item[0].attributes[0] != null){

  //   const attributes = await getWoocomData(
  //     req.language,
  //     "products/attributes/" + item[0].attributes[0].id + "/terms?per_page=99"
  //   );
  //   const attrProduct = await attributes.map((attr, i) => {
  //     return item[0].attributes[0].options.map((attr_group, i) => {
  //       if (attr.id === attr_group) {
  //         result.push(attr);
  //       }
  //     });
  //   });
  // }
  if (isServer) {
    return { props: { namespacesRequired: ["layout"],coupons: item} };
  } else {
    return { props: {} };
  }
}
export default withRouter(withTranslation('layout')(Cart));