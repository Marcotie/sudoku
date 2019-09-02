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
    var arr0 = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];
    var arr5 = [];
    var arr6 = [];
    var arr7 = [];
    var arr8 = [];
    var blockNums = []

    // gather nums by position
    function getUnavailableValue(rowIndx, columnIndex) {
        // row
        let currentRow = eval('l' + rowIndx)
        let valueInCurrentRow = []
        for (let c = 0; c < columnIndex; c++) {
            let v = currentRow[c].value
            if (v && v != 'undefined') {
                valueInCurrentRow.push(v)
            }
        }
        // column
        let valueInCurrentColumn = []
        for (let r = 0; r < rowIndx; r++) {
            let row = eval('l' + r)
            let inputBox = row[columnIndex]
            if(inputBox.value !='undefined'){
                valueInCurrentColumn.push(inputBox.value)
            }
        }
        // block
        let blockIndex = locateBlock(rowIndx,columnIndex)
        let currentBlock = eval('arr'+blockIndex)
        return removeDuplicate(...valueInCurrentRow, ...valueInCurrentColumn, ...arr2string(currentBlock))
    }
    function locateBlock(row,column){
        let b;
        if(row>5){
            if(column>5){
                b = 8
            }else if(column>2){
                b = 7
            }else{
                b = 6
            }
        }else if(row >2){
            if(column>5){
                b = 5
            }else if(column>2){
                b = 4
            }else{
                b = 3
            }
            
        }else{
            if(column>5){
                b = 2
            }else if(column>2){
                b = 1
            }else{
                b = 0
            }
        }
        return b;
    }
    // arr to string
    function arr2string(arr){
        for(let i = 0;i<arr.length;i++){
            arr[i] = String(arr[i])
        }
        return arr
    }
    // set value
    function setValue(row, column) {
        let inputBox = eval('l' + row)[column]
        let exclusiveArr = getUnavailableValue(row, column)
        let n = pick(exclusiveArr)
        inputBox.value = n
        
        let blockIndex = locateBlock(row,column)
        let currentBlock = eval('arr'+blockIndex)
        currentBlock.push(n)
        return n;
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
        let arr = arr2string([1,2,3,4,5,6,7,8,9]);
        remove(arr,exclusiveArr)
        let i = Math.floor(Math.random()*arr.length)
        if(arr[i]==undefined){
        }
        return arr[i]
    }


    var n = 1;
    function start(){
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 9; c++) {
                let v = setValue(r, c)
                if(typeof v == 'undefined'){
                    console.log('n:',n++)
                    break;
                }
            }
        }
    }
    
    start()
})