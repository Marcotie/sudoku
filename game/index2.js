$(function () {
    let temp = [...Array(10).keys()]
    temp.shift()   // [1,2,3,4,5,6,7,8,9]

    //
    var l0 = $(".l0>span>input")
    var l1 = $(".l1>span>input")
    var l2 = $(".l2>span>input")
    var l3 = $(".l3>span>input")
    var l4 = $(".l4>span>input")
    var l5 = $(".l5>span>input")
    var l6 = $(".l6>span>input")
    var l7 = $(".l7>span>input")
    var l8 = $(".l8>span>input")

    var i;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let inputBox = eval('l' + r)[c]
            let i = r + c;
            while(i>temp.length - 1){
                i = i - 9
            }
            console.log("i:",i)
            inputBox.value = temp[i]
        }
    }

})