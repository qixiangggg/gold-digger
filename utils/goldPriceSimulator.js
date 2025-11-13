let goldPrice = 2300; // starting price (USD per ounce)

// helper to get a small random change
function randomChange() {
  // small random % change, around ±0.05%
  const changePercent = (Math.random() - 0.5) * 0.001;
  return goldPrice * changePercent;
}

export function updateGoldPrice() {
  // occasionally add a bigger move to mimic volatility
  const bigMoveChance = Math.random();
  let change = randomChange();

  if (bigMoveChance < 0.01) { // 1% chance for a bigger move
    change += (Math.random() - 0.5) * 10; // ±$10
  }

  goldPrice += change;

  // round to 2 decimals
  goldPrice = Math.max(1800, Math.min(2700, goldPrice)); // keep realistic bounds
  goldPrice = parseFloat(goldPrice.toFixed(2));

  return goldPrice
}