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
})