import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import { SkeletonSection } from "../../components/skeletion";
import ReCAPTCHA from "react-google-recaptcha";
import { sendEmail } from '../../services/EmailService'
import Swal from 'sweetalert2'
class SlugContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : this.props.router.query.slug,
            callback: false,
            token: '',
            load: false,
            expired: false,
            email: '',
            subject: '',
            message: '',
            isSubmit: false,
            isCheck: false

        };
        this.captcha = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(value) {
        this.setState({ token: value });
        if (value === null) this.setState({ isCheck: false });
        else {
            this.setState({ isCheck: true });
        }
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, subject, message, token } = this.state;
        if (token === '') {
            return Swal.fire({
                title: 'Error!',
                text: 'Validation failed!',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        }
        else {
            const data = {
                email: email,
                subject: subject,
                messages: message,
                type: this.props.router.query.slug.toUpperCase(),
            };
            this.setState({ isSubmit: true });
            const res = await sendEmail(data);

            if (res.status === 200) {
                this.captcha.reset();
                this.setState({ isSubmit: false, email: '', subject: '', message: '', token: '', expired: false });
                return Swal.fire({
                    title: 'Contact to website!',
                    text: 'Send contact success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            }
            else {
                this.captcha.reset();
                this.setState({ isSubmit: false, email: '', subject: '', message: '', token: '', expired: false });
                return Swal.fire({
                    title: 'Error!',
                    text: 'Can not send contact please send again',
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            }
        }
    }
    render() {
        if (!this.props.tReady && this.state.callback === false) {
            return <SkeletonSection />
        }
        else {
            return (
                <Page title={"Contact Us Karmakamet" } description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="https://karmakametstudio.com/wp-content/uploads/2020/03/kmkm-Rush2.jpg" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                    <section>
                        <div className="c-detail-page pdtop-site">
                            <div className="c-detail-page_wrapper">
                                <Link href={`/contactus`}>
                                    <a href="/contactus" className="btn_back">
                                        <i className="icon-arrow-left"></i> {this.props.t('back-label')}
                                    </a>
                                </Link>
                                <div className="c-detail-title">
                                    <div className="c-title_name">
                                        <span className="main-name">{this.props.t('contactus-label')}</span>
                                        <span>/</span>
                                        <span className="sub-name">{this.props.t(this.state.title + '-label')}</span>
                                    </div>
                                </div>
                                <div className="c-detail-content">
                                    <p className="cd-content_item">{this.props.t('ctdes1-label')}</p>
                                    <p className="cd-content_item">{this.props.t('ctdes2-label')}
                                        <span className="cd-content_linkitem"> <Link href='/faqs'><a href="/faqs">{this.props.t('faqs-label')}</a></Link></span>
                                    </p>
                                </div>
                                <div className="c-detail_body">
                                    <div className="cd-block_left">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="cd-form-group">
                                                <input type="email" className="cd-form-control" value={this.state.email} onChange={this.handleChange} name="email" placeholder={this.props.t('email-label')} required />
                                            </div>
                                            <div className="cd-form-group">
                                                <input type="text" className="cd-form-control" value={this.state.subject} onChange={this.handleChange} name="subject" placeholder={this.props.t('subject-label')} required />
                                            </div>
                                            <div className="cd-form-group">
                                                <textarea className="cd-form-control cd-textarea" value={this.state.message} onChange={this.handleChange} name="message" placeholder={this.props.t('note-label')} required></textarea>
                                            </div>

                                            <div className="cd-form-group cd-recaptcha">
                                                <ReCAPTCHA
                                                    style={{ display: "inline-block" }}
                                                    theme="dark"
                                                    sitekey="6LdAlq4ZAAAAALI1epbjflUTuywnd8n5uPz6brxG"
                                                    onChange={this.onChange}
                                                    ref={e => (this.captcha = e)}

                                                />
                                            </div>
                                            <button type="submit" className="btn cd-btn_send" disabled={this.state.isSubmit}>{this.props.t('send-label')}</button>
                                        </form>
                                    </div>

                                    <div className="cd-block_right">.
                                        <div className="mapouter">
                                            <div className="gmap_canvas">
                                                <iframe style={{ width: '100%', height: '100%' }} id="gmap_canvas" src="https://maps.google.com/maps?q=257%20%E0%B8%8B%E0%B8%AD%E0%B8%A2%20%E0%B8%9B%E0%B8%A3%E0%B8%B5%E0%B8%94%E0%B8%B5%20%E0%B8%9E%E0%B8%99%E0%B8%A1%E0%B8%A2%E0%B8%87%E0%B8%84%E0%B9%8C%2025%20Phra%20Khanong%20Nuea%2C%20Watthana%2C%20Bangkok%2010110%2C%20Thailand&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0}>
                                                </iframe>
                                            </div>
                                        </div>
                                        <div className="cdmap-detail">
                                            <div className="cdmap-detail_wrapper">
                                                <div className="cdmap-detail_item">
                                                    <span className="cdmap-btxt">{this.props.t('officename-label')}</span>
                                                </div>
                                                <div className="cdmap-detail_item">
                                                    <span className="cdmap-nmtxt">{this.props.t('officeaddress1-label')}.</span>
                                                </div>
                                                <div className="cdmap-detail_item">
                                                    <span className="cdmap-nmtxt">{this.props.t('officeaddress2-label')}</span>
                                                </div>
                                                <div className="cdmap-detail_item">
                                                    <span className="cdmap-nmtxt">{this.props.t('officeaddress3-label')}.</span>
                                                </div>
                                            </div>
                                            <div className="cdmap-detail_wrapper">
                                                <div className="cdmap-detail_item">
                                                    <span className="cdmap-btxt">{this.props.t('tel-label')}:</span>
                                                    <a className="cdmap-nmtxt" href="tel:+6623917391">+66 2391 7391 2</a>
                                                    <span style={{padding: '0px 3px',fontSize: '14pt'}}>,</span>
                                                    <span className="cdmap-btxt">{this.props.t('fax-label')}:</span>
                                                    <a className="cdmap-nmtxt" href="tel:+6623916389">+66 2391 6389</a>
                                                </div>
                                                <div className="cdmap-detail_item">
                                                    <span className="cdmap-btxt">{this.props.t('officehours-label')}:</span>
                                                    <span className="cdmap-nmtxt">{this.props.t('mon-label')}. - {this.props.t('thu-label')}. 09.00-17.00 hrs.</span>
                                                </div>
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
SlugContact.getInitialProps = async () => ({
    namespacesRequired: ['layout'],
})
SlugContact.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(withRouter(SlugContact));