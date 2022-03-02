import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Links from 'next/link'
import { i18n, withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import { ContactSkeleton } from "../../components/skeletion";
class Faqs extends Component {
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
                <Page title="FAQs Karmakamet" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic" images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                    <section>
                        <div className="faqs-page pdtop-site">
                            <div className="faqs-page_wrapper">
                                <div className="faqs-text-group">
                                    <div className="faqs-title">
                                        <h1 className="faqs-title_name">{this.props.t('faqs-label')}</h1>
                                        {/* <Links href='/'>
                                            <a className="icon-close_wraper" href="/"><i className="icon-closer"></i></a>
                                        </Links> */}
                                    </div>
                                    <p className="faqs-des">{this.props.t('faqsdes1-label')}<br />
                                        {this.props.t('faqsdes2-label')}<br />
                                        {this.props.t('faqsdes3-label')}<Links href='/contactus' as={`/contactus`} className="link-contactus"><a className="link-contactus" href="/contactus">{this.props.t('contactus-label')}</a></Links>
                                    </p>
                                </div>
                                <div className="faqs-category-group">
                                    <div className="faqs-row clearfix">
                                        <div className="faqs-cat_item">
                                            <Links
                                                href={`/faqs/[slug]`}
                                                as={`/faqs/brand`} passHref>
                                                <a href="">
                                                    <div className="faqs-box">
                                                        <h3 className="faqs-subject">{this.props.t('brand-label')}</h3>
                                                    </div>
                                                </a>
                                            </Links>
                                        </div>

                                        <div className="faqs-cat_item">
                                            <Links
                                                href={`/faqs/[slug]`}
                                                as={`/faqs/product`} passHref>
                                                <a href="">
                                                    <div className="faqs-box">
                                                        <h3 className="faqs-subject">{this.props.t('product-label')}</h3>
                                                    </div>
                                                </a>
                                            </Links>
                                        </div>
                                        <div className="faqs-cat_item">
                                            <Links
                                                href={`/faqs/[slug]`}
                                                as={`/faqs/service`} passHref>
                                                <a href="">
                                                    <div className="faqs-box">
                                                        <h3 className="faqs-subject">{this.props.t('service-label')}</h3>
                                                    </div>
                                                </a>
                                            </Links>
                                        </div>
                                        <div className="faqs-cat_item">
                                            <Links
                                                href={`/faqs/[slug]`}
                                                as={`/faqs/website`} passHref>
                                                <a href="">
                                                    <div className="faqs-box">
                                                        <h3 className="faqs-subject">{this.props.t('website-label')}</h3>
                                                    </div>
                                                </a>
                                            </Links>
                                        </div>
                                        <div className="faqs-cat_item">
                                            <Links
                                                href={`/faqs/[slug]`}
                                                as={`/faqs/member`} passHref>
                                                <a href="">
                                                    <div className="faqs-box">
                                                        <h3 className="faqs-subject">{this.props.t('member-label')}</h3>
                                                    </div>
                                                </a>
                                            </Links>
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
Faqs.getInitialProps = async () => ({
    namespacesRequired: ['layout'],
})
Faqs.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(Faqs);