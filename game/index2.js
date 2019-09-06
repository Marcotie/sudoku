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

    var arr;
    var checkArr = [];
    function generateAll() {
        var i;
        var res = [[], [], [], [], [], [], [], [], []]

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

                res[originR][c] = temp[i]
                r = originR
            }
        }
        return res;
    }


    function disorder() {
        let res
        let r1 = [0, 1, 2]
        r1.sort(() => {
            return Math.random() - 0.5
        })
        let r2 = [3, 4, 5]
        r2.sort(() => {
            return Math.random() - 0.5
        })
        let r3 = [6, 7, 8]
        r3.sort(() => {
            return Math.random() - 0.5
        })
        let all = [r1, r2, r3]
        all.sort(() => {
            return Math.random() - 0.5
        })
        res = [...all[0], ...all[1], ...all[2]]
        return res;
    }


    function emptyFlag(level) {
        let chance;
        switch (level) {
            case 'easy':
                chance = 0.5;
                break;
            case 'middle':
                chance = 0.4;
                break;
            case 'hard':
                chance = 0.3;
        }
        return Math.random() > chance
    }
    function reset(){
        $(':input').val('');
        $("#clock").text('time: 0 s');
    }
    function draw(level = 'easy'){
        reset();
        arr = generateAll();

        let order1 = disorder(); // 横向
        let order2 = disorder(); // 纵向

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let inputBox = eval('l' + r)[c]
                let v = arr[order2[r]][order1[c]]
                checkArr.push(v)

                if(emptyFlag(level)){
                    $(inputBox).attr('readonly',false)
                    continue;
                }
                $(inputBox).css('color','green')
                inputBox.value = v
            }
        }
    }

    var clockInterval;
    $('#btnBox button').click(function(){
        let level = $(this).attr('id');
        draw(level);
        let n =0;
        clockInterval = setInterval(function(){
            $("#clock").text('time:' + ++n + ' s');
        }, 1000);
    })
    $(':input').on('input',function(){
        let v = $(this).val()
        if(isNaN(v)){
            $(this).val('')
            return false;
        }
        
        if(v.toString().length>0){
            v = v.toString().slice(-1)
        }
        $(this).val(v)
       if(check()){
           clearInterval(clockInterval);
           let msg = "Congratulations!"
           $("#msg").text(msg)
       }
    })

    function check(){
        let allInput = $(':input').map(function(idx,elem){
            return $(elem).val();
        }).get();
        let filterArr = allInput.filter(item =>{
            return item!=''
        })
        if(filterArr.length<81){
            return false;
        }
        for(let i = 0;i<filterArr.length;i++){
            if(filterArr[i]!=checkArr[i]){
                $('#msg').text('第 '+i +'个空里边，值'+ filterArr[i]+ ' 不对')
                return false;
            }
        }
        return true;   
    }
})
