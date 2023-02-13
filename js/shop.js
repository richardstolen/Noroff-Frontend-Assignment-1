import API from "./api-handler.js";
import { buyComputer, format } from "./helper.js";

let computers = JSON.parse(sessionStorage.getItem("computers"));
let compImages = JSON.parse(sessionStorage.getItem("images"));

if (computers === null) {
  console.log("asdf");
  await API.initializeShop();
  computers = JSON.parse(sessionStorage.getItem("computers"));
  compImages = JSON.parse(sessionStorage.getItem("images"));
}
for (const c of computers) {
  compImages[c.id] = JSON.parse(sessionStorage.getItem("images"));
}

async function displayComputers() {
  const div = document.getElementById("computers");

  for (const computer of computers) {
    const flexRow = document.createElement("div");
    flexRow.setAttribute("class", "flex-item");

    // Image FLEX
    const imgFlex = document.createElement("div");
    imgFlex.setAttribute("class", "flex-column");
    const img = document.createElement("img");
    img.setAttribute("src", compImages[1][computer.id]);
    imgFlex.append(img);

    // Description FLEX
    const descFlex = document.createElement("div");
    descFlex.setAttribute("class", "flex-column");
    descFlex.style.width = "200px";

    /// Title
    const title = document.createElement("span");
    title.innerText = computer.title;
    title.setAttribute("class", "text");
    title.style.marginBottom = "5px";
    descFlex.append(title);

    /// Description
    const desc = document.createElement("span");
    desc.innerText = computer.description;
    desc.setAttribute("class", "desc");
    desc.style.marginBottom = "5px";
    descFlex.append(desc);

    /// Price
    const price = document.createElement("span");
    price.innerText = `Price:  ${format(computer.price)}`;
    price.setAttribute("class", "text");
    price.style.marginBottom = "5px";
    descFlex.append(price);

    /// Buy button
    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";
    buyButton.addEventListener("click", () => {
      buyComputer(computer.price, computer.title);
    });
    buyButton.setAttribute("class", "button");
    descFlex.append(buyButton);

    // Specs FLEX
    const specsFlex = document.createElement("div");
    specsFlex.setAttribute("class", "flex-column");

    // Specs list
    const ul = document.createElement("ul");
    ul.setAttribute("id", "specs");
    ul.style.width = "200px";
    ul.style.listStyleType = "none";
    const specsLabel = document.createElement("label");
    specsLabel.innerText = "Specs";
    specsLabel.style.textAlign = "left";
    specsLabel.style.marginBottom = "10px";
    specsLabel.setAttribute("for", "specs");
    specsLabel.setAttribute("class", "text");

    for (const spec of computer.specs) {
      const li = document.createElement("li");
      li.setAttribute("class", "desc");
      li.innerText = spec;
      ul.append(li);
    }
    specsFlex.append(specsLabel);
    specsFlex.append(ul);

    flexRow.append(imgFlex);
    flexRow.append(descFlex);
    flexRow.append(specsFlex);
    flexRow.style.marginBottom = "50px";
    div.append(flexRow);
  }
}

displayComputers();
