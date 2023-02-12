import API from "./api-handler.js";

const computers = await API.getComputers();

// const images = [];

// for (const c of computers) {
//   images[c.id] = await API.getImages(c.id);
// }

function displayComputers() {
  const div = document.getElementById("computers");
  const select = document.createElement("select");
  select.setAttribute("name", "computers");
  select.setAttribute("id", "computers");

  for (const computer of computers) {
    const option = document.createElement("option");
    option.append(computer.title);
    select.appendChild(option);
  }
  div.appendChild(select);
}

async function displayComps() {
  const div = document.getElementById("computers");

  for (const computer of computers) {
    const newItem = document.createElement("div");
    newItem.setAttribute("class", "flex-column");
    const img = document.createElement("img");

    const computerImage = await API.getImage(computer.id);

    img.setAttribute("src", computerImage);

    newItem.append(img);
    div.append(newItem);
  }
}

displayComputers();
displayComps();
