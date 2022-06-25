function CheckSum(array){
    return array.reduce((a, b) => a + b, 0);
}
export default CheckSum;