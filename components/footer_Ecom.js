import React, { Component } from 'react';
import { withTranslation } from '../i18n'
import Footer from "../components/footer";
import Link from 'next/link';
class Footer_Ecom extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="Footer-Ecom">
                <div id="FooterAccordion" className='Footer-Ecom_wrapper'>
                    <div class="Footer-col">
                        <div class="card-header" id="heading_1">
                            <button className='Footer-subject' data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                                <h2>QUARTER</h2>
                            </button>
                        </div>
                        <div id="collapse_1" class="collapse " aria-labelledby="heading_1" data-parent="#FooterAccordion">
                            <div className='FooterConent'>
                                <div className='contentItem'>
                                    <p className='BandName'>{this.props.t('officename-label')}</p>
                                    <p>{this.props.t('officeaddress1-label')}</p>
                                    <p>{this.props.t('officeaddress2-label')} <br/> {this.props.t('officeaddress3-label')}</p>
                                </div>
                                <div className='contentItem'>
                                    <p>{this.props.t('officehours-label')} {this.props.t('mon-label')}. - {this.props.t('thu-label')}. 09.00-17.00 hrs.</p>
                                    <p>{this.props.t('tel-label')}<a href="tel:+6623917391"> +66 2391 7391-2 </a> <span style={{ padding: '0px 3px' }}>,</span> {this.props.t('fax-label')} <a href="tel:+6623916389">+66 2391 6389</a></p>
                                    <p>Email: customerservices@karmakamet.co.th</p>
                                    <p>Line: @karmakamet</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="Footer-col">
                        <div class="card-header" id="heading_2">
                            <button className='Footer-subject' data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" aria-controls="collapse_2">
                                <h2>COMPANY</h2>
                            </button>
                        </div>
                        <div id="collapse_2" class="collapse " aria-labelledby="heading_2" data-parent="#FooterAccordion">
                            <div className='FooterConent'>
                                <Link href="/aboutus">
                                    <a href='/aboutus"' className='FooterLink-item'><p>{this.props.t('aboutus-label')}</p></a>
                                </Link>

                                <a href='' className='FooterLink-item'><p>{this.props.t('store-label')}</p></a>
                                {/* <a href='' className='FooterLink-item'><p>BEING MEMBERSHIP</p></a> */}
                                {/* <a href='' className='FooterLink-item'><p>SCENT ADVISOR</p></a> */}

                                <Link href="/terms-conditions">
                                    <a href='/terms-conditions' className='FooterLink-item'><p>{this.props.t('termsconditions-label')}</p></a>
                                </Link>
                                <Link href="/privacy-policy">
                                    <a href='/privacy-policy' className='FooterLink-item'><p>{this.props.t('privacypolicy-label')}</p></a>
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div class="Footer-col">
                        <div class="card-header" id="heading_3">
                            <button className='Footer-subject' data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" aria-controls="collapse_3">
                                <h2>HELP</h2>
                            </button>
                        </div>
                        <div id="collapse_3" class="collapse " aria-labelledby="heading_3" data-parent="#FooterAccordion">
                            <div className='FooterConent'>
                                <Link href="/howtoorder">
                                    <a href='/howtoorder' className='FooterLink-item'><p>{this.props.t('howtoorder-label')}</p></a>
                                </Link>
                                {/* <Link href="/onlinestores">
                                <a href='' className='FooterLink-item'><p>{this.props.t('store-label')}</p></a>
                                </Link> */}
                                <Link href="/return-exchange">
                                <a href='' className='FooterLink-item'><p>{this.props.t('howtochange-label')}</p></a>
                                </Link>
                                <Link href="/faqs">
                                <a href='' className='FooterLink-item'><p>{this.props.t('faqs-label')}</p></a>
                                </Link>
                                
                                <Link href="/contactus">
                                    <a href='/contactus' className='FooterLink-item'><p>{this.props.t('contactus-label')}</p></a>
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* <div class="Footer-col">
                        <div class="card-header" id="heading_4">
                            <button className='Footer-subject' data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" aria-controls="collapse_4">
                                <h2>NEWSLETTER</h2>
                            </button>
                        </div>
                        <div id="collapse_4" class="collapse " aria-labelledby="heading_4" data-parent="#FooterAccordion">
                            <div className='FooterConent'>
                                <div className='group_ip-sletter'>
                                    <p>Be the first get the latest news about trends,promotion <br />
                                        and much more</p>
                                    <input name='' className='input_footer' />
                                    <button type='submit' className='btn-subscribe'>SUBSCRIBE</button>
                                </div>
                            </div>

                        </div>
                    </div> */}

                </div>
                <Footer />
            </footer>
        )
    }
}
export default withTranslation('layout')(Footer_Ecom)