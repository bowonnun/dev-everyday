import React, {Component} from 'react'
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

class Boxstore extends Component{
    state = {
        isMounted: false,
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
    componentDidMount(){
        this.setState({
            isMounted: true
      })
    }
    render(){
        return(
                      this.state.isMounted &&
                      <OwlCarousel className="owl-theme st-detail_slide" responsive={this.stateowl.responsive} nav={false}>
                          {
                              this.props.banners.length == 0 ?
                                <div className="item">
                                    <div className="st-detail_img" style={{ backgroundImage: 'url(' + this.props.single.img_full + ')' }}></div>
                                </div>
                              :
                              this.props.banners.map((img, i) => {
                                return (
                                    <div className="item" key={i}>
                                        <div className="st-detail_img" style={{ backgroundImage: 'url(' + img.full + ')' }}></div>
                                    </div>
                                )
                              })
                          }
                      </OwlCarousel> 
                  
        )
    }
}
export default Boxstore;