import {
  addToBalance,
  addToWallet,
  depositMoney,
  format,
  getWallet,
  payLoan,
  loanExists,
} from "./helper.js";

const wallet = document.getElementById("wallet");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");
const payLoanButton = document.getElementById("repayLoan");

updatePage();

workButton.addEventListener("click", function () {
  work();
});

payLoanButton.addEventListener("click", () => {
  payLoan();
  updatePage();
});

function updatePage() {
  if (wallet != null) {
    wallet.innerText = format(getWallet());
  }
  if (loanExists()) {
    payLoanButton.style.visibility = "visible";
  } else {
    payLoanButton.style.visibility = "hidden";
  }
}

depositButton.addEventListener("click", function () {
  depositMoney();
  updatePage();
});

function work() {
  addToWallet();
  updatePage();
}
