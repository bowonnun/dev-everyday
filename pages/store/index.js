import React,{ Component } from "react";
import Page from "../../layouts/main";
import { i18n,withTranslation } from "../../i18n";
import PropTypes from "prop-types";
import { getLocation } from "../../services/LocationService";
import { StoreSkeleton } from "../../components/skeletion";
import LazyLoad from "react-lazyload";
import Links from "next/link";
import Images from "next/image"
class Store extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isMounted: false,
    locations: [
      {
        item: [],
      },
    ],
    lang: "",
    textmassge: "Loading",
  };

  componentDidMount = async () => {
    if (this.props.locations.length == 0) {
      this.setState({
        isMounted: true,
        textmassge: this.props.t("cannotfindd-label"),
      });
    } else {
      this.setState({ isMounted: true, textmassge: "Loading..." });
    }
  };
  // componentWillReceiveProps = async (nextProps) => {
  //   if (this.state.lang !== nextProps.i18n.language) {
  //     this.setState({ locations: [], lang: this.props.i18n.language })
  //     const data = await getLocation(this.props.i18n.language)
  //     this.setState({ locations: data, lang: this.props.i18n.language })
  //   }
  // }
  rawMarkup(detail) {
    var rawMarkup = detail;
    return { __html: rawMarkup };
  }
  Spinner = () => {
    const { posts } = this.state;
    const content = (
      <div className="store-item loading">
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
      </div>
    );
    return content;
  };
  render() {
    const { locations } = this.props;
    return (
      <Page
        title="Store Karmakamet"
        description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"
        images="https://karmakametstudio.com/wp-content/uploads/2020/03/kmkm-Rush2.jpg"
        keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet "
      >
        <section>
          <div className="store-page pdtop-site">
            <div className="store-sec">
              {!this.state.isMounted ? (
                <StoreSkeleton />
              ) : locations.length > 0 ? (
                locations.map((location, i) => {
                  if(location.item.length != 0){
                    return (
                      <div
                        key={i}
                        className="store-mesonr"
                        style={{ overflow: "hidden" }}
                      >
                        <div className="store-title">
                          <h1>{location.name}</h1>
                        </div>

                        <div className="padding">
                          <div id="grid" data-columns>
                            {location.item.map((dataStore, i) => {
                              return (
                                <div className="store-item" key={i}>
                                  <Links
                                    prefetch
                                    href={`/store/[slug]`}
                                    as={`/store/${dataStore.slug}`}
                                    passHref
                                  >
                                    <a href="">
                                      {dataStore.img_full ==
                                      "https://karmakametstudio.com/wp-content/uploads/2020/03/500x500-dummy-image.jpg" ? (
                                        <div
                                          className="store-img"
                                          style={{
                                            backgroundImage:
                                              "url(https://via.placeholder.com/550x350.png?text=550x350)",
                                          }}
                                        >
                                          <img
                                            src="https://via.placeholder.com/550x350.png?text=550x350"
                                            alt="demo"
                                            className="img-responsive"
                                          />
                                        </div>
                                      ) : (
                                        <div className="store-img">
                                          <Images src={dataStore.img_size[0]} layout="responsive" width={dataStore.img_size[1]} height={dataStore.img_size[2]} objectFit="contain" sizes="100vw" objectPosition="top" />
                                        </div>
                                      )}
                                      <div className="store-detail">
                                        <div className="store-detail_wrapper">
                                          <h3 className="store-name">
                                            {dataStore.title
                                              .split(" ")
                                              .map((value, i) => {
                                                if (
                                                  value == "KARMAKAMET" ||
                                                  value == "EVERYDAY"
                                                ) {
                                                  return (
                                                    <React.Fragment key={i}>
                                                      <br />
                                                      {value}&nbsp;
                                                    </React.Fragment>
                                                  );
                                                } else {
                                                  return (
                                                    <React.Fragment key={i}>
                                                      {value}&nbsp;
                                                    </React.Fragment>
                                                  );
                                                }
                                              })}
                                          </h3>
                                          <span
                                            dangerouslySetInnerHTML={this.rawMarkup(
                                              dataStore.excerpt
                                            )}
                                          />
                                        </div>
                                      </div>
                                    </a>
                                  </Links>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div>
                  <div className="store-title">
                    <h1>{this.state.NameLoction}</h1>
                  </div>
                  <div className="store-mesonry">
                    <div>
                      <h1>{this.state.textMassge}</h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </Page>
    );
  }
}
Store.propTypes = {
  t: PropTypes.func.isRequired,
};
export async function getServerSideProps({ req }) {
  const locations = await getLocation(req.language);
  return { props: { namespacesRequired: ["layout"], locations } };
}
// export async function getServerSideProps( context ) {
  
//   const cookies = context.req.headers.cookie;
//   var heade_xml = 'next-i18next=';
//   var index_start = cookies.indexOf(heade_xml)+ heade_xml.length;
//   var lang = cookies.substring(index_start, index_start+2);
//   const locations = await getLocation(lang);
//   return { props: { namespacesRequired: ["layout"], locations } };
// }
export default withTranslation("layout")(Store);
