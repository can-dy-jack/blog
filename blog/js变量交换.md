---
title: JavaScript 两个变量的值交换的方式及性能
slug: js-change-var
date: "2022-11-13"
---
## 5种交换变量的方法

**前提**：
```js
let a = 12, b =34;
```
### 最基础 - 临时变量法
```js
let t = a;
a = b;
b = t;
```
优点：简单好用、有普适性 缺点：会增加内存消耗

### ES6 - 解构赋值法
```js
[a, b] = [b, a];
```
优点：只需一行 缺点：需要浏览器支持ES6
### 算术运算法
```js
a = a + b;
b = a - b;
a = a - b;
```
优点：巧妙，只利用简单的加法运算 缺点：可能会导致数据溢出

### 异或运算法
```js
// a ^ b ^ b == a 
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

优点：巧妙，但不会导致数据溢出！

### 数组法
```js
a = [a, b];
b = a[0];
a = a[1];
```
利用数组保存两个值；可能会增加一点内存消耗。

## 性能测试
以上五种方法那个效率更好呢？这里有好几种测试方法可选：

1. 利用 Date 对象
2. 利用console.time() 和 console.timeEnd()
3. 利用第三方库 benchmark.js

### Date对象
如果这大致上就是你首先想到的，但是这种方案有很多错误。

> 首先，如果报告的时间是0，可能你会认为它的执行时间小于1ms。但是，这并不十分精确。有些平台的精度并没有达到1ms，而是以更大的递增间隔更新定时器。比如，Windows（也就是IE）的早期版本上的精度只有15ms，这就意味着这个运算的运行时间至少需要这么长才不会被报告为0！

那重复测试100遍，然后选取平均值呢？ 并不完全是这样。简单的数学平均值绝对不足以对你要外推到整个应用范围的性能作出判断。迭代100次，即使只有几个（过高或过低的）的异常值也可以影响整个平均值，然后在重复应用这个结论的时候，你还会扩散这个误差，产生更大的欺骗性。

要确保把异常因素排除，你需要大量的样本来平均化。 你还会想要知道最差样本有多慢，最好的样本有多快，以及最好和最差情况之间的偏离度有多大，等等。你需要知道的不仅仅是一个告诉你某个东西跑得有多快的数字，还需要得到某个可以计量的测量值告诉你这个数字的可信度有多高。还有，你可能会想要把不同的技术（以及其他方面）组合起来，以得到所有可能方法的最佳平衡。

还有，对特定的性能测试来说，不要忘了检查测试环境，特别是比较任务Ⅹ和Y这样的比对测试。仅仅因为你的测试显示Ⅹ比Y快，并不能说明结论Ⅹ比Y快就有实际的意义。

相同的道理，利用 `console.time()` 和 `console.timeEnd()` 也有这些问题，甚至 `console.time()` 和 `console.timeEnd()` 本身的执行时间都可能影响性能测试。

### 第三方库 benchmark.js
综合来看，使用第三方库 `benchmark.js` 是最明智的选择，你不需要考虑那么多统计学的知识，只需要使用它即可！

首先，需要引用 依赖库 `lodash` ，和 `benchmark.js`。

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/benchmark@2.1.4/benchmark.min.js"></script>
```
接着，写测试代码：
```js
var suite = new Benchmark.Suite;

let a = 12, b =34;
suite.add('解构赋值法', function() {
    [a, b] = [b, a];
}).add('临时变量法', function() {
    let t = a;
    a = b;
    b = t;
}).add('算术运算法', function() {
    a = a + b;
    b = a - b;
    a = a - b;
}).add('异或运算法', function() {
    // a ^ b ^ b == a 
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
}).add('数组法', function() {
    a = [a, b];
    b = a[0];
    a = a[1];
})

.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
```

打印测试结果：
![测试结果](https://img-blog.csdnimg.cn/1a87113217864ce68be1f30e12037e07.png#pic_center)
在这里插入图片描述 可以看到，综合来说 临时变量法 最快，达到了71,597,491 ops/sec（==每秒操作数==）。确实是牺牲一点内存，换来了高效率。

## 参考资料
- 《你不知道的JavaScript（中卷）》
- [JavaScript两个变量的值交换的方式](https://blog.csdn.net/qq_45272642/article/details/124238548)




