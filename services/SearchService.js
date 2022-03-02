import axios from 'axios'
const endpoint = "https://karmakametstudio.com/"
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import wooConfig  from '../wooConfig';
import { getWoocomData } from "../services/WooService";
export const getSearch = async (lang, keyword) => {
    try {
        if (keyword !== "ALL") {
            // const WooCommerce = new WooCommerceRestApi({
            //     url: wooConfig.siteUrl,
            //     consumerKey: wooConfig.consumerKey,
            //     consumerSecret: wooConfig.consumerSecret,
            //     version: 'wc/v3',
            //     queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
            // });
            // const responseproducts = await WooCommerce.get('products?per_page=90&search='+keyword).then(function(result) {
            //     return result
            // });
            const responseproducts = await getWoocomData(
                lang,
                "products?per_page=99&search="+keyword
              );
              console.log(responseproducts)
            if (lang === "en") {
                const response = await axios.get("https://karmakametstudio.com/wp-json/wp/v2/posts?per_page=99&search="+keyword);
                Array.prototype.push.apply(response.data, responseproducts);
                return response.data
            }else{
            const response = await axios.get("https://karmakametstudio.com/" +lang+"/wp-json/wp/v2/posts?per_page=99&search="+keyword);
                Array.prototype.push.apply(response.data, responseproducts);
                return response.data
            }
        } else {
            // const WooCommerce = new WooCommerceRestApi({
            //     url: wooConfig.siteUrl,
            //     consumerKey: wooConfig.consumerKey,
            //     consumerSecret: wooConfig.consumerSecret,
            //     version: 'wc/v3',
            //     queryStringAuth: true 
            // });
            // const responseproducts = await WooCommerce.get('products?per_page=90').then(function(result) {
            //     return result
            // });
            const responseproducts = await getWoocomData(
                lang,
                "products?per_page=99&search="+keyword
              );
            if (lang === "en"  || lang === undefined) {
                const response = await axios.get("https://karmakametstudio.com/wp-json/wp/v2/posts?per_page=99");
                Array.prototype.push.apply(response.data, responseproducts);
                return response.data
            }else{
                const response = await axios.get("https://karmakametstudio.com/" +lang+"/wp-json/wp/v2/posts?per_page=99");
                Array.prototype.push.apply(response.data, responseproducts);
                return response.data
            }
            
        }

    } catch (err) {
        console.log(err)
    }
}

export const getCategory = async (lang, categoryId) => {

    try {
        if (lang === "en") {
            const response = await axios.get(endpoint + "/wp-json/wp/v2/posts?per_page=9&categories=" + categoryId)
            return response.data
        }else{
            const response = await axios.get(endpoint + lang + "/wp-json/wp/v2/posts?per_page=9&categories=" + categoryId)
            return response.data
        }
        

    } catch (err) {
        console.log(err)
    }

}