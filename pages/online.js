import React, { PureComponent } from 'react'
import Link from 'next/link';
import { getCategory } from '../services/PostService'
class Online extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            category: this.props.groupLink.item,
        }
    }
    removeTags = (str) => {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/(<([^>]+)>)/ig, '');
    }
    componentDidMount = async () => {
        // const GetCategory = await getCategory('en', '337')
        // this.setState({ category: GetCategory.item })
        // console.log(this.state.category)
        console.log(this.state)
    }
    render() {

        return (
            <div className='Linktreekmkm'>
                <div className='opening'>
                    <img className='Banner' src="/static/images/LinkThreeKmKm/logo-black.svg" alt="" />
                </div>
                <div className='wrapper'>
                    <div className='bannerPage'>
                        <img className='Banner' src="/static/images/LinkThreeKmKm/banner.png" alt="" />
                        <img className='logoKmKm' src="/static/images/LinkThreeKmKm/logo-white.svg" alt="" />
                    </div>
                    <div className='groupLink'>
                        {this.state.category.map((item) => {
                            return (
                                <a href={this.removeTags(item.content)} className='Linktreekmkm-item'>
                                    {item.title}
                                </a>
                            )
                        })}
                    </div>
                    <div className='groupSocial'>
                        <a className='Social-item' href='https://www.facebook.com/karmakamet'>
                            <img className='Banner' src="/static/images/LinkThreeKmKm/ic-Fb.svg" alt="" />
                        </a>
                        <a className='Social-item' href='https://www.instagram.com/karmakamet/'>
                            <img className='Banner' src="/static/images/LinkThreeKmKm/ic-Ig.svg" alt="" />
                        </a>
                        <a className='Social-item' href='https://lin.ee/SDF1Pdm'>
                            <img className='Banner' src="/static/images/LinkThreeKmKm/ic-Line.svg" alt="" />
                        </a>
                        <a className='Social-item' href='mailto:contact@helmetcelt.com'>
                            <img className='Banner' src="/static/images/LinkThreeKmKm/ic-gmail.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export async function getServerSideProps() {
    const GetCategory = await getCategory('en', '337')
    return {
        props: { groupLink: GetCategory },
    }
}
export default Online
