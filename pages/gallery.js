import React,{ Component } from 'react';
import Page from '../layouts/main'
import { withTranslation } from '../i18n'
import PropTypes from 'prop-types'
import { getGalleryre, getGallery, getTags, getCategory, } from '../services/PostService'
import { BannerSkeleton } from "../components/skeletion";
import Tagber from '../components/Tagber'
import Link from 'next/link';
import Masonry from 'react-masonry-component';
import { motion, AnimatePresence } from "framer-motion"
const masonryOptions = {
  transitionDuration: 0
};
const imagesLoadedOptions = { background: '.my-bg-image-el' }
class Gallery extends Component {
  constructor(props) {
    super(props);

    this.categoryClick = this.categoryClick.bind(this)
    this.setState({ items: this.props.items })
  }
  state = {
    isMounted: false,
    items: this.props.items,
    options: [],
    category: this.props.category,
    tags: [],
    catid: '',
    lang: '',
    script: [
      { id: 1, src: "https://code.jquery.com/jquery-3.2.1.slim.min.js" },
      { id: 2, src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" },
      { id: 3, src: "/static/js/owl.carousel.min.js" },
      { id: 4, src: "/static/js/magic-grid.min.js" },
      { id: 5, src: "/static/js/main.js" }
    ]
  }
  stateowl = {
    margin: 30,
    lazyLoad: true,
    dots: false,
    nav: false,
    tag_chack: false,
    stagePadding: 55,
    autoWidth: true,
    responsive: {
      0: {
        margin: 20,
      },
      993: {
        items: 6,
      },
    }
  }
  componentDidMount = async () => {
    this.setState({ isMounted: true })

    const data = await getGalleryre(this.props.i18n.language, '')
    const category = await getCategory(this.props.i18n.language, '')
    const tags = await getTags(this.props.i18n.language)
    this.setState({ category: category, tags: tags, lang: this.props.i18n.language })
  }
  componentWillReceiveProps = async (nextProps) => {
    if (this.state.lang !== nextProps.i18n.language) {
      const data = await getGalleryre(nextProps.i18n.language, this.state.options.toString())
      const category = await getCategory(nextProps.i18n.language, '')
      const tags = await getTags(nextProps.i18n.language)

      this.setState({ items: data, tags: tags, category: category, lang: nextProps.i18n.language })
    }
  }

  categoryClick = async (e) => {
    const value = e.target.value;
    this.setState({ tags: [] })
    const tags = await getCategory(this.props.i18n.language, value)
    const result = [];
    const map = new Map();
    for (const item of tags.tags_group) {
      if (!map.has(item.term_id)) {
        map.set(item.term_id, true);
        result.push(item);
      }
    }

    this.setState({ tags: result, lang: this.props.i18n.language })
  }
  contains = (target, pattern) => {

    var value = 0;
    pattern.forEach(function (word) {
      value = value + target.includes(word);
    });

    return (value === 1)
  }
  changeOptionState = async (option) => {
    const data = []
    this.props.items.map((items, i) => {
      if (this.contains(items.tags.toString(), option) == true) {
        data.push(Object.assign(items, { type_display: true }))
      } else {
        data.push(Object.assign(items, { type_display: false }))
      }
    })
    this.setState({ options: option })
    const taggroup = []
    this.props.items.map((tag, i) => {
      var b = option.toString().split(',').map(function (item) {
        return parseInt(item, 10) || 0;
      });
      var arr = tag.tags,
        brr = b,
        res = arr.filter(f => brr.includes(f));
      if (res.length > 0) {
        taggroup.push(Object.assign(tag, { type_display: true }));
      } else if (option.length == 0) {
        taggroup.push(Object.assign(tag, { type_display: true }));
      } else {
        // taggroup.push(Object.assign(tag, {type_display: 'hidden'}));
      }
    })
    this.setState({ options: option, items: taggroup })
  }
  strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
    return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
  }
  group = (items) => {
    var chunk_size = 3;
    const groups = items.map(function (e, i) {
      return i % chunk_size === 0 ? items.slice(i, i + chunk_size) : null;
    }).filter(function (e) { return e; });
  }

  render() {
    const secondColumnStart = Math.floor(this.state.items.length / 3) + 1;
    return (
      <Page title="Gallery Karmakamet" description="จุดมุ่งหมายของแบรนด์ Karmakamet ในปีนี้เรามุ้งเน้นที่จะพูดเรื่อง “Life Remedy” คือการใช้ชีวิตอันแสนรื่นรมณ์ในแบบฉบับของ Karmakamet Aromatic" images="/static/images/lazada.jpg" keywords="เครื่องหอม น้ำมันหอม จุดมุ่งหมายของแบรนด์ Karmakamet ">
        <section>
          <div className="gallery-page">
            <div className="gallery-page_wrapper">
              <div className="gal-fillter">
                <div className="gal-fillter-wrapper">
                  <div className="ddl-fillter">
                    <button className="ddl-btn-fillter">
                      FILTER KARMAKAMET
                      <i className="icon-arrow-left"></i>
                    </button>
                  </div>
                  <ul className="select-fillter">
                    {
                      this.state.category.map((category, i) => {
                        return <li className="option-fillter" key={i}>
                          <button type='button' data_id={category.id} onClick={this.categoryClick} value={category.id} >
                            {category.name}
                          </button>
                        </li>
                      })
                    }
                  </ul>
                </div>
                <div className="galtags-slide-wrapper">
                  {this.state.tags.length > 0 ?
                    <Tagber itemTag={this.state.tags} changeState={this.changeOptionState} optionValue={this.state.options} language={this.state.lang} />
                    : ''
                  }

                </div>
              </div>
              <div id="grid" data-column>
                <AnimatePresence>
                  <div className="column size-1of3">
                    {
                      this.state.items.slice(0, secondColumnStart).map((item, i) => {
                        return <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className={"gal-item " + (item.type_display == 'hidden' ? 'hidden' : '')} key={item.id}
                        >
                          <Link href={`/[category]/[slug]`} as={`/${item.category_slug}/${item.slug}`} passHref>
                            <a href="" >
                              <figure className="gal-item-wrapper">
                                <img className="gal-img" src={item.featured_image_thumbnail_url} />
                                <figcaption className="gal-caption">
                                  <h5 className="gal-title" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.title, '<a>') }} />
                                  <p className="gal-subtitle" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.excerpt, '<a>') }} />
                                </figcaption>
                              </figure>
                            </a>
                          </Link>
                        </motion.div>
                      })
                    }
                  </div>
                </AnimatePresence>
                <AnimatePresence>
                  <div className="column size-1of3">
                    {
                      this.state.items.slice(secondColumnStart, secondColumnStart * 2).map((item, i) => {
                        return <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className={"gal-item " + (item.type_display == 'hidden' ? 'hidden' : '')} key={item.id}
                        >
                          <Link href="/[category]/[slug]" as={`/${item.category_slug}/${item.slug}`} passHref>
                            <a href="" >
                              <figure className="gal-item-wrapper">
                                <img className="gal-img" src={item.featured_image_thumbnail_url} />
                                <figcaption className="gal-caption">
                                  <h5 className="gal-title" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.title, '<a>') }} />
                                  <p className="gal-subtitle" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.excerpt, '<a>') }} />
                                </figcaption>
                              </figure>
                            </a>
                          </Link>
                        </motion.div>
                      })
                    }
                  </div>
                </AnimatePresence>
                <AnimatePresence>
                  <div className="column size-1of3">
                    {
                      this.state.items.slice(secondColumnStart * 2, secondColumnStart * 3.2).map((item, i) => {
                        return <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className={"gal-item " + (item.type_display == 'hidden' ? 'hidden' : '')} key={item.id}
                        >
                          <Link href="/[category]/[slug]" as={`/${item.category_slug}/${item.slug}`} passHref>
                            <a href="" >
                              <figure className="gal-item-wrapper">
                                <img className="gal-img" src={item.featured_image_thumbnail_url} />
                                <figcaption className="gal-caption">
                                  <h5 className="gal-title" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.title, '<a>') }} />
                                  <p className="gal-subtitle" dangerouslySetInnerHTML={{ __html: this.strip_tags(item.excerpt, '<a>') }} />
                                </figcaption>
                              </figure>
                            </a>
                          </Link>
                        </motion.div>
                      })
                    }
                  </div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

      </Page>
    )
  }
}
export async function getServerSideProps({ req }) {
  const items = await getGalleryre(req.language, '')
  const category = await getCategory(req.language, '')
  return { props: { namespacesRequired: ['layout'], items, category } }
}
Gallery.propTypes = {
  t: PropTypes.func.isRequired,
}
export default withTranslation('layout')(Gallery);