import Bank from "../components/banker.js";
import Utils from "../components/utils.js";
import Wallet from "../components/wallet.js";

const wallet = document.getElementById("wallet");
const loan = document.getElementById("loan");
const loanText = document.getElementById("loanText");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");
const payLoanButton = document.getElementById("repayLoan");

workButton.addEventListener("click", function () {
  Wallet.addToWallet();
  updatePage();
});

depositButton.addEventListener("click", function () {
  Wallet.depositMoney();
  updatePage();
});

payLoanButton.addEventListener("click", () => {
  Bank.payLoan();
  updatePage();
});

function updatePage() {
  if (wallet != null) {
    wallet.innerText = Utils.format(Wallet.getWallet());
  }
  if (Bank.loanExists()) {
    loan.style.display = "block";
    loanText.style.display = "block";
    payLoanButton.style.visibility = "visible";
    loan.innerText = Utils.format(Bank.getLoan());
  } else {
    // If no loan hide text and repay loan button
    loan.style.display = "none";
    loanText.style.display = "none";
    payLoanButton.style.visibility = "hidden";
  }
}

updatePage();
