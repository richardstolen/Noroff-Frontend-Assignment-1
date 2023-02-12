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
  let newBalance = parseInt(getBalance()) + parseInt(num);

  return sessionStorage.setItem("balance", newBalance);
}
export function setBalance(num) {
  return sessionStorage.setItem("balance", parseInt(num));
}

// Loan methods

export function getLoan() {
  return sessionStorage.getItem("loan");
}

export function loanExists() {
  let loan = sessionStorage.getItem("loan");
  if (loan == 0) {
    return false;
  } else {
    return true;
  }
}

export function addToLoan(num) {
  let loan = parseInt(getLoan());
  let newLoan = loan + parseInt(num);
  return sessionStorage.setItem("loan", newLoan);
}

export function payLoan(num) {
  let loan = parseInt(getLoan());
  let balance = parseInt(getBalance());
  console.log(loan);
  let newLoan = 0;
  if (num != null) {
    newLoan = loan - num;
  } else if (balance < loan) {
    newLoan = loan - balance;
  } else {
    let newBalance = balance - loan;
    setBalance(newBalance);
  }
  return sessionStorage.setItem("loan", newLoan);
}

// Pay/work methods - called it wallet

export function getWallet() {
  return sessionStorage.getItem("wallet");
}

export function setWallet(num) {
  return sessionStorage.setItem("wallet", parseInt(num));
}

export function addToWallet() {
  let wallet = parseInt(getWallet());
  let loan = parseInt(getLoan());
  let newWallet = 0;
  if (loan != 0) {
    payLoan(10);
    newWallet = wallet + 90;
  } else {
    newWallet = wallet + 100;
  }

  return sessionStorage.setItem("wallet", newWallet);
}

export function depositMoney() {
  let wallet = parseInt(getWallet());
  sessionStorage.setItem("wallet", 0);
  addToBalance(wallet);
}

// Format number to NOK
export function format(num) {
  let NOK = new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return NOK.format(num);
}
