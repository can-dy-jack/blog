---
title: Promise A+ 规范（译）
slug: promis-a-plus
---

`Promise` 代表异步操作的最终结果。与 `Promise` 交互的主要方式是通过其 `then` 方法，该方法注册回调以接收 `Promise` 的最终值或 `Promise` 失败的原因。

该规范详细说明了 `then` 方法的行为，提供了一个可互操作的基础，所有符合 `Promises/A+` 的 `Promise` 实现都可以依赖该基础来提供。因此，规范应该被认为是非常稳定的。尽管 `Promises/A+` 组织可能偶尔会通过微小的向后兼容更改来修改此规范以解决新发现的极端情况，但只有在仔细考虑、讨论和测试后，我们才会集成大的或向后不兼容的更改。

最后，核心 `Promises/A+` 规范不涉及如何创建、履行或拒绝 `Promise`，而是选择专注于提供可互操作的 `then` 方法。

## 1、术语
- `promise` 是具有 `then` 方法的**对象或函数**，其行为符合本规范。
- `thenable`是定义 `then` 方法的对象或函数。
- `value`是任何合法的 `JavaScript` 值（包括 `undefined`、`thenable` 或 `promise`）。
- `exception`是使用 `throw` 语句抛出的值。
- `reason` 是一个值，表示一个 `promise` 被拒绝的原因。

<!-- truncate -->

## 2、要求

### Promise 状态
> `Promise` 必须处于以下三种状态之一： `pending`, `fulfilled`, or `rejected`。·

1. 处于 `pending` 状态时，`Promise` 可以转换到`fulfilled` 或 `rejected` 状态。
2. 处于 `fulfilled` 状态时，`Promise` 不得转换到其它状态。
    - 必须有一个`value`，并且这个值一定不能改变。
3. 处于 `rejected` 状态时，`Promise` 不得转换到其它状态。
    - 必须有一个`reason`，并且这个值一定不能改变。

这里的不得转换意味着其不可变的属性（即 `===`），但并不意味着深度不变（深度嵌套的值可变）。

### `then` 方法
`Promise` 必须提供 `then` 方法来访问其当前或最终的 `value`或 `reason`。
`Promise` 的 `then` 方法接受两个参数：

```js
promise.then(onFulfilled, onRejected)
```

`onFulfilled` 和 `onRejected` 都是可选参数，并且如果它们不是函数，则必须忽略它。

- 如果 `onFulfilled` 是一个函数
    - 它必须在 `promise` 完成后调用，`promise` 的 `value` 作为它的第一个参数
    - 在 `promise` 完成之前不能调用它
    - 不能多次调用它。
- 如果 `onRejected` 是一个函数
    - 它必须在 `promise` 被拒绝后调用，`promise` 的 `reason` 是它的第一个参数
    - 在 `promise` 被拒绝之前不能调用它
    - 不能多次调用它
- 在执行 [`execution context`](https://es5.github.io/#x10.3) 堆栈（仅包含平台代码）之前，不得调用 `onFulfilled` 或 `onRejected`。 [^1]
- `onFulfilled` 和 `onRejected` 必须作为函数调用（即没有 `this` 值）。 [^2]
- `then` 可能会在同一个 `Promise` 上被多次调用
    - 当 `Promise` 被实现，所有相应的 `onFulfilled` 回调必须按照它们对 `then` 的调用顺序执行。
    - 当 `promise` 被拒绝时，所有相应的 `onRejected` 回调必须按照它们对 `then` 的发起调用的顺序执行。
- `then` 必须返回一个 `promise` [^3]
    ```js
    promise2 = promise1.then(onFulfilled, onRejected);
    ```
    - 如果 `onFulfilled` 或 `onRejected` 返回一个值 `x`，运行`Promise`解决程序 `[[Resolve]](promise2, x)`。
    - 如果 `onFulfilled` 或 `onRejected` 抛出一个意外 `e`，`promise2` 必须以 `e` 为 `reason` 被 `rejected`。
    - 如果 `onFulfilled` 不是一个函数并且 `promise1` 处于 `fulfilled` 状态，`promise2` 必须以与 `promise1` 同样的 `value` 转变到 `fulfilled` 状态。
    - 如果 `onRejected` 不是一个函数并且 `promise1` 处于 `rejected` 状态，`promise2` 必须以与 `promise1` 同样的 `reason` 转变到 `rejected`状态。

### `Promise` 解决程序
`promise`解决程序是一个抽象的操作，它把一个 `promise` 和一个 `value` 作为输入，我们将这个表示为 `[[Resolve]](promise, x)`。如果 `x` 是一个 `thenable` ，它将会试图让 `promise` 采用 `x` 的状态，前提是`x`的行为至少有点像一个 `promise`。否则，它将会用值 `x` 执行 `promise`。
对这些 `thenable` 的处理使得与 `promise` 实现方式能够去互相操作。只要它们公开了符合 `Promise/A+` 的 `then` 方法。它还使得 `promises/A+` 实现方式能够采用合理的 `then` 方法去“同化”不一致的实现方式。
为了运行`[[Resolve]](promise, x)`，执行以下步骤：

1. 如果 `promise` 和 `x` 指向同一个对象，则以 `TypeError` 作为原因拒绝 `promise`
2. 如果 `x` 是一个 `promise`，采用它的状态： [^4]
    1. 如果 `x` 处于`pending`，则 `Promise` 必须保持`pending`，直到 `x` 变为 `fulfilled` 或 `rejected`
    2. 当 `x` 是 `fulfilled`，使用相同的 `value` 实现 `promise`
    3. 当 `x` 是 `rejected`，以同样的 `reason` 拒绝 `promise`
3. 除此之外，如果 `x` 是一个对象或函数
    1. 令 `then` 为 `x.then`  [^5]
    2. 如果检索属性 `x.then` 导致抛出异常 `e`，则以 `e` 为 `value` 拒绝 `promise`
    3. 如果 `then` 是一个函数，则使用 `x` 作为 `this`、第一个参数 `resolvePromis`e 和第二个参数 `rejectPromise` 调用它，其中：
        - 使用 `value` `y` 调用 `resolvePromise` 时，运行 `[[Resolve]](promise, y)`
        - 使用 `reason` `r` 调用 `rejectPromise` 时，使用 `r` 拒绝 `promise`
        - 如果同时调用了 `resolvePromise` 和 `rejectPromise`，或者对同一个参数进行了多次调用，则第一次调用优先，并且任何进一步的调用都将被忽略。
        - 如果调用 `then` 抛出异常 `e`:
            - 如果已调用 `resolvePromise` 或 `rejectPromise`，则忽略它。
            - 否则，以 `e` 为 `reason` 拒绝 `promise`
    4. 如果 `then` 不是函数，则用 `x` 实现 `promise`
4. 如果 `x` 不是对象或函数，使用 `x` 实现`promise`

如果一个参与了 `thenable` 循环链的 `thenable` 去 `resolve promise`，这样 `[[Resolve]](promise, thenable)` 的递归性质最终会导致 `[[Resolve]](promise, thenable)` 会被再次调用，遵循上述算法将会导致无限递归。我们鼓励去实现（但不是必需的）检测这样的递归，并以 `TypeError` 作为 `reason` 去 `reject Promise`。 [^6]


[^1]: 这里的“平台代码”指的是引擎，环境和 promise 实现代码。实际上，这个要求保证了 `onFulfilled` 和 `onRejected` 将会异步执行，在事件循环之后，用一个新的堆栈来调用它。 这可以通过“宏任务”机制（如 `settimeout`或 `setimmediate` ）或“微任务”机制（如 `mutationobserver` 或 `process.nextick`）来实现。由于 `Promise` 实现被视为平台代码，因此它本身可能包含一个任务调度队列或“`trampoline`”，并在其中调用处理程序。

[^2]: 也就是说，在 strict 模式下，这（指的是this）在它们内部将会是 undefined；在普通模式下，它将会是全局对象。

[^3]: 如果实现满足所有要求，则实现可能允许 `promise2 == promise1`。每个实现都应该记录它是否能够生成 `promise2 == promise1` 以及在什么条件下。

[^4]: 一般来说，只有当 `X` 来自当前的实现时，才知道它是一个真正的 `promise`。本条款允许使用特定于实现的方法来采用已知一致承诺的状态。

[^5]: 此过程首先存储对 x 的引用，然后测试该引用，然后调用该引用，避免多次访问 `x.then` 属性。这些预防措施对于确保访问器属性的一致性非常重要，访问器属性的值可能在两次检索之间发生更改。

[^6]: 实现方式中不应当在 `thenbale` 链中的深度设置主观的限制，并且不应当假设链的深度超过主观的限制后会是无限的。只有真正的循环才能导致`TypeError`。如果遇到由无限多个不同 `thenable` 组成的链，那么永远递归是正确的行为。

