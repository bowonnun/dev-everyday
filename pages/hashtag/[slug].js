import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Router, {withRouter} from 'next/router'
import Landing from '../../components/landing'
import Result from '../../components/resultcategory'
import { withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
// ------------ Api
import { getHashTag } from '../../services/PostService'
import Routes from 'next-routes'
// ------------ Api
class Category extends Component{
    constructor(props){
        super(props)
        this.state = {
            item : [],
            keyword : [],
            posts: this.props.posts,
            isMounted: false,
            lang:this.props.i18n.language,
        }
    }
    componentDidMount = async () =>{
        this.setState({isMounted: true})
        // const data = await getHashTag(this.props.i18n.language , Router.query.slug)
        this.setState({ posts: this.props.posts,lang:this.props.i18n.language, })
      }
    componentWillReceiveProps = async (nextProps) => {
        if(this.state.lang !== nextProps.i18n.language){
            const data = await getHashTag(this.props.i18n.language, Router.query.slug)
            this.setState({ posts: data,lang:this.props.i18n.language})
        }
    }
    render(){
        if(typeof this.props.posts === 'undefined'){
            return <Landing/>
        }else{
            return(
                <Page title={this.props.posts.name} description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic" images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                    <Result Item={this.props.posts.item} isLoading={this.state.isMounted} Name={this.props.posts.name}  categoryLink={this.props.posts.slug}  />
                </Page>
            )
        }
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({params,req}) {
    // Fetch data from external API
    let posts = await getHashTag(req.language, params.slug)
    if(isServer){
        return { props: { namespacesRequired: ['layout'],posts }}
    }else{
        return {props:{}}
    }
}
export default withRouter(withTranslation('layout')(Category));