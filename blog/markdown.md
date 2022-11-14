---
title: markdwon测试文档
slug: md-test
date: "2022-11-13"
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
「由一个或多个连续的文本行组成」这句话其实暗示了 `markdown` 允许段落内的强迫换行（插入换行符），这个特性和其他大部分的 `text-to-HTML` 格式不一样（包括 `Movable Type` 的「Convert Line Breaks」选项），其它的格式会把每个换行符都转成 `<br />` 标签。  
如果你确实想要依赖 markdown 来插入 `<br />` 标签的话，在插入处先按入两个以上的空格然后回车。  
的确，需要多费点事（多加空格）来产生 `<br />` ，但是简单地「每个换行都转换为 `<br />`」的方法在 `Markdown` 中并不适合， `markdown` 中 `email` 式的 区块引用 和多段落的 列表 在使用换行来排版的时候，不但更好用，还更方便阅读。  

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
***
******
- - -
-----------------------
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
- 脚注 [footnote](https://github.com/jackfletch/remark-numbered-footnote-labels)
- references: [参考](https://github.com/Xunnamius/unified-utils/tree/main/packages/remark-renumber-references)
- mermaid
- toc
- 代码行号
- remark-collapse 看源码自己写！
