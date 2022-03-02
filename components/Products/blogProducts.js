import React , { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'
import { getWoocomData } from "../../services/WooService";
class Blogproducts extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: "",
            dataAll: [],
            dataCategory: [],
            isMounted: false,
        }
    }2
    componentDidMount = async () =>{
        
        const item = await getWoocomData('en',"products/categories?slug="+this.props.category);
        this.setState({isMounted: true,dataAll:item})
    }
    render(){
        return (
            this.state.isMounted && <section className="sec-viewProduct">
                <div className="sec-title">
                    <h1>{this.state.dataAll[0].name}</h1>
                </div>
                <div className="sec-view-p_wrapper">
                    {
                        this.state.dataAll[0].item.map((product,i)=>{
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
                        })
                    }
                    
                </div>
                <div className="sec-btn">
                    <Link href="/product-category/[slug]"  as={`/product-category/${this.state.dataAll[0].slug}`} passHref>
                        <a className="btn-outline-b" href="" >VIEW PRODUCTS</a>
                    </Link>
                    
                </div>
            </section>
        )
    }
}
Blogproducts.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(withRouter(Blogproducts));