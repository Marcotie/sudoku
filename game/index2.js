$(function () {
    // init 9 array
    var arr = []
    for (let i = 0; i < 9; i++) {
        let temp = [...Array(10).keys()]
        temp.shift()
        let cut = temp.splice(0, i)
        temp.push(...cut)
        arr[i] = temp
    }
    console.log(arr)


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

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let inputBox = eval('l' + r)[c]

            let t;
            switch (r) {
                case 1:
                    t = 3;
                    break;
                case 2:
                    t = 6;
                    break;
                case 3:
                    t = 1;
                    break;
                case 5:
                    t = 7;
                    break;
                case 6:
                    t = 2;
                    break;
                case 7:
                    t = 5;
                    break;
                case 8:
                default:
                    t = r;
            }
            // console.log("t:",r,t)

            inputBox.value = arr[t][c]
        }
    }

})