import React,{ Component } from 'react';
import Page from '../../layouts/main'
import Router, {withRouter} from 'next/router'
import { withTranslation } from '../../i18n'
import { OnlineSkeleton } from "../../components/skeletion";
import {getWoocomData} from '../../services/WooService'
import LazyLoad from "react-lazyload";
import Link from "next/link";
class ProductsCatgory extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: this.props.posts,
            item: this.props.item,
            isMounted: true,
        }
    }
    
    // componentDidMount = async () =>{
    //     const data = await getWoocomData(this.props.i18n.language , 'products/categories?per_page=99')
    //     const dataAllCatgory = await getWoocomData(this.props.i18n.language , 'products/categories/213')
    //     this.setState({lang:this.props.i18n.language,isMounted: true})
    // }
    componentDidMount(){
        this.setState({lang:this.props.i18n.language })
    }
    componentWillReceiveProps = async (nextProps) => {
        if(this.state.lang !== nextProps.i18n.language){
            this.setState({ lang:this.props.i18n.language,isMounted: false})
            const data = await getWoocomData(this.props.i18n.language , 'products/categories?per_page=99')
            const dataAllCatgory = await getWoocomData(this.props.i18n.language , 'products/categories/213')
            this.setState({ posts: data,lang:this.props.i18n.language,isMounted: true, item: dataAllCatgory})
        }
    }
    Spinner=()=>{
        const {posts} = this.state
        const content = <div className="produuct-cat_item loading">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#000"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            transform="rotate(275.845 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>;
        return content;
    }
    rawMarkup(detail) {
        var rawMarkup = detail
        return { __html: rawMarkup };
    }
    Spinner=()=>{
            const content = <div className="loading">
            <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#000"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
                transform="rotate(275.845 50 50)"
            >
                <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
                />
            </circle>
            </svg>
        </div>;
        return content
    }
    bindItem=()=>{
        const {posts} = this.state
        return (
            posts.map((post,i) => {
                if(post.id != 213 && post.id != 41 && post.parent != 213 && post.image != null){
                    return (
                        <Link href="/product-category/[slug]"  as={`/product-category/${post.slug}`} passHref>
                                <div className="produuct-cat_item" key={i}>
                                    <LazyLoad once={true} height={100} offset={[-300, 100]} placeholder={this.Spinner()}>
                                        {
                                            post.image != null &&
                                            <div className="cat-img" style={{ backgroundImage: 'url('+post.image.src+')' }}></div>
                                        }
                                    </LazyLoad>
                                    <h5 dangerouslySetInnerHTML={this.rawMarkup(post.name)} />
                                </div>
                            </Link>
                    )
                }
            })
        )
    }
    render() {
        const {item, posts} = this.state
        return (
            <Page  title="Product Category " description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="/static/images/lazada.jpg" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                {
                    !this.state.isMounted ? <OnlineSkeleton /> :
                        <div className="product-page pdtop-site">
                            <div className="product-page-wrapper">
                                <div className="intro-content">
                                    <div className="intro-content_wrapper">
                                                <h1>{item.name}</h1>
                                                <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className="produuct-cat">
                                    <div className="produuct-cat_wrapper">
                                    {
                                        this.bindItem()
                                    }
                                    </div>
                                </div>
                                <div className="link-view-all">
                                        <a href="#">View all products</a>
                                </div>
                            </div>
                        </div>
                }
            </Page>
        )
        
    }

}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({params,req}) {
//     const cookies = context.req.headers.cookie;
//   var heade_xml = 'next-i18next=';
//   var index_start = cookies.indexOf(heade_xml)+ heade_xml.length;
//   var lang = cookies.substring(index_start, index_start+2);
const posts = await getWoocomData(req.language, 'products/categories?per_page=99')
const item = await getWoocomData(req.language , 'products/categories/213')
    if(isServer){
        return { props: { namespacesRequired: ['layout'],posts,item }}
    }else{
        return {props:{}}
    }
}
export default withRouter(withTranslation('layout')(ProductsCatgory));