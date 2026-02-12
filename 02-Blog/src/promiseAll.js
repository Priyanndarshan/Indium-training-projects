const { fetchData, BASE_URL } = require("./api");

async function fetchBlogDashboard() {
  try {
    const [posts, authors, categories] = await Promise.all([
      fetchData(`${BASE_URL}/posts`),
      fetchData(`${BASE_URL}/authorss`),
      fetchData(`${BASE_URL}/categories`)
    ]);

    console.log("Posts:", posts);
    console.log("Authors:", authorss);
    console.log("Categories:", categories);

  } catch (err) {
    console.log("Promise.all failed:", err.message);
  }
}

module.exports = fetchBlogDashboard;
