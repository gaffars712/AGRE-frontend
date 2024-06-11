import COMMON from "@/components/common";
import qs from "qs";

export function getStrapiURL(path = '') {

    // return `${'http://localhost:1337'}${path}`;
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}
export function getStrapiMedia(url) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}


// export async function fetchAPI(
//   path,
//   urlParamsObject = {},
//   options = {}
// ) {
//   try {
//     // Merge default and user options
//     const mergedOptions = {
//       next: { revalidate: 60 },
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },
//       ...options,
//     };

//     // Build request URL
//     const queryString = qs.stringify(urlParamsObject);
//     const requestUrl = `${getStrapiURL(
//       `/api${path}${queryString ? `?${queryString}` : ""}`
//     )}`;
//     console.log("API_URL",API_URL);
//     return {}
//     // Trigger API call
//     //http://localhost:1337/api/homes?sort[createdAt]=desc&populate[homeSeo][populate]=*&pagination[start]=0&pagination[limit]=10
//     // const response = await fetch("http://localhost:1337/api/homes?sort[createdAt]=desc&populate[homeSeo][populate]=*&pagination[start]=0&pagination[limit]=10", mergedOptions);
//     // const data = await response.json();
//     // return data;
    
//   } catch (error) {
//     // console.error(error);
//     throw new Error(`Please check if your server is running and you set all the required tokens.`);
//   }
// }