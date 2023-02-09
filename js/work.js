import {
  addToBalance,
  addToWallet,
  depositMoney,
  getWallet,
} from "./helper.js";

const wallet = document.getElementById("wallet");
const workButton = document.getElementById("workButton");
const depositButton = document.getElementById("depositButton");

workButton.addEventListener("click", function () {
  work();
});

depositButton.addEventListener("click", function () {
  depositMoney();
  updateWallet();
  console.log(getWallet());
});

updateWallet();

function updateWallet() {
  if (wallet != null) {
    wallet.innerText = getWallet();
  }
}

function work() {
  addToWallet();
  updateWallet();
  console.log(getWallet());
}
