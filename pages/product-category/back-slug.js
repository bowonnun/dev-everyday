import React,{ Component } from 'react';
import Page from "../../layouts/main";
import Router, { withRouter } from "next/router";
import { withTranslation } from "../../i18n";
import { getWoocomData } from "../../services/WooService";
import LazyLoad from "react-lazyload";
import Link from "next/link";
class ProductsCatgory extends Component {
  constructor(props) {
    super(props);
  }
  Spinner = () => {
    const content = (
      <div className="hashtag-item loading">
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
      </div>
    );
    return content;
  };
    strip_tags(input, allowed) {
        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
        return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
    }
  componentDidMount = async (props) =>{
    const { slug } = this.props.router.query
    let item = ""
    if(slug == ""){
       item = await getWoocomData(
        this.props.i18n.language,
        "products/categories?parent=213&per_page=99"
      )
    }else{
       item = await getWoocomData(
        this.props.i18n.language,
        "products/categories?slug="+slug
      )
    }
  }
  render() {
    const { item } = this.props;
    return (
      <Page
        title={item[0].name}
        description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"
        images="/static/images/lazada.jpg"
        keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet "
      >
        <div className="hashtag-page pdtop-site">
          <div className="hashtag-page_wrapper">
            <a onClick={() => Router.back()} className="btn_back">
              <i className="icon-arrow-left"></i> BACK
            </a>
            <div className="hashtag-subject">
              <h1 className="hashtag-name">{item[0].name}</h1>
            </div>
            <div className="hashtag-mesonry">
              {item[0].item.map((item, i) => {
                return (
                    <div className="hashtag-item" key={i}>
                    <Link href="/product/[slug]" as={`/product/${item.slug}`} passHref>
                      <a href="">
                        <LazyLoad once={true} >
                        <div className="hashtag-img">
                            <img src={item.featured_image_thumbnail_url} alt=""  style={{opacity:1}} />
                        </div>
                        <div className="hash-des">
                                <div className="all-tags">
                                    {item.tag_names != null ?
                                        item.tag_names.map((tag_names, i) => {
                                            return (
                                                <small className="hash-tags" key={i}>
                                                    {tag_names}
                                                    
                                                </small>
                                            )
                                        }) : ''
                                    }
                                </div>
                                <h2 className="hash-title">{item.name}</h2>
                                <p className="hash-content" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.short_description, '<a>') }} />
                        </div>
                        </LazyLoad>
                      </a>
                      </Link>
                    </div>
                )
              })}
            </div>
          </div>
        </div>
      </Page>
    )
  }
}
const isServer = () => typeof window === "undefined";
export async function getServerSideProps({ params, req }) {
  // const cookies = context.req.headers.cookie;
  // var heade_xml = 'next-i18next=';
  // var index_start = cookies.indexOf(heade_xml)+ heade_xml.length;
  // var lang = cookies.substring(index_start, index_start+2);
  let item = ""
  if(params.slug != null){
     item = await getWoocomData(
      req.language,
      "products/categories?slug="+params.slug
    );
  }else{
    item = await getWoocomData(
      req.language,
      "products/categories"
    );
  }
  
  
  if (isServer) {
    return { props: { namespacesRequired: ["layout"], item } };
  } else {
    return { props: {} };
  }
}
export default withRouter(withTranslation("layout")(ProductsCatgory));
