/**
 * API Handler module
 */

/**
 * Get all computers from the given API
 * @returns computers as JSON
 */
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

/**
 * Function to get a image given the computer id
 * @param {int} id
 * @returns URL of image for given computer
 */
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
    return response.url;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

/**
 * Call API methods and save them in storage
 */
async function initializeShop() {
  const computers = await getComputers();
  const compImages = [];
  for (const c of computers) {
    compImages[c.id] = await API.getImage(c.id);
  }

  sessionStorage.setItem("computers", JSON.stringify(computers));
  sessionStorage.setItem("images", JSON.stringify(compImages));
}

// Exporting
const API = {
  getComputers,
  getImage,
  initializeShop,
};

export default API;
