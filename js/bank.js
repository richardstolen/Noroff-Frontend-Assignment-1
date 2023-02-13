import {
  addToBalance,
  getBalance,
  initializeStorage,
  getLoan,
  addToLoan,
  payLoan,
  loanExists,
  format,
} from "./helper.js";

import API from "./api-handler.js";

export default class extends HTMLElement {
  #shadow;
  #cssfile = "./style.css";

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "closed" });
    this.#createLink();
    this.#createHTML();

    this.#updateBalanceAndLoan();
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

  #createHTML() {
    const wrapper = document.createElement("div");
    const content = `
    <div class="flexbox-container">
      <div class="flex-item">
        <div class="text">Balance</div>
        <div class="text" id="balance"></div>
      </div>

      <div class="flex-item">
        <div class="text" id="loanText">Loan</div>
        <div class="text" id="loan"></div>
      </div>

      <button id="getLoan" class="button" style="margin: 50px">
        Get a loan
      </button>
    </div>
    `;

    wrapper.insertAdjacentHTML("beforeend", content);
    this.#shadow.appendChild(wrapper);
    this.#shadow
      .querySelector("#getLoan")
      .addEventListener("click", this.#addLoan);
  }

  #updateBalanceAndLoan() {
    const balance = this.#shadow.querySelector("#balance");
    if (balance === null) {
      initializeStorage();
      API.initializeShop();
    }
    const loan = this.#shadow.querySelector("#loan");
    const loanText = this.#shadow.querySelector("#loanText");
    const getLoanButton = this.#shadow.querySelector("#getLoan");

    if (balance != null) {
      balance.innerText = format(getBalance());
    }

    if (loanExists()) {
      console.log(getLoan());
      // If there is a loan make loan text and button visible
      loan.style.display = "block";
      loanText.style.display = "block";

      loan.innerText = format(getLoan());
    } else {
      // If no loan hide text and repay loan button
      loan.style.display = "none";
      loanText.style.display = "none";
    }
  }
  #addLoan() {
    let amount = prompt("How much loan do you want?", "0");
    if (amount === null || isNaN(amount)) {
      alert("Invalid input!");
      return;
    } else if (loanExists()) {
      alert("You can only have 1 loan!!");
    } else if (amount > getBalance() * 2) {
      alert("Loan amount can't be more than double your balance");
    } else {
      addToBalance(amount);
      addToLoan(amount);
      this.#updateBalanceAndLoan();
    }
  }
}
