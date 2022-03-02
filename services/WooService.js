import axios from 'axios'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import wooConfig  from '../wooConfig';

const endpoint = "https://karmakametstudio.com/"

export const getWoocomData = async (lang,event) => {
    try {
        var username = 'web-master';
        var password = 'kmkm1971website';
        var basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        if (lang === "en" || lang === "" || lang === undefined) {
            const response = await axios.get(endpoint + "wp-json/wc/v3/"+ event, {
              headers: {
                'Authorization': basicAuth
              }
            })
          return response.data
        }else{ 
          const response = await axios.get(endpoint + lang +"/wp-json/wc/v3/"+ event, {
            headers: {
              'Authorization': basicAuth
            }
          })
          return response.data
        }
    } catch (err) {
        console.log(err)
    }
}

export const getWoocomAttrData = async (lang,id) => {
    try {
        var username = 'web-master';
        var password = 'kmkm1971website';
        var basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

        const response = await axios.get(endpoint + lang +"/wp-json/wc/v3/products/attributes/"+ id +"terms", {
            headers: {
              'Authorization': basicAuth
            }
          })
        return response.data
        
    } catch (err) {
        console.log(err)
    }
}
