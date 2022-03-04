
function uniqInArr(array) {
    let newArr = [];
    for (let i = 0; i < array.length; i++){
        if (!newArr.includes(array[i])){
            newArr.push(array[i]);
        }
    }
    return newArr;
}

module.exports = {
    uniq: uniqInArr,
};