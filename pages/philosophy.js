import React,{ Component } from 'react';
import Page from '../layouts/main'
import Banner from '../components/Banner/banner'
import AOS from 'aos';
import { withTranslation } from '../i18n'
import { getPage } from '../services/PostService'


class Philosophy extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts : {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                }
            }
        }
    }
    componentDidMount = async () =>{
        AOS.init();
        AOS.refresh();
        this.setState({
            isMounted: true,
            banners: [
                { id: 1, images: "/static/images/2Y0A2772-2.JPG", imagesmoblie: "/static/images/2Y0A2772-2.JPG" },
                { id: 2, images: "/static/images/2Y0A2772-2.JPG", imagesmoblie: "/static/images/2Y0A2772-2.JPG" },
            ]
        })
        const data = await getPage(this.props.i18n.language,'philosophy')
        this.setState({posts: data,lang:this.props.i18n.language })
    }
    componentWillReceiveProps = async (nextProps) => {
        if(this.state.lang !== nextProps.i18n.language){
            this.setState({ posts: null,lang:this.props.i18n.language })
            const data = await getPage(this.props.i18n.language,'philosophy')
            this.setState({ posts: data,lang:this.props.i18n.language })
        }
    }
    rawMarkup(){
        var rawMarkup = this.state.posts.content.rendered
        return { __html: rawMarkup };
    }
    render() {
        const {posts} = this.state;
        return(
            <Page  title="Philosophy" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromati"  images="/static/images/2Y0A2772-2.JPG" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
            
                <section>
                <div className="philo-page pdtop-site">
                    <div className="philo-page-wrapper">
                        <Banner banners={this.state.banners} linkroute="philo" />
               { posts != null ?
                <section dangerouslySetInnerHTML={this.rawMarkup()} />
                : '...Loaging'
}
                </div>
                    </div>
                </section>
            
            </Page>
        )
    }
}
export default withTranslation('layout')(Philosophy);