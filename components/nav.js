import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Router, { withRouter, useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'
import useDarkMode from 'use-dark-mode';
import Iconcart from '../components/iconcart'
import ModelLogin from '../components/ModelAccount/ModelLogin'
const Nav = ({ t }) => {
    const darkModeConfig = {
        classNameLight: 'light-mode',
        classNameDark: 'dark-mode'
    }

    let darkModeValue = ''
    if (typeof window !== 'undefined') {
        darkModeValue = localStorage.getItem('darkMode');
    }
    const router = useRouter()


    const darkMode = useDarkMode(darkModeValue != '' ? darkModeValue : 'false', darkModeConfig);
    const [text, setSearch] = useState({ search: '' });
    const [selected, setSelected] = useState({ selected: false });
    const handleInputChange = e => {
        const { name, value } = e.target
        setSearch({ ...text, [name]: value })
    }
    const changeMode = () => {
        if (darkMode.value) {
            darkMode.disable();
        }
        else {
            darkMode.enable();
        }
    }

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value)
        // Router.replace(Router.router.asPath)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (text.search != '') {
            Router.push('/search/result?name=' + text.search, '/search/' + text.search, { shallow: true })
        } else {
            Router.push('/search/result', '/search/ALL', { shallow: true })
        }
    }
    const handleDiner = (e) => {
        e.preventDefault();
        window.open('https://www.karmakametdiner.com/');
    }
    const handleEve = (e) => {
        e.preventDefault();
        window.open('https://www.everydaykmkm.com/');

    }
    const handleConv = (e) => {
        e.preventDefault();
        window.open('https://www.karmakametconveyance.com/');
    }

    const userAccount = (e) => {
        e.preventDefault();
        if(selected) {
            setSelected(false)
        }else{
            setSelected(true)
        }
        //  return <Account />
    }

    const AccountLayout = (e) => {
        if(!selected) {
            return <ModelLogin userAccount={userAccount}  />
        }
    }
    return (

        <nav>
            <div className="logo">
                <Link href="/">
                    <a href="/">
                        <img src="/static/images/icon-logo/Logo-white.svg" alt=""></img>
                    </a>
                </Link>
            </div>
            <div className="menu ">
                <Link href={{ pathname: '/history' }} as={`/history`}><a href="" className={"menu-item drag-item mainmenu" + (router.pathname == '/history' ? ' active' : '')}>{t('history-label')}</a></Link>
                <Link href={{ pathname: '/philosophy' }} as={`/philosophy`}><a href="" className={"menu-item drag-item mainmenu " + (router.pathname == '/philosophy' ? ' active' : '')}>{t('philosophy-label')}</a></Link>
                <Link href={`/store`}><a href="" className={"menu-item drag-item mainmenu " + (router.pathname == '/store' ? ' active' : '')}>{t('locatorstore-label')}</a></Link>
                {/* <Link href={{ pathname: '/aboutus', query: { slug: 'aboutus' } }} as={{ pathname: '/aboutus'}}><a href="/aboutus" className={"menu-item drag-item mainmenu" + (router.pathname == '/aboutus' ? ' active':'')}>{t('aboutus-label')}</a></Link> */}
                <Link href={{ pathname: '/onlinestores' }} as={`/onlinestores`}><a href="" className={"menu-item drag-item mainmenu " + (router.pathname == '/onlinestores' ? ' active' : '')}>{t('online-label')}</a></Link>
                <Link href={{ pathname: '/contactus' }} as={`/contactus`}><a href="" className={"menu-item drag-item mainmenu" + (router.pathname == '/contactus' ? ' active' : '')}>{t('contactus-label')}</a></Link>
                <div className="drag-item">
                    <div className="bg-space"></div>
                    <div className="clearfix"></div>
                </div>

            </div>
            <form className="icon-item form_search" onSubmit={handleSubmit} >
                <i className="icon-search icon-search" aria-hidden="true"></i>
                <input type="text" className="search" value={text.search} onChange={handleInputChange} name="search" placeholder="Search.."  ></input>
                <i className="icon-close icon-closer" aria-hidden="true"></i>
            </form>
            <div className="search-result">
                <div className="search-result_wrapper">
                    <Link href="/search/Karmakamet"><a className="search-result_item" href="">Karmakamet</a></Link>
                    <Link href="/search/Karmakamet Secret World"><a className="search-result_item" href="">Karmakamet Secret World</a></Link>
                    <Link href="/search/Karmakamet Aromatic"><a className="search-result_item" href="">Karmakamet Aromatic</a></Link>
                </div>
            </div>
            <Iconcart />

            {/* <button className="btn-callAccount icon-account btnIcon-call_item" onClick={userAccount}></button> */}
            {/* {AccountLayout()} */}
            <button className="btn-callMore icon-more btnIcon-call_item"></button>


            <div className="group-iconMore">
                <div className="iconMore-item" onClick={changeMode}>
                    <div className="iconMore-item_inner">
                        <i className={darkMode.value == true ? 'fa fa-sun-o' : 'icon-moon'} aria-hidden="true"></i>
                        <p className="txt-icon">{darkMode.value == true ? 'LIGHT MODE' : 'NIGHT MODE'}</p>
                    </div>

                </div>
                <div className="iconMore-item select-site">
                    <div className="iconMore-item_inner">
                        <i className="icon-web-other" aria-hidden="true"></i>
                        <p className="txt-icon">OTHER SITE</p>
                    </div>
                    <div className="site-option">
                        <div className="site-item">
                            <Link href="/"><a href="">
                                <figure style={{
                                    backgroundImage: 'url(/static/images/other-site/kmkm-site-2.jpg)',
                                    backgroundsSize: 'cover',
                                    backgroundPosition: 'center'
                                }}>
                                    <figcaption>
                                        <img className="kmkm-imgOrhterSite" src="/static/images/other-site/Logo-KMKM-Aromatic.png" />
                                        <p>{t('othersite_kkaromatic-label')}</p>
                                    </figcaption>
                                </figure></a>
                            </Link>
                        </div>
                        {/* <div className="site-item" onClick={handleDiner} >
                            <figure style={{
                                backgroundImage: 'url(/static/images/other-site/diner-site.jpg)',
                                backgroundsSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                                <figcaption>
                                    <img src="/static/images/other-site/diner-text.png" />
                                    <p>{t('othersite_kkdiner-label')}</p>

                                </figcaption>
                            </figure>
                        </div> */}
                        {/* <div className="site-item" onClick={handleConv} >
                            <figure style={{
                                backgroundImage: 'url(/static/images/other-site/conveyance-site.jpg)',
                                backgroundsSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                                <figcaption>
                                    <img className="conveyance-imgOrhterSite" src="/static/images/other-site/conveyance.png" />
                                    <p>{t('othersite_kkconveyance-label')}</p>
                                </figcaption>
                            </figure>
                        </div> */}
                        <div className="site-item" onClick={handleEve} >
                            <figure style={{
                                backgroundImage: 'url(/static/images/other-site/eve-site.JPG)',
                                backgroundsSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                                <figcaption>
                                    <img className="eve-imgOrhterSite" src="/static/images/other-site/EVE-text.png" />
                                    <p>{t('othersite_eve-label')}</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
                <div className="iconMore-item select-lang">
                    <div className="iconMore-item_inner">
                        <i className="icon-lang " aria-hidden="true"></i>
                        <p className="txt-icon">LANGUAGE</p>
                    </div>

                    <div className="lang-option">
                        <button type="button" value="en" className="lang-item" onClick={changeLanguage}>ENGLISH</button>
                        <button type="button" value="th" className="lang-item" onClick={changeLanguage}>THAI</button>
                    </div>
                </div>
                <Link href="/gallery">
                    <a href="/gallery" className="iconMore-item">
                        <div className="iconMore-item_inner">
                            <div className="icon-gallery"></div>
                            <p className="txt-icon">GALLERY</p>
                        </div>
                    </a>
                </Link>
            </div>
            {/* <Carticon /> */}




            <div className="wraper-toggle">
                <div className="menu-icon" >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>

        </nav>)
}
Nav.getInitialProps = async ({ req }) => {
    const locale = req ? req.language : i18n.language;
    return {
        namespacesRequired: ["layout"],
        locale, req
    }
}
Nav.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withRouter(withTranslation('layout')(Nav));