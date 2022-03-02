import React,{ Component } from "react";
import PropTypes from 'prop-types'

import { withTranslation } from '../i18n'

const Error = ({ statusCode, t }) => (
  <div style={{color:'#000',background:"#fff",fontFamily:"-apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Fira Sans, Avenir, Helvetica Neue, Lucida Grande, sans-serif",height:"100vh",textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <div>
        <h1 style={{display:"inline-block",borderRight: '1px solid rgba(0, 0, 0,.3)',margin:0,marginRight:'20px',padding:'10px 23px 10px 0',fontSize:'24px',fontWeight:500,verticalAlign:'top'}}>{statusCode}</h1><div style={{display:'inline-block',textAlign:'left',lineHeight:'49px',height:'49px',verticalAlign:'middle'}}><h2 style={{fontSize:'14px',fontWeight:'normal',lineHeight:'inherit',margin:0,padding:0}}>{t('error-with-status', { statusCode })}</h2></div>
    </div>
  </div>
)

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null
  if (res) {
    ({ statusCode } = res)
  } else if (err) {
    ({ statusCode } = err)
  }
  return {
    namespacesRequired: ['layout'],
    statusCode,
  }
}

Error.defaultProps = {
  statusCode: null,
}

Error.propTypes = {
  statusCode: PropTypes.number,
  t: PropTypes.func.isRequired,
}

export default withTranslation('layout')(Error)