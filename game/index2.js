$(function () {
    let temp = [...Array(10).keys()]
    temp.shift()   // [1,2,3,4,5,6,7,8,9]
    var arr = [[],[],[],[],[],[],[],[],[]]
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
            let originR = r;

            if (r == 1) {
                r = 3
            } else if (r == 2) {
                r = 6
            } else if (r == 3) {
                r = 1
            } else if (r == 5) {
                r = 7
            } else if (r == 6) {
                r = 2
            } else if (r == 7) {
                r = 5
            }

            let i = r + c;
            while (i > temp.length - 1) {
                i = i - 9
            }

            arr[originR][c] = temp[i]
            r = originR
        }
    }
    console.log("arr:",arr)
    // arr.
    function disorder(){
        let res
        let r1 = [0,1,2]
        r1.sort(()=>{
           return Math.random() - 0.5
        })
        let r2 = [3,4,5]
        r2.sort(()=>{
            return Math.random() - 0.5
        })
        let r3 = [6,7,8]
        r3.sort(()=>{
            return Math.random() - 0.5
        })
        let all = [r1,r2,r3]
        all.sort(()=>{
            return Math.random() - 0.5
        })
        res = [...all[0],...all[1],...all[2]]
        return res;
    }
    let order1 =disorder(); // 横向
    console.log('1:',order1)
    let order2 = disorder();
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let inputBox = eval('l' + r)[c]
            inputBox.value = arr[order2[r]][order1[c]]
        }
    }
})