import React, {Component} from 'react'
import dynamic from 'next/dynamic';
import { SkeletonSection } from "../../components/skeletion";
import styles from '@/sass/boxcategory.module.scss'
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

class Boximagesonly extends Component{
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
        const {title,col,theme,mode,category,margin,products} = this.props;
        return(
            <div className={"wrap-section " + (this.props.mode == 'dark' ? 'bg-dark': '')}>
                <div className={styles.slide_section}>
                <h1 className={styles.tile_sec + '' + styles.title-for1sec}>
                    {title}
                    <span>INSTAGRAM / KARMAKAMET</span>
                    </h1>
                  {
                      this.state.isMounted && this.props.products ?
                      <OwlCarousel className="owl-theme  slide-item" responsive={this.stateowl.responsive} margin={parseInt(margin)} loop={false} nav={false} stagePadding={145} dots={false} > 
                      {
                           products.url.map((product, i) => {
                              return (
                                  <div className={styles.item + ' hov-grayscale my-3 out-line_none'} key={i}>
                                      <div className={styles.wrap_img} >
                                          <div className={styles.img_item} style={{backgroundImage: 'url('+product+')',backgroundPosition: '0px 0px',transform:'scale(1)',height:'auto'}}>
                                              <img src={product}  alt={i}   style={{opacity: '0'}}/>
                                          </div>
                                      </div>
                                  </div>
                              )
                          })
                      }
                      </OwlCarousel>
                      :
                      <SkeletonSection/>
                  }
                </div>
            </div>
        )
    }
}
export default Boximagesonly;