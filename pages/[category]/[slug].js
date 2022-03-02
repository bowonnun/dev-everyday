import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Router, {withRouter} from 'next/router'
import { i18n,withTranslation } from '../../i18n'
import { getSlug, getPostTotal } from '../../services/PostService'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Link from 'next/link';
import { FacebookShareButton } from "react-share";
import { EditorialSkeleton } from "../../components/skeletion";
class Slug extends Component{
    constructor(props){
        super(props);
        this.state = {
                isMounted: false,
                lang:'',
                data: null,
            }
}
componentDidMount = async () =>{
    this.setState({isMounted: true ,url:window.location.href})
}
 parseHtmlEntities(str) {
        return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
            var num = parseInt(numStr, 10); // read num as normal number
            return String.fromCharCode(num);
        });
    }
// componentDidMount = async () =>{
//     const data = await getSlug(this.props.i18n.language, Router.query.slug)
//     this.setState({ posts: data,lang:this.props.i18n.language,isMounted: true ,url:window.location.href})
// }
// componentWillReceiveProps = async (nextProps) => {
//     if(this.state.lang !== nextProps.i18n.language){
//         this.setState({ posts: null,lang:this.props.i18n.language })
//         const data = await getSlug(this.props.i18n.language, Router.query.slug)
//         this.setState({ posts: data,lang:this.props.i18n.language })
//     }
// }
rawMarkup(){
    var rawMarkup = this.props.data.content
    return { __html: rawMarkup.replace(/\n/g, '<br />') };
}
render(){
    const { data } = this.props;
    return(
        <Page title={data.title} description={data.content.replace(/<[^>]*>?\r?\n?/gm, '')} url={this.state.url} images={data.featured_image_thumbnail_url} keywords={data.excerpt}>
            {data != null ?
            <div className="editorial-page pdtop-site">
                {
                    data.img_gallery.length == 0 ? 
                        <div className="editorial_left"  
                        style={{backgroundImage: 'url('+ data.featured_image_thumbnail_url+')'}}
                        data-spy="affix" data-offset-top="100">
                            <div className="edgroup-icon">
                                <a className="ed-icon_item" href="">{this.props.t('share-label')}:</a>
                                <FacebookShareButton url={this.state.url} ><a className="ed-icon_item icon-facebook" href=""></a></FacebookShareButton>
                            </div>
                            <a onClick={() => Router.back()}  className="edgroup-btnback">
                                <i className="icon-arrow-left"></i>
                                <p className="btnback-text">{this.props.t('back-label')}</p>
                            </a>
                            {/* <div className="edgroup-btn">
                                <a className="ed-btn_item" href="">{this.props.t('shop-label')}</a>
                            </div> */}
                        </div>
                    
                   : data.img_gallery.map((img , i) => {
                        return (
                            <div className="editorial_left"  
                            style={{backgroundImage: 'url('+ img.full+')'}}
                            data-spy="affix" data-offset-top="100" key={i}>
                                <div className="edgroup-icon">
                                    <p>{this.props.t('share-label')}:</p>
                                    <FacebookShareButton url={this.state.url} ><a className="ed-icon_item icon-facebook" href=""></a></FacebookShareButton>
                                </div>
                                <a onClick={() => Router.back()}  className="edgroup-btnback">
                                    <i className="icon-arrow-left"></i>
                                    <p className="btnback-text">{this.props.t('back-label')}</p>
                                </a>
                                {/* <div className="edgroup-btn">
                                    <a className="ed-btn_item"href="">{this.props.t('shop-label')}</a>
                                </div> */}
                            </div>
                        )
                    })
                }
                
                <div className="editorial_right">
                    <div className="ed-right_wrapper">
                        <div className="ed-title">
                            <div className="marquee-title">
                                <h1>{this.parseHtmlEntities(data.title)}</h1>
                            </div>
                        </div>
                        <div className="edbox-detail">
                            <div className="box-item">
                                <h5 className="box-item_title">{this.props.t('date-label')}</h5>
                            <p  className="box-item_subtitle"><Moment date={data.date} format="DD MMM YYYY" /></p>
                            </div>
                            <div className="box-item box-group_cat">
                                <h5 className="box-item_title">{this.props.t('categories-label')}</h5>
                                <Link  href={`/category/[slug]`} as={`/category/${data.category_slug}`}>
                                    <a className="box-item_subtitle">
                                        {data.category}
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="ed-content">
                            <span dangerouslySetInnerHTML={this.rawMarkup()} />
                        </div>
                        <div className="edbox-tag">
                            
                        {data.tags_slugall.map((tag,i) => {
                            return (
                            <Link href={`/hashtag/[slug]`} as={`/hashtag/${tag.slug}`} key={i} passHref>
                            <a href="" className="tag-item" key={i}>
                                <p className="tag-item_inner">{tag.name}</p>
                            </a>
                            </Link>)
                        })}
                        </div>
                    </div>
                </div>
            </div>
            
            : <EditorialSkeleton/>
        }
        </Page> 
        )
    }
}
Slug.propTypes = {
    t: PropTypes.func.isRequired,
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({params,req}) {
    // Fetch data from external API
    let data = await getSlug(req.language, params.slug)
    if(isServer){
        return { props: { namespacesRequired: ['layout'],data }}
    }else{
        return {props:{}}
    }
    
    
}

// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
    
//     const datas = await getPostTotal('en','')
//     const paths = datas.map((data,i) => ({
//         params: { category: data.category_slug, slug: data.slug },
//     }))
//     return { paths, fallback: false }
//   }
// export async function getStaticProps({params}) {
//     const data = await getSlug('en', params.slug)
//     return {
//       props: { data },
//     };
// }

export default withRouter(withTranslation('layout')(Slug));