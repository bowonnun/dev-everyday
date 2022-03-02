import React, {Component} from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SkeletonSection ,TitlesecSkeleton ,NamesecSkeleton} from "../../components/skeletion";
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
// ------------ Api
import Router,{withRouter} from 'next/router'
// ------------ Api

import styles from '@/sass/boxcategory.module.scss'
import Images from 'next/image'

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

class Boxcategory extends Component {
    constructor(props){
        super(props);
    }
    state = {
        isMounted: true,
        dataAll:this.props.dataAll,
        lang:''
        
    }
    stateowl = {
        margin: 35,
        nav: true,
        stagePadding: 60,
        dots: true,
        responsive: {
            0: {
                stagePadding: 20,
                items: 1,
                autoHeight:true
            },
            768: {
                items: 2
            },
            1200: {
                items: this.props.col,
            }
        }
    }
    componentDidMount = async () => {
        this.setState({isMounted: true})
    }
    
    rawMarkup(detail){
        var rawMarkup =  detail
        return { __html: rawMarkup.replace(/<[^>]*>?/gm, '')};
    }
    parseHtmlEntities(str) {
        return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
            var num = parseInt(numStr, 10); // read num as normal number
            return String.fromCharCode(num);
        });
    }
    render(){
        const {title,col,theme,mode,category,margin,tags,titleName,detail,categoryId,categoryAll,dataAll} = this.props;
        return(
            <div className={"wrap-section " + (this.props.mode == 'dark' ? 'bg-dark': '')} style={{borderBottom: '1px solid #77777A'}}>
                {
                    theme === "left" &&
                    <div className={styles.name_section + ' name_section'}  style={{borderRight: '1px solid #77777A'}}>
                        {categoryAll.length == 0 ? <NamesecSkeleton/> :
                        <Link href={`/category/[slug]`} as={`/category/${categoryAll}`} passHref>
                             <a href="">
                                {category}
                            </a>
                        </Link>
                           }
                    </div>
                }
                <div className={styles.slide_section + ' slide_section'}>
                { dataAll == 0 ? <TitlesecSkeleton/>: <h1 className={styles.tile_sec}>{this.parseHtmlEntities(title)}</h1>}
                  {
                    dataAll.length == 0 ?
                       <SkeletonSection/>
                    :
                    this.state.isMounted &&
                    <OwlCarousel className="owl-theme  slide-item" responsive={this.stateowl.responsive} margin={parseInt(margin)} loop={false} nav={false} stagePadding={60} dots={true} autoWidth={(this.props.autowidth == 'true' ? true : false)} > 
                          {
                              dataAll.map((post, i) => {
                                  return (
                                      <div className={styles.item +"  item hov-boxshadow my-3" + (this.props.autowidth == 'true' ? styles.item_autowidth:'')} key={post.id}>
                                        <Link href={`/[category]/[slug]`} as={`/${categoryAll}/${post.slug}/`} passHref>
                                          <a href="">
                                              
                                            <div  className={styles.wrap_img}>
                                                <div className={styles.img_item}>
                                                    {/* <Images src={post.featured_image_thumbnail_url[0]} layout="responsive" width={post.featured_image_thumbnail_url[1]} height={post.featured_image_thumbnail_url[2]} objectFit="cover" sizes="100vw" objectPosition="top" /> */}
                                                    <Images src={post.featured_image_thumbnail_url_size[0]} layout="responsive" width={post.featured_image_thumbnail_url_size[1]} height={post.featured_image_thumbnail_url_size[2]} objectFit="contain" sizes="100vw" objectPosition="top" />
                                                </div>
                                            </div>
                                            <div className={styles.des + ' des'}>
                                                <div className={styles.all_tag} >
                                                {
                                                    post.tag_names.map((tag,i) => {
                                                    return (
                                                        <small className={styles.des_tags} key={i}>
                                                            {tag}
                                                        </small>
                                                    )})
                                                }
                                                </div>
                                                <h2 className={styles.des_title} >{this.parseHtmlEntities(post.title)} </h2>
                                                <div className={styles.des_content} dangerouslySetInnerHTML={this.rawMarkup(post.excerpt)} />
                                            </div>
                                            </a>
                                        </Link>
                                    </div>
                                  )
                              })
                          }
                    </OwlCarousel> 
                  }
                </div>
            </div>
        )
    }
}
Boxcategory.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(withRouter(Boxcategory));