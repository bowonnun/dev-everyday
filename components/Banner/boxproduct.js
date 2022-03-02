import React, {Component} from 'react'
import dynamic from 'next/dynamic';
import styles from '@/sass/boxcategory.module.scss'
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

class Boxproduct extends Component{
    state = {
        isMounted: false,
    }
    stateowl = {
        responsive:{
            0: {
                items: 1,
                stagePadding: 20,
            },
            450: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: this.props.col,
            },
        }
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.setState({isMounted: true})
    }
    render(){
        return(
            <div className={"wrap-section " + (this.props.mode == 'dark' ? 'bg-dark': '')} style={{borderBottom: '1px solid #000'}}>
                <div className={styles.name_section + ' name_section'}  style={{borderRight: '0px solid #000'}}>
                    <a href="hashtag.php">RECOMMEND PRODUCTS</a>
                </div>
                <div className={styles.slide_section}>
                  {
                      this.state.isMounted && this.props.banners &&
                      <OwlCarousel className="owl-theme slide-item" responsive={this.stateowl.responsive} margin={11} loop={false} nav={true} stagePadding={60} dots={true} >
                          {
                              this.props.banners.map((banner) => {
                                  return (
                                      <div className={styles.product_item + ' item hov-boxshadow my-3'}  key={banner.bannerId}>
                                          <div className={styles.wrap_img} >
                                              <div className={styles.img_item} style={{backgroundImage: 'url(/images/products/44.png)',backgroundPosition: '0px 0px',transform:'scale(1)',height:'auto'}}>
                                                  <img src="/images/products/44.png"  style={{opacity: '0'}}/>
                                                  <div className={styles.p_dctags_wrapper} >
                                                    <p className={styles.p_dctags_item + ' color-tags-discounts'} >
                                                        Discount 20%
                                                    </p>
                                                    <p className={styles.p_dctags_item + ' color-tags-Buy'} >
                                                        Buy 1 Get 1
                                                    </p>
                                                </div>
                                              </div>
                                          </div>
                                          <div className={styles.product_des} >
                                                <h3 className={styles.p_name} >Original Aromatic Glass Candle</h3>
                                                <div className={styles.p_price_group} >
                                                    <span className={styles.p_price} >THB 490-990</span>
                                                    <span className={styles.p_price_dc} >THB 490-990</span>
                                                </div>
                                          </div>
                                      </div>
                                  )
                              })
                          }
                      </OwlCarousel> 
                  }
                </div>
            </div>
        )
    }
}
export default Boxproduct;