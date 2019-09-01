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
    let arr = generateArray();

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
    let r = removeDuplicate(1,3,4,3,3,3)

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
            console.log('row:',row)
            if(row[columnIndex][value]){
                valueInCurrentColumn.push(row[columnIndex][value])
            }
        }
    }

    // set value
    var blockNums = [1,2,3,4,5,6,7,8,9]
    function setValue(row,column){

    }
    var firstOneInBlock = function(){
        let firstOne = []
        for(let r=0;r<9;r++){
            if(r%3==0){
                firstOne.push([r,0],[r,3],[r,6])
            }
        }
        return firstOne
    }()
    console.log("f:",firstOneInBlock)


})