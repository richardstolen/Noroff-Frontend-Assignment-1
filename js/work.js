import {
  addToBalance,
  addToWallet,
  depositMoney,
  format,
  getWallet,
  payLoan,
  loanExists,
  getLoan,
} from "./helper.js";

const wallet = document.getElementById("wallet");
const loan = document.getElementById("loan");
const loanText = document.getElementById("loanText");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");
const payLoanButton = document.getElementById("repayLoan");

workButton.addEventListener("click", function () {
  addToWallet();
  updatePage();
});

depositButton.addEventListener("click", function () {
  depositMoney();
  updatePage();
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
    loan.style.display = "block";
    loanText.style.display = "block";
    payLoanButton.style.visibility = "visible";
    loan.innerText = format(getLoan());
  } else {
    // If no loan hide text and repay loan button
    loan.style.display = "none";
    loanText.style.display = "none";
    payLoanButton.style.visibility = "hidden";
  }
}

updatePage();
