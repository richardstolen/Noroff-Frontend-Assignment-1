import {
  addToBalance,
  addToWallet,
  depositMoney,
  format,
  getWallet,
} from "./helper.js";

const wallet = document.getElementById("wallet");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");

workButton.addEventListener("click", function () {
  work();
});

let NOK = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
});

depositButton.addEventListener("click", function () {
  depositMoney();
  updateWallet();
  console.log(getWallet());
});

updateWallet();

function updateWallet() {
  if (wallet != null) {
    wallet.innerText = format(getWallet());
  }
}

function work() {
  addToWallet();
  updateWallet();
}
