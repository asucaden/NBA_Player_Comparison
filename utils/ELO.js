const K = 32;

const probability = (rating1, rating2) => {
  return (
    (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400))
  );
};

const updateElo = (r1, r2, winningPlayer) => {
  const p2 = probability(r1, r2);
  const p1 = probability(r2, r1);
  console.log("Before" + r1 + " " + r2);

  // If player A wins
  if (winningPlayer === 1) {
    r1 = r1 + K * (1 - p1);
    r2 = r2 + K * (0 - p2);
  } else if (winningPlayer === 2) {
    r1 = r1 + K * (0 - p1);
    r2 = r2 + K * (1 - p2);
  }
  console.log("After" + r1 + " " + r2);
  return [r1, r2];
};

module.exports = updateElo;
