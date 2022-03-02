import React, { Component } from 'react';
import Page from '../../layouts/main'
import Router, { withRouter } from "next/router";
import client from '../../components/Apollo/apolloClient'
import { withTranslation } from '../../i18n'
import gql from 'graphql-tag'
import Link from "next/link";
import { getWoocomData } from '../../services/WooService'
import { id } from 'date-fns/locale';
const PRODUCTS_QUERY = gql`query{
    productCategory(id: "cHJvZHVjdF9jYXQ6MjEz") {
    id
    name
    products(first: 999, where: {orderby: {order: ASC, field: MENU_ORDER}, search: " ", status: "publish"}) {
      nodes {
        id
        name
        slug
        menuOrder
        onSale
        ... on VariableProduct {
          id
          name
          shortDescription
          price
          image {
            sourceUrl
            slug
          }
        }
        ... on SimpleProduct {
          id
          name
          shortDescription
          price
          image {
            sourceUrl
            slug
          }
        }
        productCategories(where: {search: ""}) {
            nodes {
              name
              id
              databaseId
              slug
            }
        }
      }
    }
  }
}`;
const PRODUCTSCAT_QUERY = gql`query{
    productCategories {
        nodes {
            name
            slug
            id
            databaseId
            children {
            nodes {
                name
                slug
                id
                databaseId
                parent {
                  databaseId
                }
                children {
                nodes {
                    name
                    id
                    databaseId
                    parent {
                      databaseId
                    }
                    slug
                }
                }
            }
            }
        }
    }
}`;
class ProductsCatgory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.products,
      isMounted: false,
      title: this.props.title != '' ? this.props.title : '',
      fillter_DD: '',
      menuOrder: [],
      catOrder: [],
    }
  }

  // contains = (target, pattern) => {
  //     var value = 0;
  //     pattern.forEach(function (word) {
  //         value = value + target.includes(word);
  //     });
  //     return (value < 1)
  // }
  contains = (target, pattern) => {
    // var value = 0;
    return target.includes(parseInt(pattern))
  }
  componentDidMount = async (props) => {
    let menuOrders = [...this.state.menuOrder]
    const { slug } = this.props.router.query
    await this.state.item.map(async (item, i) => {
      let catArray = []
      await item.productCategories.nodes.map((cat, i) => {
        catArray.push(cat.databaseId)

      })
      this.state.item[i].CategoryID = catArray
    })
    this.props.allcategory.map((item, index_1) => {
      item.children.nodes.map((fillterItem, index_2) => {
        if (fillterItem.slug == slug ) {
          this.LoadFitler(fillterItem.databaseId, index_2, fillterItem.name,fillterItem)
        }else{
          fillterItem.children.nodes.map((index, i) => {
            if (index.slug == slug) {
              this.LoadFitler(index.databaseId, i, index.name,index,item.children.nodes)
            }
          })
        }
      })
    })
    
    this.setState({ lang: this.props.i18n.language, isMounted: true })
  }
  LoadFitler = async (databaseId, i, name,items,fillterItem) => {

    let catOrder = []
    if (catOrder[0] == 42) {
      let catOrder = []
    }
    let menuOrders = []
    let item = []
    if(items.parent.databaseId != 213){
      await fillterItem.map(async (fillterItem, index_2) => {
        if(items.parent.databaseId == fillterItem.databaseId){
          await menuOrders.push(index_2)
        }
      })
    }
    else{
      await menuOrders.push(i)
    }
    
    // this.setState({menuOrder:menuOrders.sort(function(a, b){return a-b})})
    await catOrder.push(databaseId)

    this.setState({ menuOrder: menuOrders, catOrder: catOrder })

    await this.props.products.map((items, i) => {
      if (this.contains(items.CategoryID.toString(), catOrder) == true) {
        item.push(items)
      }
    })
    this.setState({ item: item, title: name })

    // var fillter = document.querySelectorAll('.fillter-title.active');
    // for (var i = 0; i < fillter.length; i++) {
    //   fillter[i].classList.remove("active");
    // }

  }


  myFunction1 = async (e, i) => {

    if (e.target.checked) {

      let catOrder = []
      if (catOrder[0] == 42) {
        let catOrder = []
      }
      let menuOrders = []
      if (e.target.name == "sub-catagory") {
        menuOrders = [...this.state.menuOrder]
      }
      let item = []
      await menuOrders.push(i)
      // this.setState({menuOrder:menuOrders.sort(function(a, b){return a-b})})
      await catOrder.push(e.target.value)

      this.setState({ menuOrder: menuOrders, catOrder: catOrder })
      this.props.products.map((items, i) => {
        if (this.contains(items.CategoryID.toString(), catOrder) == true) {
          item.push(items)
        }
      })
      this.setState({ item: item, title: e.target.dataset.target, fillter_DD: '' })



    } else {
      let menuOrders = [...this.state.menuOrder]
      let catOrder = [...this.state.catOrder]
      if (e.target.name == "sub-catagory") {
        catOrder = [...this.state.catOrder]
      }
      let nons = menuOrders.indexOf(i)
      let cat = catOrder.indexOf(e.target.value)
      let item = []
      if (nons > -1) {
        await menuOrders.splice(nons, 1)
        this.setState({ menuOrder: menuOrders })
      }
      if (cat > -1) {
        await catOrder.splice(cat, 1)
        this.setState({ catOrder: catOrder })
      }
      if (this.state.catOrder.length == 0) {
        this.setState({ item: this.props.products, title: 'ALL Category' })
      } else {
        this.props.products.map((items, i) => {
          if (this.contains(items.CategoryID.toString(), catOrder) == true) {
            item.push(items)
          }
        })
        this.setState({ item: item, title: e.target.dataset.target, fillter_DD: '' })
      }
    }
    var fillter = document.querySelectorAll('.fillter-title.active');
    for (var i = 0; i < fillter.length; i++) {
      fillter[i].classList.remove("active");
    }
  }

  Active_Fillter() {
    this.state.fillter_DD == '' ? this.setState({ fillter_DD: 'active' }) : this.setState({ fillter_DD: '' })
  }
  parseHtmlEntities(str) {
    return str.replace(/&#([0-9]{1,3});/gi, function (match, numStr) {
      var num = parseInt(numStr, 10); // read num as normal number
      return String.fromCharCode(num);
    });
  }
  strip_tags(input, allowed) {
    allowed = (
      ((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
    ).join("");
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    return input.replace(tags, ($0, $1) =>
      allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : ""
    );
  }
  GroupCategory = async (id, i, e) => {
    let menuOrders = [...this.state.menuOrder]
    // let catOrder = [...this.state.catOrder]
    // let menuOrders = []
    let catOrder = []
    let item = []
    // this.setState({menuOrder:menuOrders.sort(function(a, b){return a-b})})

    await catOrder.push(id)
    var inputs = document.querySelectorAll('.groupCheckbox input');
    var fillter = document.querySelectorAll('.fillter-title.active');
    for (var i = 0; i < fillter.length; i++) {
      fillter[i].classList.remove("active");
    }
    e.target.classList.add("active")
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }

    this.setState({ menuOrder: [menuOrders], catOrder: catOrder })

    if (catOrder[0] == '213') {
      this.setState({ item: this.props.products, title: e.target.dataset.target,fillter_DD: '' })
    } else {
      this.props.products.map((items, i) => {
        if (this.contains(items.CategoryID, catOrder) == true) {
          item.push(items)
        }
      })
      this.setState({ item: item, title: e.target.dataset.target,fillter_DD: '' })
    }

  }

  Sortby = async (e) => {
    const { name, value } = e.target
    let cutThaiBath = (price) => {
      if (price !== null) {
        const myArray = price.split(" ");
        let cutBATH = myArray[0].split("฿")
        return cutBATH[1]
      } else {
        return price
      }
    }
    if (value == "Low") {
      let sort = this.state.item.sort(function (a, b) { if (a.price != null) { return cutThaiBath(a.price) - cutThaiBath(b.price) } })
      this.setState({ item: sort })
    }
    if (value == "High") {
      let sort = this.state.item.sort(function (a, b) { if (a.price != null) { return cutThaiBath(b.price) - cutThaiBath(a.price) } })
      this.setState({ item: sort })
    }
    if (value == "A") {
      let sort = this.state.item.sort(
        function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
      )
      this.setState({ item: sort })
    }
    if (value == "Z") {
      let sort = this.state.item.sort(
        function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
        }
      )
      this.setState({ item: sort })
    }
  }
  render() {
    const { slug } = this.props.router.query
    const { item, menuOrders } = this.state
    const allcategory = this.props.allcategory
    
    return (
      <Page title="Products" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic" images="/static/images/icon-logo/LOGO_circle.png" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet " >
        <div className='allProduct-Page pdtop-site' >
          <div className='allProduct_wrapper'>
            <section className='sec-fillterName'>
              <h1
                className='NameShow'
                dangerouslySetInnerHTML={{
                  __html: this.strip_tags(
                    this.state.title == undefined ? 'All Category' : this.state.title,
                    "<p>"
                  ),
                }}
              />
            </section>
            <section className='sec-groupFillter'>
              <div className='btn_groupFillter' onClick={() => this.Active_Fillter()}>
                <p>Fillter</p>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </div>
              <div className={'groupFillter_wrapper ' + this.state.fillter_DD}>
                {
                  allcategory.map((item, index_1) => {
                    if (item.databaseId != 41) {
                      return (
                        <div className='groupFillter'>
                          <p className='fillter-title' data-target={item.name} onClick={(e) => this.GroupCategory(item.databaseId, index_1, e)}>{item.name}</p>
                          <div className='groupFillter_inner'>
                            {item.children.nodes.map((fillterItem, index_2) => {
                              return (
                                <div className='gorupfillter-item' >
                                  <label className="fillter-item" for={`checkbox-${index_2}`} >
                                    <div className='groupCheckbox'>
                                      <input type="radio" id={`checkbox-${index_2}`} checked={this.state.catOrder == fillterItem.databaseId ? true : false } value={fillterItem.databaseId} data-target={fillterItem.name} name="category" onChange={(e) => this.myFunction1(e, index_2)} />
                                      <span className='checkmark' />
                                    </div>
                                    <p
                                      className='fillterName'
                                      dangerouslySetInnerHTML={{
                                        __html: this.strip_tags(
                                          fillterItem.name,
                                          "<p>"
                                        ),
                                      }}
                                    />
                                  </label>
                                  <div className='GroupChild-fillter'>
                                    {
                                      fillterItem.children.nodes.map((index, i) => {
                                        if (this.state.menuOrder.includes(index_2))
                                          return (
                                            <label className="fillter-item" for={`Child_${index_2}_checkbox-${i}`} >
                                              <div className='groupCheckbox'>
                                                <input type="radio" id={`Child_${index_2}_checkbox-${i}`} name="sub-catagory"  checked={this.state.catOrder == index.databaseId ? true : false } data-target={index.name} value={index.databaseId} onChange={(e) => this.myFunction1(e, index_2)} />
                                                <span className='checkmark' />
                                              </div>
                                              <p
                                                className='fillterName'
                                                dangerouslySetInnerHTML={{
                                                  __html: this.strip_tags(
                                                    index.name,
                                                    "<p>"
                                                  ),
                                                }}
                                              />
                                            </label>
                                          )
                                      })
                                    }
                                  </div>
                                </div>

                              )
                            })}
                          </div>
                        </div>
                      )
                    }
                  })
                }




              </div>
            </section>
            <section className='sec-groupProduct'>
              <div className='groupSortby'>
                <div className='groupSortby_wrapper'>
                  <select class="Sortby-item form-control" name="Sortby-item1" onChange={this.Sortby} >
                    <option>Sort by</option>
                    <option value="Low">Low Price</option>
                    <option value="High">High Price</option>
                    <option value="A">A - Z</option>
                    <option value="Z">Z - A</option>
                  </select>
                </div>
              </div>


              <div className='groupProduct_inner'>
                {
                  this.state.isMounted ?
                  item.length != 0 ?
                    item.map((data, i) => {
                      return (
                        <Link href="/product/[slug]" as={`/product/${data.slug}`} passHref key={i}>
                          <a className='ProductItem' href=''>
                            <div className='Product-pic'>
                              {
                                data.CategoryID != undefined ?
                                  data.CategoryID.includes(85) ?
                                    <div className="Product-tag">
                                      {/* <div className="Product-tag_item" >{data.CategoryID}</div> */}
                                    </div>
                                    :
                                    '' : ''
                              }

                              {
                                data.image != null && <img src={data.image.sourceUrl} />
                              }
                            </div>

                            <div className="Product-detail">
                              <h3 className='Product-name'>{data.name}</h3>
                              <div className="Product-pricegroup">
                                <p>{data.price}</p>
                              </div>
                            </div>

                          </a>
                        </Link>
                      )
                    })
                    :
                    <div className="not-items">ไม่พบข้อมูลสินค้า</div> : ''
                }
              </div>
            </section>
          </div>

        </div>

      </Page>
    )
  }
}
const isServer = () => typeof window === "undefined";
ProductsCatgory.getInitialProps = async (ctx) => {
  const result = await client.query({ query: PRODUCTS_QUERY, fetchPolicy: 'no-cache', });
  const cat = await client.query({ query: PRODUCTSCAT_QUERY, fetchPolicy: 'no-cache', });
  return {
    categoryname: result.data.productCategory.name,
    products: result.data.productCategory.products.nodes,
    allcategory: cat.data.productCategories.nodes
  }
}
export default withRouter(withTranslation("layout")(ProductsCatgory));
