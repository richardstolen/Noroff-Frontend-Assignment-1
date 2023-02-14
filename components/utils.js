import Bank from "./banker.js";

/**
 * Helper module
 */

/**
 * Initializing session storage with 0 values.
 */
function initializeStorage() {
  sessionStorage.setItem("balance", 0);
  sessionStorage.setItem("loan", 0);
  sessionStorage.setItem("wallet", 0);
}

/**
 * Format number to NOK with no decimals
 * @param {int} num
 * @returns Formatted number
 */
function format(num) {
  const NOK = new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return NOK.format(num);
}

function buyComputer(computer) {
  if (Bank.getBalance() < computer.price) {
    alert("You can't afford this computer!");
  } else if (computer.stock < 1) {
    alert("Out of stock");
    return 0;
  } else {
    computer.stock -= 1;
    Bank.subtractFromBalance(computer.price);
    alert(`Congratulations, you just bought a ${computer.title}`);
    return computer.stock;
  }
}

const Util = {
  initializeStorage,
  format,
  buyComputer,
};

export default Util;
