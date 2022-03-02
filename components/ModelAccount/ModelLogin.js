import React, { Component } from 'react';
import Link from 'next/link';
class ModelLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='ModelLogin'>
                <div className='ModelLoginOverlay' onClick={this.props.userAccount}></div>
                <div className='ModelLogin_wrapper'>
                    <div className='inner'>
                        <div className="logoModel">
                            <img src="/static/images/img_ModelAccount/_LOGO BE.svg" alt=""></img>
                        </div>
                        <div className='group-ip'>
                            <div className="ip-item">
                                <label for="ip_Email">Login with Email</label>
                                <input type="text" name="ip_Email" id="ip_Email" />
                            </div>
                            <div className="ip-item">
                                <label for="ip_Password">Password</label>
                                <input type="text" name="ip_Password" id="ip_Password" />
                            </div>
                        </div>
                        <div className='groupBtn'>
                            <button className='btn-ForgetPass'>
                                <span>Forget Password</span>
                            </button>
                            <button className='btn-Login'>
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                    <div className="sec-btn">
                        <Link href=""><a href="" className="btn-new-member" type="button">New Member</a></Link>
                        <Link href=""><a href="" className="btn-trans-member" type="button">Transfer Member</a></Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default ModelLogin