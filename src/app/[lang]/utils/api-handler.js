import qs from "qs";

function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

// Function to perform a simple retry on fetch failures
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Fetch error:', errorData);
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) {
        throw error; // Throw error if last retry fails
      }
      console.error(`Fetch attempt ${i + 1} failed, retrying...`);
    }
  }
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
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    // Trigger API call
    console.log('Before fetch:', requestUrl);
    const response = await fetchWithRetry(requestUrl, mergedOptions);
    const data = await response.json();
    console.log('After fetch:', data);
    return data;

  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function postAPI(
  path,
  urlParamsObject = {},
  options = {},
  payloadData = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      method: "POST",
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
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    // Trigger API call
    console.log('Before POST:', requestUrl);
    const response = await fetchWithRetry(requestUrl, mergedOptions);
    const data = await response.json();
    console.log('After POST:', data);
    return data;

  } catch (error) {
    console.error('POST error:', error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
