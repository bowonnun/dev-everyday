import React,{ Component } from "react";
import Page from '../layouts/main'
import { withTranslation } from '../i18n'
import { getPage } from '../services/PostService'
import { AboutusSkeleton } from "../components/skeletion";

class Aboutus extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Page  title="About Us" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"  images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
                
            </Page>
        )
    }
}
const isServer = () => typeof window === 'undefined'
export async function getServerSideProps({params,req}) {
    // Fetch data from external API
    let posts = await getPage('en', 'aboutus')
    let poststh = await getPage('th', 'aboutus')
    if(isServer){
        return { props: { namespacesRequired: ['layout'],posts,poststh }}
    }else{
        return {props:{}}
    }
}
export default withTranslation('layout')(Aboutus);