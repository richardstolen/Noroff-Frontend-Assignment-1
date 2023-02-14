import API from "../components/api-handler.js";
import Bank from "../components/banker.js";
import Utils from "../components/utils.js";

// Divs
const balance = document.getElementById("balance");
const loan = document.getElementById("loan");
const loanText = document.getElementById("loanText");

// Get loan button
const getLoanButton = document.getElementById("getLoan");
getLoanButton.addEventListener("click", addLoan);

/**
 * -----------
 * Page flow
 * -----------
 */

/**
 * When loading page for first time, balance is null
 * Then we do a initialization where balance and loan is set to 0
 * We also start the shop initialization. This will load in the background.
 */
if (Bank.getBalance() === null) {
  Utils.initializeStorage();
  updatePage();
  await API.initializeShop();
}

/**
 * When loading the page later, only updatePage is called
 */
updatePage();

/**
 * -----------
 * Functions
 * -----------
 */

/**
 * Updates all the divs and elements displayed on the page
 */
function updatePage() {
  if (balance != null) {
    // Set balance amount
    balance.innerText = Utils.format(Bank.getBalance());
  }

  if (Bank.loanExists()) {
    // If there is a loan make loan text and button visible
    loan.style.display = "block";
    loanText.style.display = "block";
    // Set loan amount
    loan.innerText = Utils.format(Bank.getLoan());
  } else {
    // If no loan hide text and repay loan button
    loan.style.display = "none";
    loanText.style.display = "none";
  }
}

/**
 * When pressing get a loan this executes.
 * Handles adding a new loan.
 */
function addLoan() {
  let amount = prompt("How much loan do you want?", "0");

  if (amount === null || isNaN(amount)) {
    // If invalid input
    alert("Invalid input!");
    return;
  } else if (Bank.loanExists()) {
    // If there already exists a loan
    alert("You can only have 1 loan!!");
  } else if (amount > Bank.getBalance() * 2) {
    // If loan amount is too large
    alert("Loan amount can't be more than double your balance");
  } else {
    // Add loan amount to balance
    Bank.addToBalance(amount);
    // Add loan amount to loan
    Bank.addToLoan(amount);
    updatePage(); // Refresh page
  }
}
