import React, { Component } from 'react'
import Links from 'next/link'


class Item extends Component {
    constructor(props) {
        super(props)
    }
    rawMarkup(item) {
        var rawMarkup = this.props.Location.item[item].excerpt
        return { __html: rawMarkup };
    }
    render() {
        const { NameLoction,Location, textMassge } = this.props

        return (
            <div className="store-sec">
                {
                    Location.item.length > 0 ? 
                    <div>
                        <div className="store-title">
                            <h1>{NameLoction}</h1>
                        </div>
                        <div className="store-mesonry">
                            {Location.item.map((location, i) => {
                                return (
                                    <div className="store-item" key={location.id}>
                                        <Links prefetch
                                            href="/store/[slug]"
                                            as={`/store/${location.slug}`} passHref>
                                            <a href="" >
                                                {
                                                    location.img_full == 'https://karmakametstudio.com/wp-content/uploads/2020/03/500x500-dummy-image.jpg' ?
                                                        <div className="store-img" style={{ backgroundImage: 'url(https://via.placeholder.com/550x350.png?text=550x350)' }}>
                                                            <img src="https://via.placeholder.com/550x350.png?text=550x350" alt="sss" className="img-responsive" />
                                                        </div>
                                                        :
                                                        <div className="store-img">
                                                            <img src={location.img_full.toString()} alt="sss" className="img-responsive" />
                                                        </div>
                                                }
                                                <div className="store-detail">
                                                    <div className="store-detail_wrapper">
                                                        <h3 className="store-name">
                                                            {
                                                                location.title.split(" ").map((value, i) => {
                                                                    if (value == "KARMAKAMET" || value == "EVERYDAY") {
                                                                        return (
                                                                            <React.Fragment key={i}>
                                                                                <br />{value}&nbsp;
                                                                            </React.Fragment>
                                                                        )
                                                                    }
                                                                    else{
                                                                        return (
                                                                            <React.Fragment  key={i}>
                                                                                {value}&nbsp;
                                                                            </React.Fragment>
                                                                        )
                                                                    }

                                                                })
                                                            }
                                                        </h3>
                                                        <span dangerouslySetInnerHTML={this.rawMarkup(i)} />
                                                    </div>
                                                </div>
                                            </a>
                                        </Links>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : 
                    <div>
                        <div className="store-title">
                            <h1>{this.props.NameLoction}</h1>
                        </div>
                        <div className="store-mesonry">
                            <div><h1>{textMassge}</h1></div>
                        </div>
                    </div>
                    
                }
            </div>
        )
    }
}
export default Item