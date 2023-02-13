async function getComputers() {
  try {
    const response = await fetch(
      "https://hickory-quilled-actress.glitch.me/computers"
    );
    return await response.json().then(function (result) {
      return result;
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function getImage(id) {
  try {
    const response = await fetch(
      `https://hickory-quilled-actress.glitch.me/assets/images/${id}.png`
    );

    if (response.status === 404) {
      const response = await fetch(
        `https://hickory-quilled-actress.glitch.me/assets/images/${id}.jpg`
      );
      return response.url;
    }
    console.log(response.url);
    return response.url;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function initializeShop() {
  const computers = await getComputers();
  const compImages = [];
  for (const c of computers) {
    compImages[c.id] = await API.getImage(c.id);
  }

  sessionStorage.setItem("computers", JSON.stringify(computers));
  sessionStorage.setItem("images", JSON.stringify(compImages));
}

const API = {
  getComputers,
  getImage,
  initializeShop,
};

export default API;
