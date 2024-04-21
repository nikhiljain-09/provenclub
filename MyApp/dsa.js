const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];


function getMaxSubArr(dataArr) {

    let initIndex = 0;
    let maxNum = 0;
    let currentTotalVal = 0;

    let startIndex = 0;
    let endIndex = 0;

    for (let index = 0; index < dataArr.length; index++) {
        const element = dataArr[index];

        currentTotalVal += element;
        // get start index and last index of max sub array

        // if maxNum is less than currentTotalVal then replace maxNum wtih new sum and update index of start, end
        if (maxNum < currentTotalVal) {
            maxNum = currentTotalVal;
            startIndex = initIndex;
            endIndex = index;
        }

        // if currentTotalVal is less than 0 then update it as 0 and increment initIndex with index +1
        if (currentTotalVal < 0) {
            currentTotalVal = 0;
            initIndex = index + 1
        }
    }

    return dataArr.slice(startIndex, endIndex + 1)

}


const res = getMaxSubArr(array);
console.log(res);