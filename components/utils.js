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

const Util = {
  initializeStorage,
  format,
};

export default Util;
