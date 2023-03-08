function CheckAverage(array) {
  const avg = (array.reduce((a, b) => a + b, 0) / array.length) || 0;
  return avg.toFixed(2);
}

export default CheckAverage;
