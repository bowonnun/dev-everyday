import axios from "axios";
const endpoint = "https://karmakametstudio.com/";
const username = "web-master";
const password = "kmkm1971webiste";
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");
export const getPost = async (lang, categoryId) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint +
          "/wp-json/wp/v2/posts?per_page=9&order=asc&orderby=menu_order&categories=" +
          categoryId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        endpoint +
          lang +
          "/wp-json/wp/v2/posts?per_page=9&order=asc&orderby=menu_order&categories=" +
          categoryId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getPostTotal = async (lang, categoryId) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint +
          "/wp-json/wp/v2/posts?per_page=99&order=asc&orderby=menu_order&categories=" +
          categoryId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        endpoint +
          lang +
          "/wp-json/wp/v2/posts?per_page=99&order=asc&orderby=menu_order&categories=" +
          categoryId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getCategoryTag = async (lang, categoryID) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint + "/wp-json/wp/v2/categories?slug=" + categoryID,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    } else {
      const response = await axios.get(
        endpoint + lang + "/wp-json/wp/v2/categories?slug=" + categoryID,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};
export const getSlug = async (lang, slug) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint + "/wp-json/wp/v2/posts?slug=" + slug,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    } else {
      const response = await axios.get(
        endpoint + lang + "/wp-json/wp/v2/posts?slug=" + slug,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};
export const getTags = async (lang) => {
  try {
    if (lang === "en") {
      const response = await axios.get(endpoint + "/wp-json/wp/v2/tags", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } else {
      const response = await axios.get(
        endpoint + lang + "/wp-json/wp/v2/tags",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getCategory = async (lang, categoryID) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint + "/wp-json/wp/v2/categories/" + categoryID,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        endpoint + lang + "/wp-json/wp/v2/categories/" + categoryID,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getPage = async (lang, pageSlug) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint + "/wp-json/wp/v2/pages?slug=" + pageSlug,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    } else {
      const response = await axios.get(
        endpoint + lang + "/wp-json/wp/v2/pages?slug=" + pageSlug,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};
export const getHashTag = async (lang, tag) => {
  try {
    if (lang == "en") {
      const response = await axios.get(
        endpoint + "/wp-json/wp/v2/tags?slug=" + tag,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    } else {
      const response = await axios.get(
        endpoint + lang + "/wp-json/wp/v2/tags?slug=" + tag,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};

export const getGallery = async (lang, tag) => {
  try {
    const response = await axios.get(
      endpoint + lang + "/wp-json/wp/v2/posts?per_page=100&tags=" + tag,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data[0];
  } catch (err) {
    console.log(err);
  }
};
export const getGalleryre = async (lang, tag) => {
  try {
    if (lang === "en") {
      if(tag != ""){
        const response = await axios.get(
          endpoint + "/wp-json/wp/v2/posts?per_page=100&tags=" + tag,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      }else{
        const response = await axios.get(
          endpoint + "/wp-json/wp/v2/posts?per_page=100",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      }
      
    } else {
      if(tag != ""){
        const response = await axios.get(
          endpoint + lang + "/wp-json/wp/v2/posts?per_page=100&tags=" + tag,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      }else{
        const response = await axios.get(
          endpoint + "/wp-json/wp/v2/posts?per_page=100",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export const getHistory = async (lang) => {
  try {
    if (lang === "en") {
      const response = await axios.get(
        endpoint +
          "/wp-json/wp/v2/pages?parent=2733&per_page=100&orderby=menu_order&order=asc",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        endpoint +
          lang +
          "/wp-json/wp/v2/pages?parent=2733&per_page=100&orderby=menu_order&order=asc",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
