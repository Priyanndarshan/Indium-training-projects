

async function fetchImage(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Image failed");
  }

  return res.url;
}

async function getFirstWorkingImage() {
  try {
    const image = await Promise.any([
      fetchImage("https://invalid-url.com/img.jpg"),
      fetchImage("https://another-invalid.com/img.jpg"),
      fetchImage("https://picsum.photos/200")
    ]);

    console.log("First working image:", image);

  } catch (err) {
    console.log("All images failed");
  }
}

module.exports = getFirstWorkingImage;
