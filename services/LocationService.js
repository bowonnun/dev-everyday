import axios from 'axios'

export const getLocation = async (lang) => {
    try {
        const response = await axios.get("https://karmakametstudio.com/" +lang+ "/wp-json/wp/v2/wpsl_store_category")
        return response.data

    } catch (err) {
        console.log(err)
    }
}
export const getLocationSlug = async (lang, locationSlug) => {
    try {
        const response = await axios.get("https://karmakametstudio.com/" +lang+ "/wp-json/wp/v2/wpsl_stores?slug="+locationSlug)
        return response.data[0]

    } catch (err) {
        console.log(err)
    }
}