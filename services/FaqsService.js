import axios from 'axios'
const username = "web-master";
const password = "kmkm1971webiste";
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");
export const getFaqs = async (lang,faqsId) => {
    try {
        if(lang== 'en'){
            const response = await axios.get("https://karmakametstudio.com/wp-json/wp/v2/ufaq-category?slug="+ faqsId,{
        headers: { Authorization: `Bearer ${token}` },
      })
            return response.data
        }
        else{
            const response = await axios.get("https://karmakametstudio.com/"+ lang +"/wp-json/wp/v2/ufaq-category?slug="+ faqsId,{
        headers: { Authorization: `Bearer ${token}` },
      })
            return response.data
        }
        
       
    } catch (err) {
        console.log(err)
    }

}
