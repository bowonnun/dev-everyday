import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Router, {withRouter} from 'next/router'
import Landing from '../../components/landing'
import Result from '../../components/resultcategory'
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
// ------------ Api
import { getCategoryTag } from '../../services/PostService'
import Routes from 'next-routes'
// ------------ Api
class Category extends Component{
    constructor(props){
        super(props)
        this.state = {
            item : [],
            keyword : [],
            posts: [],
            isMounted: false,
            lang:this.props.i18n.language,
        }
    }
    componentDidMount = async () =>{
        this.setState({isMounted: true})
        const data = await getCategoryTag(this.props.i18n.language , Router.query.slug)
        this.setState({ posts: data,lang:this.props.i18n.language,url:window.location.href })
      }
    componentWillReceiveProps = async (nextProps) => {
        if(this.state.lang !== nextProps.i18n.language){
            const data = await getCategoryTag(this.props.i18n.language, Router.query.slug)
            this.setState({ posts: data,lang:this.props.i18n.language})
        }
    }
    render(){
        
        if(typeof this.state.posts === 'undefined'){
            return <Landing/>
        }else{
            return(
                <Page title={this.props.posts.name} url={this.state.url} >
                    <Result Item={this.props.posts.item} isLoading={this.state.isMounted} Name={this.props.posts.name} categoryLink={this.props.posts.slug}  />
                </Page>
            )
        }
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({req,params}) {

    const posts = await getCategoryTag(req.language, params.slug)
    if(isServer){
        return { props: { namespacesRequired: ['layout'],posts}}
    }else{
        return {props:{}}
    }
}
export default withRouter(withTranslation('layout')(Category));