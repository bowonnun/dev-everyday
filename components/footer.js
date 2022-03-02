import React, { Component } from 'react';
import { withTranslation } from '../i18n'
import Link from 'next/link';
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="footer-main">
                <div className="container-footer">
                    <div className="wrap-footer">
                        <div className="adress-box">

                            <p className="band-name">{new Date().getFullYear()} KARMAKAMET ALL RIGHT RESEVRED</p>
                        </div>
                        <div className="icon ">
                            <a href="https://www.facebook.com/karmakamet/" target="_blank" className="icon-facebook"></a>
                            <a href="https://www.instagram.com/karmakamet/" target="_blank" className="icon-ig"></a>
                        </div>
                        <div className="CreditCard">
                            <span className='title-CreditCard'>Accept for</span>
                            <div className="groupCreditCard">
                                <a href="" target="_blank" className="CreditCard-item">
                                    <img className="typeCard-item" src="/static/images/footer_img/dbd.png" />
                                </a>
                                {/* <a href="" target="_blank" className="CreditCard-item">
                                    <img className="typeCard-item" src="/static/images/footer_img/protection.png" />
                                </a> */}
                                <a href="" target="_blank" className="CreditCard-item">
                                    <img className="typeCard-item" src="/static/images/footer_img/mastercard.png" />
                                </a>
                                <a href="" target="_blank" className="CreditCard-item">
                                    <img className="typeCard-item" src="/static/images/footer_img/visa.png" />
                                </a>
                                <a href="" target="_blank" className="CreditCard-item kerry">
                                    <img className="typeCard-item" src="/static/images/footer_img/kerry.png" />
                                </a>
                            
                            </div>

                        </div>

                    </div>
                </div>
            </footer>
        )
    }
}
export default withTranslation('layout')(Footer)