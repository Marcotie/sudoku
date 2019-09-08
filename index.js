$(function () {
    let temp = [1,2,3,4,5,6,7,8,9]
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

    var checkArr = []; // 完整的数组
    var score = 0;
    var record = Number(localStorage.getItem('record'));
    if(record){
        $('#record').text(n2time(record))
    }
    function generateAll() {
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
                chance = 0.7;
                break;
            case 'middle':
                chance = 0.5;
                break;
            case 'hard':
                chance = 0.3;
        }
        return Math.random() > chance
    }
    function reset(){
        $(':input').val('');
        $("#clock").text('00:00');
        checkArr = [];
        score = 0;
    }
    function draw(level = 'easy'){
        reset();
        let arr = generateAll();

        let order1 = disorder(); // 横向
        let order2 = disorder(); // 纵向

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let inputBox = eval('l' + r)[c]
                let v = arr[order2[r]][order1[c]]
                checkArr.push(v)

                if(emptyFlag(level)){
                    $(inputBox).css('color','black')
                    $(inputBox).attr('readonly',false)
                    continue;
                }else{
                    $(inputBox).css('color','green')
                    inputBox.value = v
                }

            }
        }
    }

    var clockInterval;
    $('#btnBox button').click(function(){
        $('.l span').removeClass('error')
        clearInterval(clockInterval);
        let level = $(this).attr('id');
        draw(level);

        clockInterval = setInterval(function(){
            score++;
            let time = n2time(score);
            $("#clock").text(time);
        }, 1000);
    })
    function n2time(n){
        if(typeof n !='number'){return false}
        let res = '';
        let minutes = Math.floor(n / 60);
        let seconds = n % 60;
        if(seconds<10){
            seconds = '0'+seconds;
        }
        if(minutes > 0){
            res = minutes+':'+seconds
        }else{
            res = '00:'+seconds
        }
        return res;
    }
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

    })
    $(':input').on('keyup',function(e){
        let key = e.which;
        let dom = $(this);
        if(key == 38){ // 上
            let index = $('.l input').index(this)
            let upper = index - 9
            if(upper<0){
                return false;
            }
            dom = number2dom(upper)
        }
        if(key == 40){ // 下
            let index = $('.l input').index(this)
            let lower = index + 9
            if(lower<0){
                return false;
            }
            dom = number2dom(lower)
        }
        if(key == 37){ // 左
            dom = $(this).parent().prev().children()
        }
        if(key == 39){ // 右
            dom = $(this).parent().next().children()
        }
        if(dom){
            dom.focus();
        }
    })
    $('#check').click(function(){
        $('.l span').removeClass('error')

        let allInput = $(':input').map(function(idx,elem){
            return $(elem).val();
        }).get();
        let filterArr = allInput.filter(item =>{
            return item!=''
        })
        if(filterArr.length<81){
            alert('填满才能check哦')
            return false;
        }

        let errorArr = checkFn(filterArr)
        if(errorArr.length == 0){
            clearInterval(clockInterval);
            let msg = 'Success!';
            if(score < record){
                let newRecord = n2time(score);
                msg+='打破记录啦，最快用时'+newRecord;
               $('#record').text(newRecord)
            }
            localStorage.setItem('record',score);
            alert(msg);
        }else{
            showErrorBlock(errorArr)
        }
    })

    function checkFn(userInputArr){
        let res = [];
        for(let i = 0;i<userInputArr.length;i++){
            if(userInputArr[i]!=checkArr[i]){
                res.push(i)
            }
        }
        return res;   
    }
    function showErrorBlock(arr){
        for(let i = 0, x = arr[i];i<arr.length;i++){
            let errorBlock = number2dom(arr[i])
            $(errorBlock).parent().addClass('error')
        }
    }
    function number2dom(n){
        if(n < 0 || n > 80){
            return false;
        }
        let row = Math.floor(n / 9)
        let colomn = n % 9
        return eval('l' + row)[colomn]
    }
})
