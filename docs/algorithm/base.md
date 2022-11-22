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



