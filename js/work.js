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
const repayLoanButton = document.getElementById("repayLoan");

updatePage();

workButton.addEventListener("click", function () {
  work();
});

repayLoanButton.addEventListener("click", () => {
  payLoan();
  updatePage();
});

function updatePage() {
  if (wallet != null) {
    wallet.innerText = format(getWallet());
  }
  if (loanExists()) {
    repayLoanButton.style.visibility = "visible";
  } else {
    repayLoanButton.style.visibility = "hidden";
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
