import React, { Component } from 'react'
import  Link  from 'next/link'
import Router, { withRouter } from 'next/router'
import LazyLoad from "react-lazyload";
import Images from 'next/image'
class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            script: [
                { id: 1, src: "https://code.jquery.com/jquery-3.2.1.slim.min.js" },
                { id: 2, src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" },
                { id: 3, src: "/static/js/owl.carousel.min.js" },
                { id: 4, src: "/static/js/magic-grid.min.js" },
                { id: 5, src: "/static/js/main.js" }
            ]
        }
    }

    strip_tags(input, allowed) {
        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
        return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
    }
    
    Spinner=()=>{
            const {posts} = this.state
            const content = <div className="hashtag-item loading">
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
    addItems() {
        const { Item, isLoading, textMassge } = this.props
        if (isLoading == true) {
            this.addscript()
            return (
                <div>
                    <div className="hashtag-subject">
                        <h1 className="hashtag-name">Search Result : {Router.query.slug}</h1>
                    </div>

                    <div className="hashtag-mesonry">
                        {
                            
                            Item.length > 0 ?
                                Item.map((item, i) => {
                                    if(item.type_api === 'post' && item.featured_image_thumbnail_url_size[0] != undefined){
                                        return (
                                            <LazyLoad
                                                key={item.id}
                                                height={100}
                                                offset={[-300, 100]}
                                                placeholder={this.Spinner()}
                                            >
                                            <div className="hashtag-item" key={item.id}>
                                                <Link
                                                    href="/[category]/[slug]"
                                                    as={`/${item.category_slug}/${item.slug}`} passHref>
                                                    <a href="">
                                                        <LazyLoad once={true} >
                                                        <div className="hashtag-img">
                                                            <Images className="img_search" src={item.featured_image_thumbnail_url_size[0]} layout="responsive" width={item.featured_image_thumbnail_url_size[1]} height={item.featured_image_thumbnail_url_size[2]} objectFit="contain" sizes="100vw" objectPosition="top"  style={{opacity:1 +'!important'}} />
                                                        </div>
                                                        </LazyLoad>
                                                        
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
                                                            <h2 className="hash-title" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.title, '<a>') }} />
                                                            {item.tag_names != null ?
                                                            <p className="hash-content" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.excerpt, '<a>') }} />:''}
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                            </LazyLoad>
                                        )
                                    }else if(item.type_api === 'product' && item.images[0] != undefined){
                                        return (
                                            <LazyLoad
                                                key={item.id}
                                                height={0}
                                                offset={[-100, 100]}
                                                placeholder={this.Spinner()}
                                            >
                                            <div className="hashtag-item" key={item.id}>
                                                <Link
                                                    href="/product/[slug]"
                                                    as={`/product/${item.slug}`} passHref>
                                                    <a href="">
                                                        <LazyLoad once={true} >
                                                            {item.images != null ?
                                                                <div className="hashtag-img">
                                                                    <img src={item.images[0].src} alt={item.images[0].src} title={item.images[0].name}  style={{opacity:1}} />
                                                                </div>: ''
                                                            }
                                                        </LazyLoad>
                                                        <div className="hash-des">
                                                            <div className="all-tags">
                                                                {item.categories != null ?
                                                                    item.categories.map((cat, i) => {
                                                                        return (
                                                                            <small className="hash-tags" key={i}>
                                                                                {cat.name}
                                                                            </small>
                                                                        )
                                                                    }) : ''
                                                                }
                                                            </div>
                                                            <h2 className="hash-title">{item.name}</h2>
                                                            {item.description != null ?
                                                            <p className="hash-content" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.description, '<a>') }} />:''}
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                            </LazyLoad>
                                        )
                                    }
                                    

                                }):
                                <div className="cannotfinde">{textMassge}</div>
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="hashtag-subject">
                    <h1 className="hashtag-name">Loading</h1>
                </div>
            )
        }
    }
    addscript() {
        this.state.script.forEach(element => {
            const script = document.createElement("script");
            script.src = element.src;
            script.async = true;
            document.body.appendChild(script);
            document.body.removeChild(script);
        });
    }
    render() {
        const { Item } = this.props
        return (
            <section>
                <div className="hashtag-page pdtop-site" style={{ overflow: 'hidden' }}>
                    <div className="hashtag-page_wrapper">
                        <a onClick={() => Router.back()} className="btn_back">
                            <i className="icon-arrow-left"></i> BACK
                        </a>
                        {this.addItems()}
                    </div>
                </div>
            </section>
        )
    }
}
export default withRouter(Result)