function CheckAverage(array){
    const sum = array.reduce((a, b) => a + b, 0);
    const avg =  (sum / array.length) || 0;
    return Math.round((avg + Number.EPSILON) * 100) / 100
}
export default CheckAverage;