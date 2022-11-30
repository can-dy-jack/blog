---
title: markdwon测试文档
slug: md-test
date: "2022-11-13"
img: "https://images.unsplash.com/photo-1668428178242-09ee02d13340?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
imgHeight: "500px"
color: "#fff"

tag: markdown
cate: markdown
---

> markdwon测试文档

## markdown 标题
`markdown` 支持两种标题的语法，类 `Setext` 和 类 `Atx` 形式。  
类 `Setext` 形式是用底线的形式，利用 `=`（最高价标题）和 `-`（第二阶标题），例如：
```markdown
This is an H1
============

This is an H2
------------
```
任何数量的 `=` 和 `-` 都可以有效果。

类 `Atx` 形式则是在行首插入1到6个 `#` ,对应到标题1到6级标题，例如：
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## markdown 段落和换行
一个 `markdown` 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行（空行的定义是显示上看起来像是空的，便会被视为空行。比方说，若某一行只包含空格和制表符，则该行也会被视为空行）。普通段落不该用空格或制表符来缩进。  
`markdown` 允许段落内的强迫换行（插入换行符）。**两个以上的空格+回车** 即为 `<br />` 标签。  

## markdown 列表
无序列表
无序列表用 `*`, `+` 或 `-` 作为列表标记，语法如下:
```md
* red
* green
* blue
```
等同于：
```md
+ red
+ green
+ blue
```
也等同于：
```md
- red
- green
- blue
```
上面三种方式效果如下: 
- red
- green
- blue

## code

`code`

```js
console.log("highlight")
```
## markdown 分割线
你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：
```md
* * *
******
- - -
------
```
## markdown 链接
markdown 支持两种形式的链接语法： 行内式和参考式两种形式。  
不管是哪一种，链接文字都是用 [方括号] 来标记。  

要建立一个行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如：
```md
This is [an example](http://bing.com/ "Title") inline link.

[This link](http://bing.com/) has no title attribute.
```
效果如下：

This is [an example](http://bing.com/ "Title") inline link.

[This link](http://bing.com/) has no title attribute.

## 表格

|markdown语法|用法|
|---|---|
|标题|`# h1`|
|列表|`- w`|
|文字 加粗、斜体|`**bold** **itali**`|
|代码|`code`|
|emoji| `:smile: :-)` :smile: :-) |

## Footnote

A note[^footenote1] 点击会跳转到文章尾部，可以查看对应内容的详细的解释

[^footenote1]: Big note. 

## 文字格式

```md
删除线：~one~ or ~~two~~
粗体：
**double asterisks**
__double underscores__

斜体：
*single asterisks*
_single underscores_
```
~one~ or ~~two~~  
*single asterisks*  
_single underscores_  
**double asterisks**  
__double underscores__  

**强调**也可以直接 *插在文字中间* 。

## Tasklist

* [x] React
* [x] NextJS
* [ ] Redux

## markdown 图片

```md
![插画来自https://error404.fun/](/blog/svg/browser_icon_4.svg)
```

![插画来自https://error404.fun/](/blog/svg/browser_icon_4.svg)

## emoji

Thumbs up: :+1:, thumbs down: :-1:.

Emojis in this text will be replaced: :dog: :+1:

:smile:

:-)

## 数学公式支持

> mathjax

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

## more

- references: [参考](https://github.com/Xunnamius/unified-utils/tree/main/packages/remark-renumber-references)
- mermaid
- toc
- 代码行号
- remark-collapse 看源码自己写！

