import API from "../components/api-handler.js";
import Utils from "../components/utils.js";

// Getting computers and images from session storage
let computers = JSON.parse(sessionStorage.getItem("computers"));
let computerImages = JSON.parse(sessionStorage.getItem("images"));
const loading = document.getElementById("loading");

/**
 * --------------------------------------------------------------------
 * Page flow
 * --------------------------------------------------------------------
 */

/**
 * Initializing the shop if it hasn't been done in the bank page
 * And if shop hasn't been initialized, update computers with
 * values from storage
 */
if (computers == null) {
  loading.innerText = "Loading...";

  await API.initializeShop();

  computers = JSON.parse(sessionStorage.getItem("computers"));
  computerImages = JSON.parse(sessionStorage.getItem("images"));
}

// Linking computer to its image
for (const c of computers) {
  computerImages[c.id] = JSON.parse(sessionStorage.getItem("images"));
}

// Running the function that displays all computers
displayComputers();

/**
 * --------------------------------------------------------------------
 * Functions
 * --------------------------------------------------------------------
 */

/**
 * Function for creating the flex rows for each available computer
 */
async function displayComputers() {
  // Hide the loading text
  loading.style.visibility = "hidden";

  // Get the div
  const div = document.getElementById("computers");

  for (const computer of computers) {
    // Create new div and set it to a flex row
    const flexRow = document.createElement("div");
    flexRow.setAttribute("class", "flex-item");

    /**
     * Image Flex
     */
    const imgFlex = document.createElement("div");
    imgFlex.setAttribute("class", "flex-column");
    const img = document.createElement("img");
    img.setAttribute("src", computerImages[1][computer.id]);
    imgFlex.append(img);

    /**
     * Description Flex
     */
    const descFlex = document.createElement("div");
    descFlex.setAttribute("class", "flex-column");
    descFlex.style.width = "400px";

    /// Title
    const title = document.createElement("span");
    title.innerText = computer.title;
    title.setAttribute("class", "text");
    title.style.marginBottom = "10px";
    descFlex.append(title);

    /// Description
    const desc = document.createElement("div");
    desc.innerText = computer.description;
    desc.setAttribute("class", "desc");
    desc.style.marginBottom = "10px";
    descFlex.append(desc);

    /// Price
    const price = document.createElement("span");
    price.innerText = `${Utils.format(computer.price)}`;
    price.setAttribute("class", "text");
    price.style.marginBottom = "10px";
    descFlex.append(price);

    /// Buy button
    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";
    buyButton.addEventListener("click", () => {
      // Buying computer and changing the stock
      let stock = Utils.buyComputer(computer);
      computer.stock = stock;
      // Persisting the new stock amount
      sessionStorage.setItem("computers", JSON.stringify(computers));
    });
    buyButton.setAttribute("class", "button");
    descFlex.append(buyButton);

    /**
     * Specs FLEX
     */

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
    specsLabel.style.marginBottom = "5px";
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

    /**
     * Adding all flexboxes to the flex row
     */
    flexRow.append(imgFlex);
    flexRow.append(descFlex);
    flexRow.append(specsFlex);
    flexRow.style.marginBottom = "50px";
    // Appending flex row to the div
    div.append(flexRow);
  }
}
