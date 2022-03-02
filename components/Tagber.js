import React, {Component} from 'react'
import dynamic from 'next/dynamic';
import { motion,AnimatePresence } from "framer-motion"
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

class Tagber extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMounted: false,
            tags:[],
            options: [],
            lang:''
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    stateowl = {
        margin:30,
        lazyLoad: true,
        dots: false,
        nav: false,
        tag_chack: false,
        stagePadding: 55,
        autoWidth: true,
        responsive:{
            0:{
                margin:20,
            },
            993:{
                items: 6,
            },
        }
    }
    
    componentDidMount(){
        this.setState({ isMounted: true})
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.itemTag !== prevProps.itemTag){
            this.setState({ tags: this.props.itemTag})
        }
    }
    handleClick(e){
        const {options} = this.state
        let index = {}
        if(e.target.className === "gal-tag-item gal-tag-item_active" ){
            e.target.className = "gal-tag-item"
            index = options.indexOf(e.target.value)
            options.splice(index, 1)
        }else{
            e.target.className = "gal-tag-item gal-tag-item_active"
            options.push(e.target.value)
        }
        
        this.props.changeState(options);
      }
    addItem(){
        return(
            this.props.itemTag.map((tag, i) =>{
    
                if(tag.id != null){
                    return (
                        <div className="item" key={tag.id}>
                            <div className="">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                data_id={tag.id} name={tag.id} className="gal-tag-item" onClick={this.handleClick}  value={tag.id} data-toggle={'.'+tag.name}
                            >
                                {tag.name}
                            </motion.button>
                                {/* <input type="checkbox" id={tag.id} value={tag.id}  name="textInput" /> */}
                            </div>
                        </div>
                    )
                }else{
                    return (
                        <div className="item" key={tag.term_id}>
                            <div className="">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                data_id={tag.id} name={tag.term_id} className="gal-tag-item" onClick={this.handleClick}  value={tag.term_id} data-toggle={'.'+tag.name}
                            >
                                {tag.name}
                            </motion.button>
                                {/* <input type="checkbox" id={tag.term_id} value={tag.term_id} name="textInput" /> */}
                            </div>
                        </div>
                    )
                }
                
            })
        )
    }
    render(){
        
        return(
            this.state.isMounted ? 
            
            <OwlCarousel className="owl-theme  galtags-slide " responsive={this.stateowl.responsive} nav={this.stateowl.nav} dots={this.stateowl.dots} loop={false}  stagePadding={this.stateowl.stagePadding} margin={this.stateowl.margin} autoWidth={this.stateowl.autoWidth} >
              {
                this.addItem()
              }
            </OwlCarousel>
            :''
        )
    }
}

export default Tagber;