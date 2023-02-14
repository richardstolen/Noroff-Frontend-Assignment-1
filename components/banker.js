import Wallet from "./wallet.js";

/**
 * Banker module
 * Handling balance and loan
 */

// Using sessionStorage for easier testing
const storage = sessionStorage;

/**
 * --------------------------------------------------------
 * Balance methods
 */

/**
 * Get balance
 * @returns balance
 */
function getBalance() {
  return storage.getItem("balance");
}

/**
 * Increases balance with number
 * @param {int} num
 */
function addToBalance(num) {
  let newBalance = parseInt(getBalance()) + parseInt(num);
  storage.setItem("balance", newBalance);
}

/**
 * Decrease balance with number
 * @param {int} num
 */
function subtractFromBalance(num) {
  let newBalance = parseInt(getBalance()) - parseInt(num);
  storage.setItem("balance", newBalance);
}

/**
 * Sets balance to specific number
 * @param {int} num
 * @returns
 */
function setBalance(num) {
  storage.setItem("balance", parseInt(num));
}

/**
 * --------------------------------------------------------
 * Loan methods
 */

/**
 * Get currenct loan amount
 * @returns loan amount
 */
function getLoan() {
  return storage.getItem("loan");
}

/**
 * Check if the user currently has a loan
 * @returns bool
 */
function loanExists() {
  let loan = storage.getItem("loan");
  if (loan == 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * Add amount to loan
 * @param {int} num
 */
function addToLoan(num) {
  let currentLoan = parseInt(getLoan());
  let newLoan = currentLoan + parseInt(num);
  storage.setItem("loan", newLoan);
}

/**
 * Pay down loan
 * @param {int} num
 * @returns
 */
function payLoan(num) {
  let loan = parseInt(getLoan());
  let wallet = parseInt(Wallet.getWallet());
  let newLoan = 0;
  if (num != null) {
    // Pay down loan when working
    newLoan = loan - num;
  } else if (wallet < loan) {
    // If wallet is less than the loan, pay down all you have
    newLoan = loan - wallet;
    Wallet.setWallet(0);
  } else {
    // Pay down all of the loan (not changing newLoan from 0)
    let newWallet = wallet - loan;
    Wallet.setWallet(newWallet);
  }
  return storage.setItem("loan", newLoan);
}

// Exporting --------------
const Bank = {
  getBalance,
  addToBalance,
  subtractFromBalance,
  setBalance,
  getLoan,
  loanExists,
  addToLoan,
  payLoan,
};

export default Bank;
