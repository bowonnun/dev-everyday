import React, { Component } from 'react'
import Link  from 'next/link'
import Router, { withRouter } from 'next/router'
import { HashtagSkeleton } from "../components/skeletion";
import {i18n, withTranslation } from '../i18n'
import LazyLoad from "react-lazyload";
class ResultC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }

    strip_tags(input, allowed) {
        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
        return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
    }
    Spinner=()=>{
        const {posts} = this.state
        const content = <div className="store-item loading">
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
        const { Item, isLoading, Name, categoryLink } = this.props
        if (isLoading == true) {
            return (
                this.props.Item == null ? <HashtagSkeleton /> :
                    <div>
                        <div className="hashtag-subject">
                            <h1 className="hashtag-name">#{Name}</h1>
                        </div>
                        <div className="hashtag-mesonry">
                            {
                                Item.map((item, i) => {
                                    return (
                                        <LazyLoad
                                            key={item.id}
                                            height={100}
                                            offset={[-300, 100]}
                                            placeholder={this.Spinner()}
                                        >
                                        <div key={item.id} className="hashtag-item">
                                            <Link
                                                href={`/[category]/[slug]`}
                                                as={`/${categoryLink}/${item.slug}`} passHref>
                                                <a href="">
                                                    <LazyLoad once={true}>
                                                        <div className="hashtag-img">
                                                            <img src={item.featured_image_thumbnail_url} alt="" style={{opacity:1}} />
                                                        </div>
                                                    </LazyLoad>
                                                    <div className="hash-des">
                                                        <div className="all-tags">
                                                            {
                                                                item.tag_names.map((tag, i) => {
                                                                    return (
                                                                        <small className="hash-tags" key={i}>
                                                                            {tag}
                                                                        </small>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <h2 className="hash-title" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.title, '<a>') }} />
                                                        <p className="hash-content" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.excerpt, '<a>') }} />
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        </LazyLoad>
                                    )
                                })
                            }
                        </div>
                    </div>
            )
        }
        else {
            return (
                <div className="hashtag-subject">
                    <h1 className="hashtag-name">Loading....</h1>
                </div>
            )
        }
    }
    render() {
        const {router,title}=this.props
        return (
            <section>
                <div className="hashtag-page pdtop-site" style={{ overflow: 'hidden' }}>
                    <div className="hashtag-page_wrapper">
                        <a onClick={() => Router.back()} className="btn_back">
                            <i className="icon-arrow-left"></i> {this.props.t('back-label')}
                        </a>
                        {this.addItems()}
                    </div>
                </div>
            </section>
        )
    }
}

export default withTranslation('layout')(withRouter(ResultC));