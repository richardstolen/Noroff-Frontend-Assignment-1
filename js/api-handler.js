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
  let result;
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
  return result;
}

const API = {
  getComputers,
  getImage,
};

export default API;
