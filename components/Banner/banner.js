import React, { Component } from 'react'
import dynamic from 'next/dynamic';
import { BannerSkeleton } from "../../components/skeletion"
import Images from "next/image"
import styles from '@/sass/banner.module.scss'
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});

class Banner extends Component {
    state = {
        isMounted: false
    }
    stateowl = {
        responsive:{
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
    constructor(props){
        super(props);
        
    }
    componentDidMount=()=>{
        setTimeout(() => {
            this.setState({
                isMounted: true
          })
        }, 650);
    }
    bindItem=()=>{
        
        const content = this.props.banners && this.props.banners.map((banner,i) => {
            let res = banner.images[0].split(".gif")
            let resMp4 = banner.images[0].split(".mp4")
            if(banner.status != 0){
                if(resMp4[1] != undefined){
                    return (
                        <div className={'item'}  key={banner.id}>
                            <a href={`https://karmakamet.co.th/${banner.slug}`} target="_blank">
                                <div className={`${this.props.linkroute == "philo" ? 'philo-slide_item ' : styles.banner} hidden-xs`} style={{ backgroundPosition: '0% 75%', transform: 'scale(1)' }}>
                                    <video style={{ opacity: '1' }} >
                                        <source src={banner.images} type="video/mp4" />
                                    </video>
                                </div>
                                <div className={`${this.props.linkroute == "philo" ? 'philo-slide_item ' : styles.banner} visable-xs`} style={{ backgroundPosition: '0% 75%', transform: 'scale(1)' }}>

                                    <img src={banner.images.moblie} alt={banner.id} style={{ opacity: '1' }} />
                                </div>
                            </a>
                        </div>
                    )
                }
                if(banner.type != 5){
                    return (
                        <div className={'item'} key={banner.id}>
                    <a href={`https://karmakamet.co.th/${banner.slug}`} target="_blank">
                        <div className={`${this.props.linkroute == "philo" ? 'philo-slide_item ' : styles.banner} hidden-xs`} style={{ backgroundPosition: '0% 75%', transform: 'scale(1)' }}>
                            <img src={banner.images} alt={banner.id} style={{ opacity: '1' }} className={`${res[1] != undefined ? 'postion-object' : ''}`} />
                        </div>
                        <div className={`${this.props.linkroute == "philo" ? 'philo-slide_item ' : styles.banner} visable-xs`} style={{ backgroundPosition: '0% 75%', transform: 'scale(1)' }}>
                            <img src={banner.imagesmoblie} alt={banner.id} style={{ opacity: '1' }} />
                        </div>
                    </a>
                </div>
                    )
                }else{
                    return (
                        <div className="item" key={banner.id}>
                            <a href={`${banner.slug}`} target="_blank">
                                <div className={`${this.props.linkroute == "philo"? 'philo-slide_item ':styles.banner} hidden-xs`} style={{backgroundPosition: '0% 75%',transform:'scale(1)'}}>
                                    <img src={banner.images} alt={banner.id}  style={{opacity: '1'}} className={`${res[1] != undefined? 'postion-object':''}`}   />
                                </div>
                                <div className={`${this.props.linkroute == "philo"? 'philo-slide_item ':styles.banner} visable-xs`} style={{backgroundPosition: '0% 75%',transform:'scale(1)'}}>
                                    <img src={banner.imagesmoblie} alt={banner.id} style={{opacity: '1'}} />
                                </div>
                            </a>
                        </div>
                    )
                }
            }
        });
        
        return content;
    }
    render(){
        return (
            <div>
                {
                    !this.state.isMounted ? 
                        <BannerSkeleton />
                    :
                    this.state.isMounted && 
                    <OwlCarousel className={` owl-theme  ${this.props.linkroute == "philo" ? 'philo-slide ' : 'slide-banner'}`} responsive={this.stateowl.responsive} margin={10} loop={true}>
                        {
                            this.bindItem()
                        }
                    </OwlCarousel>
                    
                }
                <script dangerouslySetInnerHTML={{__html: `
                    window.onload = function () {
                        var element = document.getElementById('video');
                    }
                    `}} />
            </div>
                
        )
    }
}
// Banner.getInitialProps = async ({ ctx }) => {
//     let isMobileView = (ctx.req
//     ? ctx.req.headers['user-agent']
//     : navigator.userAgent).match(
//         /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
//     )
    
//     //Returning the isMobileView as a prop to the component for further use.
//     return {
//         isMobileView: Boolean(isMobileView)
//     }
// }
export default Banner