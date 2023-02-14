import Bank from "../components/banker.js";
import Utils from "../components/utils.js";
import Wallet from "../components/wallet.js";

// Div and elements
const wallet = document.getElementById("wallet");
const loan = document.getElementById("loan");
const loanText = document.getElementById("loanText");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");
const payLoanButton = document.getElementById("repayLoan");

// Adding event listeners to the buttons
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

/**
 * --------------------------------------------------------------------
 * Page flow
 * --------------------------------------------------------------------
 */

// Updating page on load
updatePage();

/**
 * --------------------------------------------------------------------
 * Functions
 * --------------------------------------------------------------------
 */

/**
 * Updating the page with relevant information
 */
function updatePage() {
  if (wallet != null) {
    // Show wallet amount
    wallet.innerText = Utils.format(Wallet.getWallet());
  }
  if (Bank.loanExists()) {
    // If loan exists make the relevant elements visible
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
