import qs from "qs";

function getStrapiURL(path = '') {
    // return `${'http://localhost:1337'}${path}`;
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL }${path}`;
}

export async function fetchAPI(
  path,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function postAPI(
  path,
  urlParamsObject = {},
  options = {},
  payloadData = {}
){
  try {
    // Merge default and user options
    const mergedOptions = {
      method : "POST",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      ...options,
      body: JSON.stringify(payloadData)
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
   
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
