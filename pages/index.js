import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '../layouts/main'
import Banner from '../components/Banner/banner'
import Boxcategory from '../components/Banner/boxcategory'
import Boximagesonly from '../components/Banner/boximagesonly'
import firebase from '../services/FirebaseService'
import { getPost, getCategory } from '../services/PostService'
import { withTranslation } from '../i18n'
import style from '@/sass/banner.module.scss'
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      dataAll: [],
      dataCategory: [],
      isLoading: true,
      isLoadingBanner: false,
      isLoadingEvent: false,
      isMounted: false,
    }
  }
  componentDidMount = async () =>{
    let _ = this;
    const { layoutData } = this.props
    if(this.props.i18n.language == 'th'){
      
      this.setState({isMounted: true,dataCategory: this.props.dataCategoryThai})
    }else{
      
      this.setState({isMounted: true,dataCategory: this.props.dataCategory})
    }
  }
  componentWillReceiveProps = async (nextProps) => {
    if(this.state.lang !== nextProps.i18n.language){
        if(nextProps.i18n.language == 'th'){
          this.setState({ dataCategory: this.props.dataCategoryThai,lang:this.props.i18n.language})
        }else{
          this.setState({ dataCategory: this.props.dataCategory,lang:this.props.i18n.language})
        }
    }
}
  bindLayout = () =>{
    const { layoutData } = this.props
    const { dataCategory } = this.state
      const layout =  layoutData.map((data,i)  => {
      if(data.type == 1){
        return <Boxcategory  key={data.id}  title={data.title} col={data.column} theme={data.theme} dataAll={dataCategory[i]} categoryAll={dataCategory[i][0].category_slug} categoryId={data.categoryid} category={data.hashtag}  mode={data.mode} margin="35" />
      }
      else if(data.type == 2){
        return <Boximagesonly key={data.id}  title={data.title} col={data.column} theme={data.theme} dataAll={dataCategory[i]} categoryAll={dataCategory[i][0].category_slug}  mode={data.mode} margin="0"  products={data.images} /> 
      }
      
    })
    return layout;
    
    
  }
  render() {
    return (
      <Page title="Karmakamet " description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic" images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
        <div className={style.banner_container}>
          <div className={style.banner_wraper} >
            <div className={style.logo_cicle} >
              <img className={style.logo_circle_item} src="/static/images/icon-logo/LOGO_circle.png" alt="" />
            </div>
            {
              <Banner banners={this.props.banner} linkroute="mainIndex" />
            }
          </div>
        </div>
        <section>
            {this.state.isMounted && this.bindLayout()}
        </section>
      </Page>
    )
  }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({req}) {
  const lang = req
  let firestore = firebase.firestore();
  let banner = []
  let layoutData = []
  const bannerData = await firestore.collection("banners").orderBy('index','asc').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        banner.push({
            id:doc.id,
            type:doc.data().type,
            status:doc.data().status,
            images:doc.data().imageDesktop,
            imagesmoblie:doc.data().imageMoblie,
            slug:doc.data().slug
          });
      });
  });
  const layout = await firestore.collection("layouts").orderBy('index','asc').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      layoutData.push({
            id:doc.id,
            type:doc.data().type,
            title:doc.data().title,
            column:doc.data().column,
            theme:doc.data().theme, //left full
            categoryid:doc.data().categoryid,
            hashtag:doc.data().hashtag,
            images:doc.data().images,
            mode:doc.data().mode //drark light
        });
    });
  });
  const dataCategory =  await Promise.all(
    layoutData.map(async (data)  => {
      const dataCat = await getPost('en', data.categoryid)
      return dataCat
    })
  )
  const dataCategoryThai =  await Promise.all(
    layoutData.map(async (data)  => {
      const dataCat = await getPost('th', data.categoryid)
      return dataCat
    })
  )
  
  // if(lang != null){
  //     const data = await getSlug(req.language, req.params.slug)
  //     return {data}
  // } 
  if(isServer){
    return { props: { namespacesRequired: ['layout'],banner,layoutData,dataCategory,dataCategoryThai }}
  }else{
    return {props:{}}
  }
}
Homepage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('layout')(Homepage)