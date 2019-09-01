$(function(){
    // generate 1 ~ 9 suffertd array
    function generateArray(){
        let arr = [...Array(10).keys()]
        arr.shift();
        arr.sort((x,y)=>{
            return Math.random()*2 - 1
        })
        return arr;
    }

    // remove duplicate
    function removeDuplicate(...nums){
        let res = [];
        nums.reduce((prev,curr)=>{
            if(!res.includes(curr)){
                res.push(curr)
            }
        },[])
        return res;
    }

    // get row
    var l0 =$(".l0>span>input")
    var l1 =$(".l1>span>input")
    var l2 =$(".l2>span>input")
    var l3 =$(".l3>span>input")
    var l4 =$(".l4>span>input")
    var l5 =$(".l5>span>input")
    var l6 =$(".l6>span>input")
    var l7 =$(".l7>span>input")
    var l8 =$(".l8>span>input")

    var blockNums = [] // 初始化时，1个九宫格里已经填了的值

    // gather nums by position
    function getUnavailableValue(rowIndx,columnIndex){
        // row
       let currentRow = eval('l'+rowIndx)
       let valueInCurrentRow = []
        for(let c =0;c<columnIndex;c++){
            let v = currentRow[c].value
            currentRow[c].value = c
            if(v &&v!=0){
                valueInCurrentRow.push(c)
            }
        }
        // column
        let valueInCurrentColumn = []
        for(let r =0;r<rowIndx;r++){
            let row = eval('l'+r)
            if(row[columnIndex][value]){
                valueInCurrentColumn.push(row[columnIndex][value])
            }
        }
        return removeDuplicate(...valueInCurrentRow, ...valueInCurrentColumn)
    }

    // set value
    var firstOneInBlock = function(){
        let firstOne = []
        for(let r=0;r<9;r++){
            if(r%3==0){
                firstOne.push([r,0],[r,3],[r,6])
            }
        }
        return firstOne
    }()
    function setValue(row,column){
        let inputBox = eval('l'+row)[column]
        
        if(firstOneInBlock(row,column)){
            blockNums = [1,2,3,4,5,6,7,8,9]
        }
        let pond = remove([1,2,3,4,5,6,7,8,9],blockNums)
        let rowColumnAlreadyHaveValue = getUnavailableValue(row,column)
        let leftNums = remove(pond,rowColumnAlreadyHaveValue)

    }
    function remove(arr, rest){
        for(let i in rest){
            let index = arr.indexOf(rest[i])
            console.log(i,rest[i],index)

            if(index>-1){
                arr.splice(index,1)
            }
        }

    }
    let arr = [1,2,3]
    let r = remove(arr,[1,2])
    console.log("r:",arr)

})