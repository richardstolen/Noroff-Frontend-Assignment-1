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

const balance = document.getElementById("balance");
const loan = document.getElementById("loan");
const loanText = document.getElementById("loanText");
const getLoanButton = document.getElementById("getLoan");
const repayLoanButton = document.getElementById("repayLoan");
const buttonDiv = document.getElementById("buttons");

if (getBalance() == null) {
  initializeStorage();
  API.initializeShop();
}
updateBalanceAndLoan();

function updateBalanceAndLoan() {
  if (balance != null) {
    balance.innerText = format(getBalance());
  }

  if (loanExists()) {
    console.log(getLoan());
    // If there is a loan make loan text and button visible
    loan.style.display = "block";
    loanText.style.display = "block";
    repayLoanButton.style.visibility = "visible";
    loan.innerText = format(getLoan());
  } else {
    // If no loan hide text and repay loan button
    loan.style.display = "none";
    loanText.style.display = "none";
    repayLoanButton.style.visibility = "hidden";
  }
}

getLoanButton.addEventListener("click", addLoan);

repayLoanButton.addEventListener("click", () => {
  payLoan();
  updateBalanceAndLoan();
});

function addLoan() {
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
    updateBalanceAndLoan();
  }
}

function addLoanButton() {}

function removeLoanButton() {}
