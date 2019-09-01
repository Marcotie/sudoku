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
    getUnavailableValue(3,4)
    function setValue(row,column){

    }

})