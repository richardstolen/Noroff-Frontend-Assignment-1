import {
  addToBalance,
  getBalance,
  initializeStorage,
  getLoan,
  addToLoan,
} from "./helper.js";

const balance = document.getElementById("balance");
const loan = document.getElementById("loan");
const loanText = document.getElementById("loanText");
const getLoanButton = document.getElementById("getLoan");

if (getBalance() == null) {
  initializeStorage();
}
updateBalanceAndLoan();

function updateBalanceAndLoan() {
  if (balance != null) {
    balance.innerText = getBalance();
  }
  if (getLoan() != 0) {
    loan.style.display = "block";
    loanText.style.display = "block";
    loan.innerText = getLoan();
  } else {
    loan.style.display = "none";
    loanText.style.display = "none";
  }
}

getLoanButton.addEventListener("click", function () {
  addLoan();
});

function addLoan() {
  let amount = prompt("How much loan do you want?", "0");
  if (getLoan() != 0) {
    alert("You can only have 1 loan!!");
  } else if (amount > getBalance() * 2) {
    alert("Loan amount can't be more than double your balance");
  } else {
    addToBalance(amount);
    addToLoan(amount);
    updateBalanceAndLoan();
  }
}
