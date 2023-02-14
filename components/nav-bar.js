export default class extends HTMLElement {
  #shadow;
  #cssfile = "../css/nav-bar.css";

  /**
   * Constructor for nav-bar.js
   */
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });
    this.#createLink();
    this.#createHTML();
  }

  /**
   * Links the CSS style sheet
   */
  #createLink() {
    const link = document.createElement("link");
    link.href = this.#cssfile;
    link.rel = "stylesheet";
    link.type = "text/css";
    this.#shadow.appendChild(link);
    return link;
  }

  /**
   * HTML for navigation bar
   */
  #createHTML() {
    const wrapper = document.createElement("div");
    const content = `
        <div class="flex-column" style="margin-bottom: 80px">
        <nav class="navMenu">
        
        <a href="index.html" id="Bank">Bank</a>
        <a href="work.html" id="Work">Work</a>
        <a href="shop.html" id="Shop">Shop</a>
        <div class="dot"></div>
        
        </nav>
        </div>
      `;

    wrapper.insertAdjacentHTML("beforeend", content);
    this.#shadow.appendChild(wrapper);

    // Set active, highlights current page
    const active = this.attributes.active.value;

    const activeLink = this.#shadow.querySelector(`#${active}`);
    activeLink.innerHTML = `<active>${active}</active>`;

    return wrapper;
  }
}

// Creating a custom nav-bar element
import NavBar from "/components/nav-bar.js";
customElements.define("nav-bar", NavBar);
