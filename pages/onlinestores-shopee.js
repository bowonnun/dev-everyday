import React,{ Component } from 'react';
import Page from '../layouts/main'
import Router, {withRouter} from 'next/router'
import { withTranslation } from '../i18n'
class OnlineStore extends Component{
    constructor(props){
        super(props)

    }
    state = {
        posts: [],
        lang: '',
    }
    componentDidMount = async () =>{
        this.setState({isMounted: true})
        // console.log(data)
    }
    render() {
        return (
            <Page title="Online Store Karmakamet" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="/static/images/lazada.jpg" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                 <section>
                    <div className="hashtag-page pdtop-site" style={{ overflow: 'hidden' }}>
                        <div className="hashtag-page_wrapper">
                            <div className="hashtag-subject">
                                <h1  className="hashtag-name"style={{letterSpacing: 4}}>ONLINE STORES</h1>
                            </div>
                            <div className="onlinestores_wrapper">
                                <div className="onlinestores-item">
                                    <a href="https://bit.ly/2YhrE1p" target="_blank">
                                        <img src="../static/images/lazada.jpg" className="img-responsive" />
                                    </a>
                                </div>
                                <div className="onlinestores-item">
                                    <a href="https://bit.ly/3f1Leob" target="_blank">
                                        <img src="../static/images/shopee.jpg" className="img-responsive" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </Page>
        )
    }
}

export default withRouter(withTranslation('layout')(OnlineStore));