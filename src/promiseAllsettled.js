async function fetchAPI(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed API");
  }

  return res.json();
}

async function apiStatusReport() {
  const results = await Promise.allSettled([
    fetchAPI("http://localhost:3000/posts"),
    fetchAPI("http://localhost:3000/authors"),
    fetchAPI("http://localhost:9999/fail"),
    fetchAPI("http://localhost:3000/categories"),
    fetchAPI("http://localhost:8888/fail")
  ]);

  results.forEach((result, index) => {
    console.log(`API ${index + 1}:`, result.status);
  });
}

module.exports = apiStatusReport;
