import React , { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'
import { getWoocomData } from "../../services/WooService";
class Blogproductsimages extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: "",
            dataAll: [],
            dataCategory: [],
            isMounted: false,
        }
    }
    componentDidMount = async () =>{
        const item = await getWoocomData('en',"products/categories?slug="+this.props.category);
        this.setState({isMounted: true,dataAll:item})
    }
    rawMarkup(e){
        var rawMarkup = e
        return { __html: rawMarkup.replace(/\n/g, '<br />') };
    }
    render(){
        const {data} = this.props
        return (
            this.state.isMounted && 
            <>
            
            <section className="sec-image-p">
                <div className="image-p_img">
                    <img src={data.images} alt=""  className="hidden-xs" />
                    <img src={data.imagesMM} alt="" className="visable-xs" />
                </div>
                
                <div className="gruop-txt-absolute">
                <div className="txt-absolute_item handle" style={{ top: data.listHeader[0].controlledPosition.y+"%", left: data.listHeader[0].controlledPosition.x+'%' }}>
                        <p className="txt-title txt-white" 
                        style={{color:`rgba(${ data.listHeader[0].color.r }, ${ data.listHeader[0].color.g }, ${ data.listHeader[0].color.b }, ${ data.listHeader[0].color.a })`,}} dangerouslySetInnerHTML={this.rawMarkup(data.listHeader[0].title)} />
                        <p className="txt-subtitle2 txt-white"
                        style={{color:`rgba(${ data.listHeader[0].color.r }, ${ data.listHeader[0].color.g }, ${ data.listHeader[0].color.b }, ${ data.listHeader[0].color.a })`,}}  dangerouslySetInnerHTML={this.rawMarkup(data.listHeader[0].subtitle)} />
                        <p className="txt-content" style={{filter: 'invert(0)',color:`rgba(${ 0 }, ${ 0 }, ${ 0 }, ${ data.listHeader[0].color.a })`}} dangerouslySetInnerHTML={this.rawMarkup(data.listHeader[0].detail)} />
                    </div>
                    {
                        data.listCaption.map((item,i)=>{
                            return (
                                <Link href="/product/[slug]"  as={`/product/${item.dataslug}`} passHref key={i}>
                                    <a>
                                        <div className="txt-absolute_item" style={{ top: item.controlledPosition.y+"%", left: item.controlledPosition.x+"%" }}>
                                            <div href="" className="txt-linkProduct txt-white circle-icon-w"  style={{color:`rgba(${ item.color.r }, ${ item.color.g }, ${ item.color.b }, ${ item.color.a })`,borderColor:`rgba(${ item.color.r }, ${ item.color.g }, ${ item.color.b }, ${ item.color.a })`}}>
                                                {item.nameproduct}
                                                <br />{item.productprice}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="btn-container">
                    <Link href="/product-category/[slug]"  as={`/product-category/${data.linkcategory}`} passHref>
                        <a className="btn-outline-w" >VIEW PRODUCTS</a>
                    </Link>
                </div>
            </section>
            <section className="sec-viewProduct">
                <div className="sec-title">
                    <h1>{this.state.dataAll[0].name}</h1>
                </div>
                <div className="sec-view-p_wrapper">
                    {
                        this.state.dataAll[0].item.map((product,i)=>{
                            if(i < 12){
                            return (
                                <Link href="/product/[slug]"  as={`/product/${product.slug}`} passHref key={i}>
                                <div className="view-p_item">
                                    <figure>
                                        <div className="p-img">
                                            <img src={product.featured_image_thumbnail_url} />
                                        </div>
                                        <figcaption>
                                            <p className="p-name">{product.name}</p>
                                            <p className="p-price">THB {product.price}</p>
                                        </figcaption>
                                    </figure>
                                </div>
                                </Link>
                            )
                            }
                        })
                    }
                    
                </div>
                <div className="sec-btn">
                    <Link href="/product-category/[slug]"  as={`/product-category/${data.linkcategory}`} passHref>
                        <a className="btn-outline-b" >VIEW PRODUCTS</a>
                    </Link>
                    
                </div>
            </section>
            </>
        )
    }
}
Blogproductsimages.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(withRouter(Blogproductsimages));