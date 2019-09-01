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
    console.log("arr:",arr)

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
    console.log(r)
})