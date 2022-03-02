import React, {Component} from 'react';
import { withTranslation } from '../i18n'
import Link from 'next/link';
class Footer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <footer className="footer-main">
                <div className="container-footer">
                    <div className="wrap-footer">
                        <div className="adress-box">
                            <p className="band-name">{this.props.t('officename-label')}</p>
                            <p>{this.props.t('officeaddress1-label')}</p>
                            <p>{this.props.t('officeaddress2-label')} {this.props.t('officeaddress3-label')}</p>
                        </div>
                        <div className="icon">
                            <a href="https://www.facebook.com/karmakamet/" target="_blank" className="icon-facebook"></a>
                            <a href="https://www.instagram.com/karmakamet/"  target="_blank" className="icon-ig"></a>
                            <a href="https://www.youtube.com/channel/UCOmHhJEOW-IENi6gHGVlWHQ/videos"  target="_blank" className="fab fa-youtube"></a>
                            <a href="https://twitter.com/KarmakametTH"  target="_blank" className="fab fa-twitter"></a>
                            <a href="https://lin.ee/kA0CLeg"  target="_blank" className="fab fa-line"></a>
                        </div>
                        <div className="contact-box">
                            <p>{this.props.t('tel-label')}<a href="tel:+6623917391"> +66 2391 7391-2 </a> <span style={{padding: '0px 3px'}}>,</span> {this.props.t('fax-label')} <a href="tel:+6623916389">+66 2391 6389</a></p>
                            <p>{this.props.t('officehours-label')} {this.props.t('mon-label')}. - {this.props.t('thu-label')}. 09.00-17.00 hrs.</p>
                        </div>
                        <div className="grup-link">
                            <Link href="/aboutus"><a href="/aboutus">{this.props.t('aboutus-label')}</a></Link>
                            <Link href="/contactus"><a href="/contactus">{this.props.t('contactus-label')}</a></Link>
                            <Link href="/faqs"><a href="/faqs">{this.props.t('faqs-label')}</a></Link>
                        </div>
                        <div className="footer-copyright">
                            <p>{new Date().getFullYear()} KARMAKAMET ALL RIGHT RESEVRED</p>
                        </div>
                        <div className="terms-con">
                            <Link href="/terms-conditions"><a href="/terms-conditions">{this.props.t('termsconditions-label')}</a></Link>
                            <Link href="/privacy-policy"><a href="/privacy-policy">{this.props.t('privacypolicy-label')}</a></Link>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default withTranslation('layout')(Footer)