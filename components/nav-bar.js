export default class extends HTMLElement {
  #shadow;
  #cssfile = "../css/navbar.css";
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

    //Use directory of script as directory of css file
    //const path = import.meta.url.match(/.*\//)[0];
    link.href = this.#cssfile;
    link.rel = "stylesheet";
    link.type = "text/css";
    this.#shadow.appendChild(link);
    return link;
  }

  #createHTML() {
    const wrapper = document.createElement("div");

    const content = `
        <div class="flex-item" style="margin-bottom: 100px">
            <nav class="navMenu">
            <a href="index.html"> <active>Bank</active></a>
            <a href="work.html">Work</a>
            <a href="shop.html">Shop</a>
            <div class="dot"></div>
            </nav>
        </div>
    `;

    wrapper.insertAdjacentHTML("beforeend", content);
    this.#shadow.appendChild(wrapper);

    return wrapper;
  }
}
