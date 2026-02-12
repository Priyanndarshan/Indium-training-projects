
const BASE_URL = "http://localhost:3000";

async function fetchData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} ${res.statusText} - ${url}`);
    }

    return await res.json();
  } catch (err) {
    
    throw new Error(`fetchData error: ${err.message}`);
  }
}

module.exports = { fetchData, BASE_URL };
