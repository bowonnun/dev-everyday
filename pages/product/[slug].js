import React, { Component } from 'react';
import Page from "../../layouts/main";
import { withTranslation } from "../../i18n";
import { getWoocomData } from "../../services/WooService";
import dynamic from "next/dynamic";
import Link from "next/link"
import client from '../../components/Apollo/apolloClient'
import gql from 'graphql-tag'
import AddtocartButton from '../../components/Cart/AddtocartButton'
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
class Productdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_scentarget: "",
      sectionScents: "",
      token: '',
      qty: 1,
      selectscentsTarget: "",
      resultScents: this.props.result,
      scents: this.props.typeproduct != 'SimpleProduct' ? this.props.products.variations.nodes : [],
      selectscents: '',
      alertItemsAddtoCart: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(value) {
    this.setState({ token: value });
    if (value === null) this.setState({ isCheck: false });
    else {
      this.setState({ isCheck: true });
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
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
    },
  };

  sectionScents = (e) => {
    var body = document.querySelector("body");
    if (e.currentTarget.dataset.target == "active") {
      body.style.overflow = "hidden";
      this.setState(
        {
          sectionScents: "active",
        },
        () => {
        }
      );
    } else {
      body.style.overflow = "unset";
      this.setState(
        {
          sectionScents: "",
        },
        () => {
        }
      );
    }
  };
  bindSelectscents = (type, product) => {
    const { data_scentarget } = this.state;
    var scent = this.state.scents;
    const scentsSort = scent.sort((a, b) => a.menuOrder - b.menuOrder);

    if (data_scentarget != "") {

      return (
        <React.Fragment>
          <div className="component-scents">
            <div
              className="select-scents"
              data-target="active"
              onClick={this.sectionScents}
            >
              <div className="img-secent">
                <div
                  className="img-secent_inner"
                  style={{
                    backgroundImage: "url(" + scent[data_scentarget].image.sourceUrl + ")",
                  }}
                ></div>
              </div>
              <div className="name-secent">
                <p>{this.splitScents(scent[data_scentarget].name)}</p>
              </div>
            </div>

            <div className="product-price">
              Price :{" "}
              {
                scent[data_scentarget].onSale ? <span className="dc-price">{scent[data_scentarget].regularPrice}</span> : ''
              }
              <span>{scent[data_scentarget].price}</span>
            </div>

            <div className="form">
              <div className="form-groups">
                <label htmlFor="disabledTextInput">Quantity : </label>
                {/* <input type="number" id="disabledTextInput" className=""  value="42" /> */}
                <input type="number" name="qty" id="disabledTextInput" min="1" defaultValue={this.state.qty} onChange={this.handleChange} />

              </div>
              <AddtocartButton product={this.props.products} price={scent[data_scentarget].price} variation={scent[data_scentarget]} qty={this.state.qty} alertItemsAddtoCart={this.alertItemsAddtoCarts} />
              {/* -------------------input - hidden --------------- */}

              {/* -------------------input - hidden --------------- */}
            </div>
          </div>
        </React.Fragment>
      );
    }
    else if (type == "SimpleProduct") {
      return (
        <>
          <div className="component-scents">
            <div className="product-price">
              Price :
              {
                product.salePrice != null ? <span className="dc-price">{product.regularPrice}</span> : ''
              }
              <span>{product.price}</span>
            </div>

            <div className="form">
              <div className="form-groups">
                <label htmlFor="disabledTextInput">Quantity : </label>
                <input type="number" name="qty" id="disabledTextInput" min="1" defaultValue={this.state.qty} onChange={this.handleChange} />
              </div>
              <AddtocartButton product={this.props.products} price={product.price} salePrice={product.salePrice} qty={this.state.qty} alertItemsAddtoCart={this.alertItemsAddtoCarts} />

            </div>
          </div>
        </>
      )
    }
    else {
      return (
        <React.Fragment>
          <div className="btn-select-scents">
            <button
              className="btn-select-scents-inner"
              data-target={"active"}
              onClick={this.sectionScents}
            >
              Select Scents
            </button>
          </div>
        </React.Fragment>
      );
    }
  };
  splitScents = (text) => {
    var res = text.split("-");
    return res[1]
  }
  bindScentsItem = () => {
    const scentsSort = this.state.scents;
    const scentsitem = scentsSort.sort((a, b) => a.menuOrder - b.menuOrder);
    return (
      <React.Fragment>
        {this.state.sectionScents === "active" ? (
          <div
            className="overlay"
            data-target={"none_active"}
            onClick={this.sectionScents}
          ></div>
        ) : (
          ""
        )}
        <div className={"sec-scents sec-scents_" + this.state.sectionScents}>
          <div className="sec-scents_wrpper">
            <div className="icon-closer_wrapper">
              <i
                className="icon-closer"
                data-target={"none_active"}
                onClick={this.sectionScents}
              ></i>
            </div>
            {scentsitem.map((scentsitem, i) => {
              if (scentsitem.stockQuantity > 0) {
                return (
                  <div
                    className="scents-item "
                    data-scentarget={i}
                    key={i}
                    onClick={this.scentactive}
                  >
                    <div className="scents-img">
                      <div
                        className="scents-img_inner"
                        style={{ backgroundImage: "url(" + scentsitem.image.sourceUrl + ")" }}
                      ></div>
                    </div>
                    <div className="scents-detail">
                      <h4 className="scentsitem-name">{this.splitScents(scentsitem.name)}</h4>
                      <small>{scentsitem.description}</small>
                      <h4 className="scentsitem-price">
                        {
                          scentsitem.dcprice != null && <span>{scentsitem.dcprice}</span>
                        }

                        {scentsitem.price}
                      </h4>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="scents-item scents-item_SoldOut"
                    data-scentarget={i}
                    key={i}
                    onClick={this.scentactive}
                  >
                    <div className="scents-img">
                      <div
                        className="scents-img_inner"
                        style={{ backgroundImage: "url(" + scentsitem.image.sourceUrl + ")" }}
                      ></div>
                    </div>
                    <div className="scents-detail">
                      <h4 className="scentsitem-name">{this.splitScents(scentsitem.name)}</h4>
                      <small>{scentsitem.description}</small>
                      <h4 className="scentsitem-price">
                        {
                          scentsitem.dcprice != null && <span>{scentsitem.dcprice}</span>
                        }

                        {scentsitem.price}
                      </h4>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </React.Fragment>
    );
  };
  scentactive = (e) => {
    var value = e.currentTarget.dataset.scentarget;
    var scents = this.state.scents;
    var body = document.querySelector("body");
    body.style.overflow = "unset";
    this.setState({
      data_scentarget: value,
      sectionScents: "",
    });
    // console.log(this.state.data_scentarget);
  };
  strip_tags(input, allowed) {
    allowed = (
      ((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
    ).join("");
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    return input.replace(tags, ($0, $1) =>
      allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : ""
    );
  }
  rawMarkup(detail) {
    var rawMarkup = detail;
    return { __html: rawMarkup };
  }
  alertItemsAddtoCarts = (status) => {
    this.setState({ alertItemsAddtoCart: status })
  }
  render() {
    const { products, result } = this.props;
    const { data_scentarget } = this.state;
    var scent = this.state.scents;
    return (
      <Page
        title="Product"
        description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic"
        images="/static/images/lazada.jpg"
        keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet "
      >
        <div className="pd-detail-page pdtop-site">
          {
            this.props.typeproduct !== "SimpleProduct" ?
              this.bindScentsItem() : ''
          }
          <div
            className={
              "pd-detail-page-wrapper pd-detail-page-wrapper_" +
              this.state.sectionScents
            }
          >
            <div className="pd-detail_left">
              <OwlCarousel
                className="pd-detail_left-wrapper"
                responsive={this.stateowl.responsive}
                margin={10}
                loop={true}
              >
                {
                  products.galleryImages.nodes.length == 0 && products.image != null ?
                    <div className="item" >
                      <div
                        className="pdd-img"
                        style={{
                          backgroundImage: "url(" + products.image.sourceUrl + ")",
                        }}
                      ></div>
                    </div> :
                    products.galleryImages.nodes.map((img, i) => {
                      return (
                        <div className="item" key={i}>
                          <div
                            className="pdd-img"
                            style={{
                              backgroundImage: "url(" + img.sourceUrl + ")",
                            }}
                          ></div>
                        </div>
                      )
                    })
                }
              </OwlCarousel>
            </div>

            <div className="pd-detail_right">
              <div className="pd-detail_right-wrapper">

                <div className="pd-detail_right-item">
                  <div className="pd-detail_right-content">
                    {
                      this.state.alertItemsAddtoCart != '' ?
                        <div className="alert-success mb-5 pt-3 pb-3 pl-3 text-left">
                          <h4>{this.state.alertItemsAddtoCart} has been added to the cart successfully</h4>
                        </div>
                        : ''
                    }
                    <div className="pd-detail_group-cat">
                      {products.productCategories.nodes.map((item, i) => {
                        return (
                          <div>
                            <Link href="/product-category/[slug]" as={`/product-category/${item.slug}`} passHref><a href='' className="pd-detail_right-cat"><span
                              dangerouslySetInnerHTML={{
                                __html: this.strip_tags(
                                  item.name,
                                  "<a>"
                                ),
                              }}
                            /></a></Link>
                            <span className='slashItem'>/</span>
                          </div>)
                      })}
                    </div>
                    <h1>{products.name}</h1>
                    {scent[data_scentarget] != undefined || products.sku != null ?
                      <>
                        <h3>Size: {products.purchaseNote}</h3>
                        <h3>SKU: {products.sku == null ? scent[data_scentarget].sku : products.sku}</h3>
                      </>
                      : ''}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: this.strip_tags(
                          products.shortDescription,
                          "<a>"
                        ),
                      }}
                    />
                  </div>
                  {this.bindSelectscents(this.props.typeproduct, this.props.products)}
                </div>

                <div className="pd-detail_right-item">
                  <div
                    className="pd-detail_right-content"
                    dangerouslySetInnerHTML={this.rawMarkup(
                      products.description
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
const isServer = () => typeof window === "undefined";
export async function getServerSideProps({ params, req }) {
  const slugproduct = params
  const PRODUCTS_QUERY = gql`query {
    product(idType: SLUG,  id:"${params.slug}") {
      id
      productId
      name
      sku
      slug
      shortDescription
      description
      purchaseNote
      image {
        id
        sourceUrl
        slug
        title
      }
      galleryImages {
        nodes {
          sourceUrl
          slug
          id
        }
      }
      ... on VariableProduct {
        name
        id
        price
        weight
        variations(first: 99) {
          nodes {
            variationId
            sku
            name
            description
            price(format: FORMATTED)
            onSale
            manageStock
            menuOrder
            stockQuantity
            regularPrice(format: FORMATTED)
            salePrice(format: FORMATTED)
            attributes {
              nodes {
                id
                attributeId
              }
            }
          }
        }
      }
      ... on SimpleProduct {
        id
        name
        price
        salePrice
        regularPrice
        productId
        manageStock
        stockQuantity
        weight
      }
      productCategories(where: {childOf: 213, search: ""}) {
        nodes {
          name
          slug
        }
      }
    }
   
}`;
  const item = await client.query({ query: PRODUCTS_QUERY, variables: { slugproduct }, fetchPolicy: 'no-cache', });
  if (item.data.product.__typename != "SimpleProduct") {
    const result = [];
    const attributes = await getWoocomData(
      req.language,
      "products/attributes/" + 2 + "/terms?per_page=99"
    );
    const attributesGroup2 = await getWoocomData(
      req.language,
      "products/attributes/" + 2 + "/terms?per_page=99&page=2"
    );
    const attrAllQl = item.data.product.variations.nodes
    const attrProduct = await attrAllQl.map((attr, i) => {
      return attr.attributes.nodes[0]
    })
    const attrProductID = attrProduct.map((attr, i) => {
      return attr.attributeId
    })
    
    await attributes.map(async (attrM, i) => {
      return await attrProductID.map((attr, i) => {
        
        if (attr == attrM.id) {
          attrAllQl[i] = { ...attrAllQl[i], image: { sourceUrl: attrM.images },description : attrM.description }
        }
      })
    })
    await attributesGroup2.map(async (attrM, i) => {
      return await attrProductID.map((attr, i) => {
        if (attr == attrM.id) {
          attrAllQl[i] = { ...attrAllQl[i], image: { sourceUrl: attrM.images },description : attrM.description }
        }
      })
    })
  }
  // item.data.product = {...item.data.product,variations :{nodes : result}}
  // console.log(item.data.product)
  // const addImg = item.data.product.variations.nodes
  // const itemsAdd = await addImg.map((attr, i) => {
  //   // items.push({imagesII:attr.attributes.nodes[0].attributeId})
  //   attr = {...attr,image:{sourceUrl:result[i]}}
  //   console.log(attr)
  //   //  return attr.attributes.nodes[0]
  // })
  // console.log(itemsAdd)


  // const attrProduct = await attributes.map((attr, i) => {
  //   return item[0].attributes[0].options.map((attr_group, i) => {
  //     if (attr.id === attr_group) {
  //       result.push(attr);
  //     }
  //   });
  // });

  if (isServer) {
    return { props: { namespacesRequired: ["layout"], products: item.data.product, typeproduct: item.data.product.__typename } };
  } else {
    return { props: {} };
  }
}
export default withTranslation("layout")(Productdetail);
