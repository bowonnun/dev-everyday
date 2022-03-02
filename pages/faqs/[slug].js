import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Router, { withRouter } from 'next/router'
import Link from 'next/link';
import { i18n, withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import { FaqDateilSkeleton } from "../../components/skeletion";
// ------------ Api
import { getFaqs } from '../../services/FaqsService'

class SlugFaqs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.router.query.slug,
            faqs: [],
            isMounted: false,
            lang: ''
        }
    }
    // componentDidMount = async () =>{
    //     const data = await getFaqs(this.props.i18n.language, Router.query.slug)
    //     this.setState({ faqs: data,lang:this.props.i18n.language,isMounted: true,url:window.location.href })
    // }
    componentWillReceiveProps = async (nextProps) => {
        if (this.state.lang !== nextProps.i18n.language) {
            const data = await getFaqs(this.props.i18n.language, Router.query.slug)
            this.setState({ faqs: data, lang: this.props.i18n.language })
        }
    }
    rawMarkup(detail) {
        var rawMarkup = detail
        return { __html: rawMarkup.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />') };
    }
    render() {
        if (!this.props.tReady) {
            return <Page><FaqDateilSkeleton /></Page>
        }
        else {
            return (
                <Page title="FAQs Karmakamet" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic" images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                    <section>
                        <div className="f-detail-page pdtop-site">
                            <div className="f-detail-page_wrapper">
                                <Link href='/faqs' as={`/faqs`}>
                                    <a href="" className="btn_back">
                                        <i className="icon-arrow-left"></i> BACK
                                    </a>
                                </Link>
                                <div className="f-detail-title">
                                    <div className="f-title_name">
                                        <span className="main-name">{this.props.t('faqs-label')}</span>
                                        <span>/</span>
                                        <span className="sub-name">{this.props.t(this.state.title + '-label')}</span>
                                    </div>
                                </div>
                                {
                                    <div className="f-detail-block">
                                        <div className="fd-block_wrapper">
                                            <div className="accordion fd-accordion" id="accordionExample">
                                                {
                                                    this.props.faqs.map((faq, i) => {
                                                        if (typeof faq.item[0] === 'undefined') {
                                                            return <p className="text-center">{this.props.t('cannotfindq-label')}</p>
                                                        }
                                                        else {
                                                            return faq.item.map((item, i) => {
                                                                return (
                                                                    <div className="card fd-card">
                                                                        <button className="btn btn-link fdbtn-link collapsed" type="button" data-toggle="collapse" data-target={"#F" + i} aria-expanded="true" aria-controls={"#F" + i}>
                                                                            <p className="fd-btn-link_inner">{item.post_title}</p>
                                                                        </button>
                                                                        <div id={"F" + i} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                                            <div className="card-body fdcard-body" dangerouslySetInnerHTML={this.rawMarkup(item.post_content)} />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </Page>
            )
        }
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({ params, req }) {
    let faqs = await getFaqs(req.language, params.slug)
    if (isServer) {
        return { props: { namespacesRequired: ['layout'], faqs } }
    } else {
        return { props: {} }
    }
}
// const isServer = () => typeof window === 'undefined'
// export async function getServerSideProps(context) {
//     const cookies = context.req.headers.cookie;
//   var heade_xml = 'next-i18next=';
//   var index_start = cookies.indexOf(heade_xml)+ heade_xml.length;
//   var lang = cookies.substring(index_start, index_start+2);
//     let faqs = await getFaqs(lang, context.params.slug)
//     if (isServer) {
//         return { props: { namespacesRequired: ['layout'], faqs } }
//     } else {
//         return { props: {} }
//     }
// }
SlugFaqs.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(withRouter(SlugFaqs));