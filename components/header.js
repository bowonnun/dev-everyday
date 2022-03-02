import React, {Component,useContext} from 'react';
import Nav from '../components/nav'
import Router, {withRouter} from 'next/router'
import Iconcart from '../components/iconcart'

class Header extends Component{
    constructor(props){
        
        super(props)
        this.state = {
            keyword : '',
            script : [
                { id: 1, src : "https://code.jquery.com/jquery-3.2.1.slim.min.js" },
                { id: 2, src : "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" },
                { id: 3, src : "/static/js/owl.carousel.min.js" },
                { id: 4, src : "/static/js/magic-grid.min.js" },
                { id: 5, src : "/static/js/main.js" }
              ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.state.script.forEach(element => {
            const script = document.createElement("script");
            script.src = element.src;
            script.async = true;
            document.body.appendChild(script);
            document.body.removeChild(script);
        });
        
    }
    handleChange(e) {
        this.setState({keyword: e.target.value});
    }
    handleSubmit(e){
        Router.push({
            pathname: '/search/'+this.state.keyword,
            query: { 
                name: this.state.keyword,
            },
        },'/search/'+this.state.keyword);
    }
    render(){
        return(
            <header>
                <Nav  handleSubmi={this.handleSubmit} handleChange={this.handleChange}  />
                {/* <Iconcart /> */}
            </header>
        )
    }
}
export default withRouter(Header)