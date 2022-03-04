
function uniqInArr(array) {
    let newArr = [];
    for (let i = 0; i < array.length; i++){
        if (!newArr.includes(array[i])){
            newArr.push(array[i]);
        }
    }
    return newArr;
}
function findDiff(array1, array2){
    let newArr = [];
    array1.forEach(element => {
      if (!array2.includes(element)){newArr.push(element)}  
    });
    return newArr;
}

module.exports = {
    uniq: uniqInArr,
    diff: findDiff,
};