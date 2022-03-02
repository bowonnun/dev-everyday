import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Link from 'next/link'
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import { ContactSkeleton } from "../../components/skeletion";
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
class ContactUs extends Component {
     constructor(props){
         super(props)
     }
    render() {
        if (!this.props.tReady) {
            return (
                <Page>
                    <ContactSkeleton />
                </Page>
            )
        }
        else {
            return (
                <Page title="Contact Us" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                    <section>
                        <div className="ct-page pdtop-site">
                            <div className="ct-page_wrapper">
                                <div className="ct-text-group">

                                    <div className="ct-title">
                                        <h1 className="ct-title_name">{this.props.t('contactus-label')}</h1>
                                        {/* <Link href='/'>
                                            <a className="icon-close_wraper" href="/"><i className="icon-closer"></i></a>
                                        </Link> */}
                                    </div>

                                    <p className="ct-des">{this.props.t('ctdes1-label')} <br /> {this.props.t('ctdes2-label')} <Link href='/faqs' as={`/faqs`}><a className="link-contactus"  href='/faqs'>{this.props.t('faqs-label')}</a></Link>
                                    </p>
                                </div>
                                <div className="ct-category-group">
                                    <div className="ct-row clearfix">
                                        <div className="ct-cat_item">
                                            <Link
                                                href={`/contactus/[slug]`}
                                                as={`/contactus/brand`} passHref>
                                                <a href="">
                                                    <div className="ct-box">
                                                        <h3 className="ct-subject">{this.props.t('brand-label')}</h3>

                                                    </div>
                                                </a>
                                            </Link>

                                            <div className="ct-list">
                                                <p className="ct-list_item">- {this.props.t('ourcompany-label')}</p>
                                                <p className="ct-list_item">- {this.props.t('ourheritage-label')}</p>
                                            </div>
                                        </div>

                                        <div className="ct-cat_item">
                                            <Link
                                                href={`/contactus/[slug]`}
                                                as={`/contactus/product`} passHref>
                                                <a href="">
                                                    <div className="ct-box">
                                                        <h3 className="ct-subject">{this.props.t('product-label')}</h3>
                                                    </div>
                                                </a>
                                            </Link>
                                            <div className="ct-list">
                                                <p className="ct-list_item">- {this.props.t('recommendedproducts-label')}</p>
                                                <p className="ct-list_item">- {this.props.t('productinformation-label')}</p>
                                            </div>
                                        </div>
                                        <div className="ct-cat_item">
                                            <Link
                                                href={`/contactus/[slug]`}
                                                as={`/contactus/service`} passHref>
                                                <a href="">
                                                    <div className="ct-box">
                                                        <h3 className="ct-subject">{this.props.t('service-label')}</h3>
                                                    </div>
                                                </a>
                                            </Link>
                                            <div className="ct-list">
                                                <p className="ct-list_item">- {this.props.t('instoreservice-label')}</p>
                                                <p className="ct-list_item">- {this.props.t('eservice-label')}</p>
                                            </div>
                                        </div>
                                        <div className="ct-cat_item">
                                            <Link
                                                href={`/contactus/[slug]`}
                                                as={`/contactus/website`} passHref>
                                                <a href="">
                                                    <div className="ct-box">
                                                        <h3 className="ct-subject">{this.props.t('website-label')}</h3>
                                                    </div>
                                                </a>
                                            </Link>
                                            <div className="ct-list">
                                                <p className="ct-list_item">- {this.props.t('karmakametmembership-label')}</p>
                                            </div>
                                        </div>
                                        <div className="ct-cat_item">
                                            <Link
                                                href={`/contactus/[slug]`}
                                                as={`/contactus/member`} passHref>
                                                <a href="">
                                                    <div className="ct-box">
                                                        <h3 className="ct-subject">{this.props.t('member-label')}</h3>
                                                    </div>
                                                </a>
                                            </Link>
                                            <div className="ct-list">
                                                <p className="ct-list_item">- {this.props.t('questionaboutourwebsite-label')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Page>
            )
        }
    }
}
ContactUs.getInitialProps = async () => ({
    namespacesRequired: ['layout'],
})
ContactUs.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(ContactUs);