import React,{ Component } from 'react';
import Page from '../../layouts/main'
import dynamic from 'next/dynamic';
import Router, { withRouter } from 'next/router'
import { StDetailSkeleton } from "../../components/skeletion";
import Boxstore from "../../components/Banner/banner-store";
import { i18n,withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import { getLocationSlug } from '../../services/LocationService'
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});
class StoreSlug extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        isMounted: false,
        locations: null,
        lang: '',
        script: [
            { id: 1, src: "https://code.jquery.com/jquery-3.2.1.slim.min.js" },
            { id: 2, src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" },
            { id: 3, src: "/static/js/owl.carousel.min.js" },
            { id: 4, src: "/static/js/magic-grid.min.js" },
            { id: 5, src: "/static/js/main.js" }
        ]
    }
    stateowl = {
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        }

    }
    componentDidMount = async () => {
        this.setState({ isMounted: true, url:window.location.href })
    }
    rawMarkup(datail) {
        var rawMarkup = datail
        return { __html: rawMarkup };
    }
    render() {
        const { locations } = this.props;
        if (locations == null) {
            return (
                <Page>
                    <div className="st-detail-page pdtop-site">
                        <StDetailSkeleton />
                    </div>

                </Page>
            )
        }
        else {
            
            return (
                <Page  title={locations.title} description={locations.content.replace(/<[^>]*>?\r?\n?/gm, '')} url={this.state.url} images={locations.img_gallery[0].thumb} keywords={locations.excerpt} >
                    <div className="st-detail-page pdtop-site">
                        <div className="st-detail-page_wrapper">
                            <a onClick={() => Router.back()} className="btn_back">
                                <i className="icon-arrow-left"></i> {this.props.t('back-label')}
                            </a>
                            <div className="st-detail_name">
                                <h1>
                                    {
                                        
                                        locations.title.split(" ").map((value,i)=>{
                                            const count = i;
                                            const lastIndex = count - 1;
                                            
                                            if(value == "KARMAKAMET" || value == "EVERYDAY"){
                                                
                                                
                                                return(
                                                    <React.Fragment key={i}>
                                                           <br/>{value}&nbsp; 
                                                    </React.Fragment>
                                                )
                                            }
                                            else{
                                                if(locations.title.split(" ").length !== i+1){
                                                    return (
                                                        <React.Fragment  key={i}>
                                                            {value}&nbsp;
                                                        </React.Fragment>
                                                    )
                                                }else{
                                                    return (
                                                        <React.Fragment  key={i}>
                                                            {value} 
                                                        </React.Fragment>
                                                    )
                                                }
                                                
                                            }
                                        })
                                    }
                                </h1>
                            </div>
                            <div className="st-detail_block">
                                <Boxstore banners={locations.img_gallery} single={locations} />
                                <div className="st-detail_content" dangerouslySetInnerHTML={this.rawMarkup(locations.content)} />
                            </div>
                        </div>
                    </div>
                </Page>
            )
        }
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({req,params}) {
    const locations = await getLocationSlug(req.language, params.slug)
    if(isServer){
        return { props: { namespacesRequired: ['layout'],locations }}
    }else{
        return {props:{}}
    }
}
// const isServer = () => typeof window === 'undefined'
// export async function getServerSideProps(context) {
//     const cookies = context.req.headers.cookie;
//     var heade_xml = 'next-i18next=';
//     var index_start = cookies.indexOf(heade_xml)+ heade_xml.length;
//     var lang = cookies.substring(index_start, index_start+2);
//     const locations = await getLocationSlug(lang, context.params.slug)
//     if(isServer){
//         return { props: { namespacesRequired: ['layout'],locations }}
//     }else{
//         return {props:{}}
//     }
// }

StoreSlug.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withRouter(withTranslation('layout')(StoreSlug));