import React, { Component } from 'react';
import Page from '../layouts/main'
import Router, { withRouter } from 'next/router'
import { withTranslation } from '../i18n'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { getWoocomData } from "../services/WooService";
import Blogproducts from '../components/Products/blogProducts'
import Blogproductsimages from '../components/Products/blogProductsImages'
import firebase from '../services/FirebaseService'
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});
class Online extends Component {
    state = {
        isMounted: false
    }
    stateowl = {
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        }
    }
    CatIcon_slide = {
        responsive: {
            0: {
                nav: true,
                items: 3,
            },
            460: {
                nav: true,
                items: 4,
            },
            860: {
                nav: true,
                items: 6,
            },
            1140: {
                items: 8,
            },
        }
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = async () => {
        this.setState({ isMounted: true })
    }
    bindLayout = () => {
        const { bannergroup } = this.props
        const layout = bannergroup.map((data, i) => {
            if (data.images === '') {
                return <Blogproducts category={data.linkcategory} />
            }
            else {
                return <Blogproductsimages category={data.linkcategory} data={this.props.bannergroup[i]} />
            }
            return layout
        })
        return layout;
    }
    parseHtmlEntities(str) {
        var decoded = str.replace(/&amp;/g, '&');
        return decoded
    }
    render() {
        const { categories } = this.props
        return (
            <Page title="Karmakamet Online " description="Karmakamet Online " images="/static/images/lazada.jpg" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                <section>
                    <div className="online pdtop-site" style={{ overflow: 'hidden' }}>
                        <div className="online_wrapper">
                            <section className='sec-CatIcon_slide'>
                                <OwlCarousel className="owl-theme CatIcon_slide" responsive={this.CatIcon_slide.responsive} dots={false} >
                                    {
                                        categories.map((cat,i)=>{
                                             return <Link href="/product-category/[slug]"  as={`/product-category/${cat.slug}`} passHref>
                                                <a href="" className="CatIcon_slide-item">
                                                    {cat.image != null ? <img src={cat.image.src}  alt="" /> : <img src=""  alt="" />}
                                                    <span className='nameCat'>{this.parseHtmlEntities(cat.name)}</span>
                                                </a>
                                            </Link>
                                        })
                                    }
                                </OwlCarousel>
                            </section>

                            <div className="tab-link">
                                <a href="" target="" className='eventNone'>Free Shipping on all orders over 1,500.- and above {/* <i className="icon-arrow-right4"></i> */}</a>
                            </div>

                            {/* ------ block-1 ---- */}
                            {
                                this.state.isMounted && this.bindLayout()
                            }
                            {/* ------ block-2 ---- */}
                            {/* <OwlCarousel className="owl-theme banner-online" responsive={this.stateowl.responsive} >
                                <div className="item">
                                    <div className="images-banner">
                                        
                                        <img src="/static/images/online/Artboard – 1.jpg" alt="" />
                                    </div>
                                    <div className="group-content_l">
                                        <p className="txt-subtitle txt-yellow">MUST HAVE PRODUCT</p>
                                        <p className="txt-title txt-white">WHITE GRAPEFRUIT<br />HAND CREAM</p>
                                        <p className="txt-subtitle txt-yellow">750 BAHT.</p>
                                        <a className="btn-outline-w" href="" target="_blank">VIEW PRODUCTS</a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="images-banner">
                                        <img src="/static/images/online/Artboard – 2.jpg" alt="" />
                                       
                                    </div>
                                    <div className="group-content_r">
                                        <a className="btn-outline-w" href="" target="_blank">VIEW PRODUCTS</a>
                                        <p className="txt-subtitle txt-yellow">MUST HAVE PRODUCT</p>
                                        <p className="txt-title txt-white">WHITE GRAPEFRUIT<br />HAND CREAM</p>
                                        <p className="txt-subtitle txt-yellow">750 BAHT.</p>
                                    </div>
                                </div>
                            </OwlCarousel> */}

                            {/* ------ block-3 ---- */}
                            <section className="sec-parallax">
                                {/* <div className="parallax-item bg-black">
                                    <div className="group-content_c">
                                        <p className="txt-title txt-white">Find the perfect product for your needs.</p>
                                    </div>
                                </div> */}
                                <div className="parallax-item">
                                    <Link  href="/product-category/[slug]"  as={`/product-category/aromatherapy-spa`}>
                                        <a  href="">
                                            <div className="parallax-img" tagOuter="figure">
                                                <img src='/static/images/online/iPhone X-XS-11 Pro – 2.jpg' />
                                            </div>
                                            <div className="group-content_l">
                                                <p className="txt-title txt-white pb-3">Aromatherapy & Spa</p>
                                                <p className="txt-detail txt-white txt_light f24" >There is no consensus about the best types of <br />
                                                    aromatherapy for sleep. What works best for any <br />
                                                    individual may depend on the nature of their sleeping <br />
                                                    problems and their fragrance preferences.</p>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div className="parallax-item">
                                    <Link  href="/product-category/[slug]"  as={`/product-category/best-sellers`}>
                                        <a href="">
                                            <div className="parallax-img" tagOuter="figure">
                                                <img src='/static/images/online/iPhone X-XS-11 Pro – 1.jpg' />
                                            </div>
                                            <div className="group-content_l">
                                                <p className="txt-title txt-white pb-3">RECOMMENDED <br />FOR YOU</p>
                                                <p className="txt-detail txt-white txt_light f24" >There is no consensus about the best types of <br />
                                                    aromatherapy for sleep. What works best for any <br />
                                                    individual may depend on the nature of their sleeping <br />
                                                    problems and their fragrance preferences.</p>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div className="parallax-item">
                                    <Link  href="/product-category/[slug]"  as={`/product-category/heritage`}>
                                        <a  href="">
                                            <div className="parallax-img" tagOuter="figure">
                                                <img src='/static/images/candle2.jpg' />
                                            </div>
                                            <div className="group-content_l">
                                                <p className="txt-title txt-white pb-3">Heritage</p>
                                                <p className="txt-detail txt-white txt_light f24" >There is no consensus about the best types of <br />
                                                    aromatherapy for sleep. What works best for any <br />
                                                    individual may depend on the nature of their sleeping <br />
                                                    problems and their fragrance preferences.</p>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </section>
                            {/* <section className="sec-getcoupon text-center ">
                                <p className="txt-subtitle txt-white pb-3">Let’s keep the conversation going</p>
                                <p className="txt-white txt_light f24 pb-3" >TReceive our newsletter and discover our stories, collections, and surprises.</p>
                                <div class="sec-btn"><a class="btn-outline-b btn_gold" href="">GET COUPON</a></div>
                            </section> */}
                            <section className="sec-warranty">
                                <div className="sec-warranty_wrapper">
                                    <div className="warranty-item">
                                        <img src="/static/images/online/warranty/warranty-1.png" className="warranty-img" />
                                        <p className="warranty-txt">Authentic</p>
                                    </div>
                                    <div className="warranty-item">
                                        <img src="/static/images/online/warranty/warranty-2.png" className="warranty-img" />
                                        <p className="warranty-txt">Brand-New</p>
                                    </div>
                                    <div className="warranty-item">
                                        <img src="/static/images/online/warranty/warranty-3.png" className="warranty-img" />
                                        <p className="warranty-txt">Trustworthy</p>
                                    </div>
                                    <div className="warranty-item">
                                        <img src="/static/images/online/warranty/warranty-4.png" className="warranty-img" />
                                        <p className="warranty-txt">Assured</p>
                                    </div>
                                    <div className="warranty-item">
                                        <img src="/static/images/online/warranty/warranty-5.png" className="warranty-img" />
                                        <p className="warranty-txt">Responsible</p>
                                    </div>
                                    <div className="warranty-item">
                                        <img src="/static/images/online/warranty/warranty-6.png" className="warranty-img" />
                                        <p className="warranty-txt">Speedy</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>



            </Page>
        )
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({ params, req }) {
    // const bestsellers = await getWoocomData(req.language, 'products/categories?slug=best-sellers')
    let firestore = firebase.firestore();

    let bannergroup = []
    const bannerData = await firestore.collection("bannersProduct").orderBy('index', 'asc').get();
    await firestore.collection("bannersProduct").orderBy('index', 'asc').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            bannergroup.push(doc.data());

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
    const categories = await getWoocomData(
        req.language,
        "products/categories?per_page=99&parent=213"
      );
    if (isServer) {
        return { props: { namespacesRequired: ['layout'], bannergroup, categories } }
    } else {
        return { props: {} }
    }
}
export default withRouter(withTranslation('layout')(Online));