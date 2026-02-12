const fetchBlogDashboard = require("./src/promiseAll");
const fastestServer = require("./src/promiseRace");
const getFirstWorkingImage = require("./src/promiseAny");
const apiStatusReport = require("./src/promiseAllsettled");

async function run() {
  console.log("\n=== Promise.all ===");
  await fetchBlogDashboard();

  console.log("\n=== Promise.race ===");
  await fastestServer();

  console.log("\n=== Promise.any ===");
  await getFirstWorkingImage();

  console.log("\n=== Promise.allSettled ===");
  await apiStatusReport();
}

run();
