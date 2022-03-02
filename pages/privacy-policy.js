import React,{ Component } from 'react';
import Page from '../layouts/main'
import { withTranslation } from '../i18n'
import { getPage } from '../services/PostService'
import { TermsPrivacySkeleton } from "../components/skeletion";
class privacyPolicy extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts : this.props.posts
        }
    }
    componentDidMount = async () =>{
        this._isMounted = true;
        if(this.props.i18n.language == 'th'){
        this.setState({posts: this.props.poststh})
        }else{
        this.setState({posts: this.props.posts})
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentWillReceiveProps = async (nextProps) => {
        if(this.state.lang !== nextProps.i18n.language){
            if(nextProps.i18n.language == 'th'){
                this.setState({posts: this.props.poststh,lang:this.props.i18n.language})
            }else{
                this.setState({posts: this.props.posts,lang:this.props.i18n.language})
            }
        }
    }
    rawMarkup(){
        var rawMarkup = this.state.posts.content.rendered
        return { __html: rawMarkup };
    }
    render(){
        const {posts} = this.state;
        return(
            <Page  title="Privacy Policy" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                {
                    posts != null ?
                    <section dangerouslySetInnerHTML={this.rawMarkup()} />
                    : <TermsPrivacySkeleton/>
                }
            </Page>
        )
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({params,req}) {
    // Fetch data from external API
    let posts = await getPage('en', 'privacy-policy')
    let poststh = await getPage('th', 'privacy-policy')
    if(isServer){
        return { props: { namespacesRequired: ['layout'],posts,poststh }}
    }else{
        return {props:{}}
    }
}
export default withTranslation('layout')(privacyPolicy);