import React,{ Component } from 'react';
import Page from '../layouts/main'
import { withTranslation } from '../i18n'
import { getHistory } from '../services/PostService'
import { HistorySkeleton } from "../components/skeletion";
class History extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        isMounted: false,
        locations: [],
        lang: '',
        script: [
            { id: 5, src: "/static/js/main-history.js" }
        ]
    }
    _isMounted = false;
    addscript() {
        this.state.script.forEach(element => {
            const script = document.createElement("script");
            script.src = element.src;
            script.async = true;
            document.body.appendChild(script);
            document.body.removeChild(script);
        });
    }
    componentDidMount = async () => {
        this._isMounted = true;
        this.setState({ isMounted: true })
        
        const data = await getHistory(this.props.i18n.language)
        if (this._isMounted) {
        this.setState({ posts: data, lang: this.props.i18n.language })
        }
        this.addscript()
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    componentWillReceiveProps = async (nextProps) => {
        if (this.state.lang !== nextProps.i18n.language) {
            this.setState({ posts: null, lang: this.props.i18n.language })
            const data = await getHistory(this.props.i18n.language)
            this.setState({ posts: data, lang: this.props.i18n.language })
        }
    }
    rawMarkup(detail) {
        var rawMarkup = detail
        // return { __html: rawMarkup.replace(/<[^>]*>?/gm, '')};
        return { __html: rawMarkup };
    }
    render() {
        return (
            // <Page>
            //     <div className="history-page pdtop-site">
            //         <div className="history-page-wrapper">
            //             <HistorySkeleton />
            //         </div>
            //     </div>
            // </Page>
            <Page  title="History" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                <section>
                    <div className="history-page pdtop-site">
                        <div className="history-page-wrapper">
                        {
                            this.state.posts == null ? <HistorySkeleton/>:
                            this.state.isMounted &&
                            this.state.posts.map((post, i) => {
                                return(
                                    <div className="timeline-group" key={i}>
                                        <div className="year_wrapper">
                                            <h1 className="year_item">{post.title_header}</h1>
                                        </div>

                                        <div className="img-1_wrapper">
                                            {
                                                post.featured_media_url == null ? '' : <img src={post.featured_media_url} className="img-1_item" alt='Mr.Natthorn1' />
                                            }

                                        </div>
                                        <div className="content-1_wrapper">
                                            <h3  className="content_item" dangerouslySetInnerHTML={this.rawMarkup(post.title_content)} />
                                        </div>
                                        <div className="content-2_wrapper">
                                            <p className="content_item" dangerouslySetInnerHTML={this.rawMarkup(post.second_content)}  />
                                        </div>
                                        <div className="img-2_wrapper">
                                            {
                                                post.featured_media_url_2.map((post, i) => {
                                                    return <img src={post.full} className="img-2_item" alt='Mr.Natthorn1' key={i} />
                                                })
                                            }

                                        </div>
                                    </div>

                                )
                            })
                        }

                        </div>
                        <div className="group-progress">
                            <div className="progress-width" />
                            <div className="group-progress-timeline">
                                <ul className="progress-timeline">
                                {
                                    this.state.posts == null ? '':
                                    this.state.isMounted &&
                                    this.state.posts.map((post, i) => {
                                        if(post.title_header != ''){
                                            return(
                                            
                                            <li className="target" key={i} >{post.title_header}</li>
                                        )
                                        }
                                        else{
                                            return( <li className="target" key={i} ></li> )
                                        }
                                        
                                    })
                                }

                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </Page>
        )
    }
}
export default withTranslation('layout')(History);