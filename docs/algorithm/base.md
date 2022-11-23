---
title: "基本算法 - 数学"
slug: base
---

## 最大公约数、最小公倍数
最大公约数 `gcd`
```js
const gcd = (a, b) => a ? gcd(b%a, a) : b;
```

最小公倍数 `lcm` 
> 依赖于最大公约数 `gcd`
```js
const lcm = (a, b) => a * b / gcd(a,b);
```

## 最大值 / 最小值
最大值 `max` ，输出给定所有数字的最大数字，如果没有参数，则返回  `-Infinity`。
```js
const max = (...args) => {
  if(args.length === 0) return -Infinity;
  let _max_ = args[0];
  for(const a of args) {
    _max_ = _max_ > a ? _max_ : a;
  }
  return _max_;
}

// use
max(1,2,3,4,5,890,34,12,56757,12) // 56757
// or
max(...[1,2,3,4,5,890,34,12,56757,12]) // 56757
```

最小值 `min` ，输出给定所有数字的最小数字，如果没有参数，则返回  `Infinity`。
```js
const min = (...args) => {
  if(args.length === 0) return Infinity;
  let _min_ = args[0];
  for(const a of args) {
    _min_ = _min_ < a ? _min_ : a;
  }
  return _min_;
}

// use
min(1,2,3,4,5,890,34,12,56757,12) // 1
// or
min(...[1,2,3,4,5,890,34,12,56757,12]) // 1
```

## 检查 存在性
`existy` 检查数据是否 `存在` ，即是否不等于 `null` 或 `undefined`。

```js
const existy = x => x != null
// or
// const existy = x => x != undefined
```
> 注：松散不等于 `!=` 会将 `null` 和 `undefined` 判定为 一个东西，即 `null == undefined`

## 判断是否为 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)

> 在 `JavaScript` 中，`truthy`（真值）指的是在布尔值上下文中，转换后的值为 `true` 的值。**被定义为假值以外的任何值都为真值。**（即所有除 `false`、`0`、`-0`、`0n`、`""`、`null`、`undefined` 和 `NaN` 以外的皆为真值）。

```js
const truthy = x => x !== false && x != null && x !== 0  && x !== 0n && x === x && x !== "";
```

`falsy` 函数同理: 
```js
const falsy = x => x === false || x == null || x === 0 || x === 0n || x === "" || x !== x ;
```

## 生成随机数
随机生成 n-m 之间的整数值
```js
// 保证 m < n
function random(m, n) {
  return Math.round(Math.random() * (n-m) + m);
}
```
