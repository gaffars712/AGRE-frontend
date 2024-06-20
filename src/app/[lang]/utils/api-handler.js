import qs from "qs";
import fetch from "node-fetch"; // Ensure you have node-fetch installed
import AbortController from "abort-controller"; // Ensure you have abort-controller installed

function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

// Function to perform fetch with a timeout
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  options.signal = controller.signal;

  try {
    const response = await fetch(url, options);
    clearTimeout(id); // Clear timeout if fetch is successful
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

// Function to perform fetch with retry logic
async function fetchWithRetry(url, options = {}, retries = 3, timeout = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout(url, options, timeout);
    } catch (error) {
      if (i === retries - 1) {
        throw error; // Throw error if last retry fails
      }
      console.error(`Fetch attempt ${i + 1} failed, retrying...`);
    }
  }
}

// Fetch API with enhanced error handling
export async function fetchAPI(path, urlParamsObject = {}, options = {}, timeout = 5000) {
  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    console.log('Before fetch:', requestUrl);
    const response = await fetchWithRetry(requestUrl, mergedOptions, 3, timeout);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Fetch error:', errorData);
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('After fetch:', data);
    return data;

  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

// Post API with enhanced error handling
export async function postAPI(path, urlParamsObject = {}, options = {}, payloadData = {}, timeout = 5000) {
  try {
    const mergedOptions = {
      method: "POST",
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      ...options,
      body: JSON.stringify(payloadData),
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    console.log('Before POST:', requestUrl);
    const response = await fetchWithRetry(requestUrl, mergedOptions, 3, timeout);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('POST error:', errorData);
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('After POST:', data);
    return data;

  } catch (error) {
    console.error('POST error:', error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
