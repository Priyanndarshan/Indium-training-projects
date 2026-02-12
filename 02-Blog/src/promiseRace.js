async function fetchFromServer(url, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        resolve({ url, data });
      } catch (err) {
        reject(err);
      }
    }, delay);
  });
}

async function fastestServer() {
  try {
    const result = await Promise.race([
      fetchFromServer("http://localhost:3000/posts", 100),
      fetchFromServer("http://localhost:3001/posts", 200),
      fetchFromServer("http://localhost:3002/posts", 300)
    ]);

    console.log("Fastest server result:", result);

  } catch (err) {
    console.log("Race failed:", err.message);
  }
}

module.exports = fastestServer;
