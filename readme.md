
repo: https://github.com/emilytimer/sudoku
play: https://emilytimer.github.io/sudoku/

### 规则
玩家需要根据9×9盘面上的已知数字，推理出所有剩余空格的数字，并满足每一行、每一列、每一个粗线宫（3*3）内的数字均含1-9，不重复。
### 思路
生成满足条件的九宫格，然后随机去掉些空格，当最后1个空格填上时，验证结果
### 生成回文
[![huiwen.png](https://s2.ax1x.com/2019/09/07/nQWLUf.png)](https://imgchr.com/i/nQWLUf)
如图，满足数独的要求
### 横纵乱序
- 横向
1. 九宫格内：
将1-3行乱序，可为3-1-2，或者2-1-3，不会影响结果。同理，再将4-6乱序，7-9乱序。
2. 九宫格间：
再将3个九宫格乱序，如7-9放最前面，1-3次之，4-6再次之。
- 纵向：同理

将乱序后的数组记录为`answer`数组，用于最终验证
乱序效果如下：
![nQ5QZn.png](https://s2.ax1x.com/2019/09/07/nQ5QZn.png)
### 随机留空
根据难度系数，设定概率，随机选择空格留空
```javascript
    function emptyFlag(level) {
        let chance;
        switch (level) {
            case 'easy':
                chance = 0.6;
                break;
            case 'middle':
                chance = 0.5;
                break;
            case 'hard':
                chance = 0.3;
        }
        return Math.random() > chance
    }
```
`easy`模式，40%的单元格是空的
`hard`模式，70%的单元格是空的
![nQfbQJ.png](https://s2.ax1x.com/2019/09/07/nQfbQJ.png)
### 用户输入
```javascript
        let v = $(this).val() //用户输入的值
        if(isNaN(v)){ //如果不是数字
            $(this).val('')
            return false;
        }
        
        if(v.toString().length>0){ //如果连续输入数字
            v = v.toString().slice(-1)
        }
        $(this).val(v)
```
### 检查结果
当最后1个空格填上时候，验证数独是否成立。
将前面我们存的`answer`数组和用户填后的数组比较得出结果。