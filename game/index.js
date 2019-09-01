$(function () {
    // generate 1 ~ 9 suffertd array
    function generateArray() {
        let arr = [...Array(10).keys()]
        arr.shift();
        arr.sort((x, y) => {
            return Math.random() * 2 - 1
        })
        return arr;
    }

    // remove duplicate
    function removeDuplicate(...nums) {
        let res = [];
        nums.reduce((prev, curr) => {
            if (!res.includes(curr)) {
                res.push(curr)
            }
        }, [])
        return res;
    }

    // get row
    var l0 = $(".l0>span>input")
    var l1 = $(".l1>span>input")
    var l2 = $(".l2>span>input")
    var l3 = $(".l3>span>input")
    var l4 = $(".l4>span>input")
    var l5 = $(".l5>span>input")
    var l6 = $(".l6>span>input")
    var l7 = $(".l7>span>input")
    var l8 = $(".l8>span>input")
    var blockNums = []

    // gather nums by position
    function getUnavailableValue(rowIndx, columnIndex) {
        // row
        let currentRow = eval('l' + rowIndx)
        let valueInCurrentRow = []
        for (let c = 0; c < columnIndex; c++) {
            let v = currentRow[c].value
            currentRow[c].value = c
            if (v && v != 0) {
                valueInCurrentRow.push(c)
            }
        }
        // column
        let valueInCurrentColumn = []
        for (let r = 0; r < rowIndx; r++) {
            let row = eval('l' + r)
            let inputBox = row[columnIndex]
                valueInCurrentColumn.push(inputBox.valu)
        }

        return removeDuplicate(...valueInCurrentRow, ...valueInCurrentColumn, ...blockNums)
    }

    // set value
    var firstOneInBlock = function (row, column) {
        let firstOne = []
        if(row==0 || row == 3 || row ==6){
            let sub = Math.abs(row-column)
            if(sub == 0 || sub == 3 || sub == 6){
                return true;
            }
        }
        return false;
    }

    function setValue(row, column) {
        let inputBox = eval('l' + row)[column]
        let fullArr = [1,2,3,4,5,6,7,8,9]
        
        if (firstOneInBlock(row, column)) {
            blockNums = []
        }

        let exclusiveArr = getUnavailableValue(row, column)

        let n = pick(exclusiveArr)

        inputBox.value = n
        console.log(n,blockNums)
        blockNums.push(n)
    }
    function remove(arr, rest) {
        for (let i in rest) {
            let index = arr.indexOf(rest[i])

            if (index > -1) {
                arr.splice(index, 1)
            }
        }
    }

    function pick(exclusiveArr) {
        let arr = generateArray()
        remove(arr,getUnavailableValue)
        let i = Math.floor(Math.random()*arr.length)
        return arr[i]
    }


    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            setValue(r, c)
        }
    }

})