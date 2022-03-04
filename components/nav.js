import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Router, { withRouter, useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'
import useDarkMode from 'use-dark-mode';
import Iconcart from '../components/iconcart'
import ModelLogin from '../components/ModelAccount/ModelLogin'

import styles from '@/sass/evd/header.module.scss'
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
        if (selected) {
            setSelected(false)
        } else {
            setSelected(true)
        }
        //  return <Account />
    }

    const AccountLayout = (e) => {
        if (!selected) {
            return <ModelLogin userAccount={userAccount} />
        }
    }
    return (
        <>
            <div className={styles.header_wrapper}>
                <div className={styles.menu_icon} >
                    <div className={styles.bar1}></div>
                    <div className={styles.bar2}></div>
                    <div className={styles.bar3}></div>
                </div>
                <div className={styles.logo_header}>
                    <Link href="/">
                        <a href="/">
                            <img src="/static/img_evd/logo-header.png" alt="" />
                        </a>
                    </Link>
                </div>
                <div className={styles.group_icon}>
                    <div className={styles.icon_item + ' icon-ic_search'}></div>
                    <Iconcart />
                </div>
            </div>


            {/* <form className="icon-item form_search" onSubmit={handleSubmit} >
                    <i className="icon-search icon-search" aria-hidden="true"></i>
                    <input type="text" className="search" value={text.search} onChange={handleInputChange} name="search" placeholder="Search.."  ></input>
                    <i className="icon-close icon-closer" aria-hidden="true"></i>
                </form> */}

            {/* <button className="btn-callMore icon-more btnIcon-call_item"></button> */}


            {/* <div className="group-iconMore">
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

                </div> */}
        </>

    )
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