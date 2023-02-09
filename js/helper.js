// Initialize storage with 0 values

export function initializeStorage() {
  sessionStorage.setItem("balance", 0);
  sessionStorage.setItem("loan", 0);
  sessionStorage.setItem("wallet", 0);
}

// Balance methods

export function getBalance() {
  return sessionStorage.getItem("balance");
}

export function addToBalance(num) {
  let balance = parseInt(getBalance());
  let newBalance = balance + parseInt(num);

  return sessionStorage.setItem("balance", newBalance);
}

// Loan methods

export function addToLoan(num) {
  let loan = parseInt(getLoan());
  let newLoan = loan + parseInt(num);
  return sessionStorage.setItem("loan", newLoan);
}

export function getLoan() {
  return sessionStorage.getItem("loan");
}

// Pay/work methods - called it wallet

export function getWallet() {
  return sessionStorage.getItem("wallet");
}

export function addToWallet() {
  let wallet = parseInt(getWallet());
  let loan = parseInt(getLoan());
  if (loan != 0) {
  }
  let newWallet = wallet + 100;
  return sessionStorage.setItem("wallet", newWallet);
}

export function depositMoney() {
  let wallet = parseInt(getWallet());
  sessionStorage.setItem("wallet", 0);
  addToBalance(wallet);
}
