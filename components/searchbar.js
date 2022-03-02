import React ,{Component} from 'react'
import Router, {withRouter} from 'next/router'
class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            keyword : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
    }
    handleChange(e) {
        this.setState({keyword: e.target.value});
    }
    handleSubmit(e) {
        event.preventDefault();
        Router.push({
            pathname: '/search/'+this.state.keyword,
            query: { name: this.state.keyword }
        })
    }
    render(){
        return(
            <div>
                <form className="icon-item form_search"  >
                    <i className="icon-search icon-search" aria-hidden="true"></i>
                    <input type="text" className="search" name="search" placeholder="Search.." value={this.state.value} onChange={this.handleChange}></input>
                    <i className="icon-close icon-closer" aria-hidden="true"></i>
                </form>
                <div className="search-result">
                    <div className="search-result_wrapper">
                        <a className="search-result_item" href="">Karmakamet</a>
                        <a className="search-result_item" href="">Karmakamet Secret World</a>
                        <a className="search-result_item" href="">Karmakamet Aromatic</a>
                        <a className="search-result_item" href="">Karmakamet Diner</a>
                        <a className="search-result_item" href="">Room Diffuser</a>
                        <a className="search-result_item" href="">Body Spray</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchBar