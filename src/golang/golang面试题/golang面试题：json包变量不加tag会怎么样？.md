---
title: golang面试题：json包变量不加tag会怎么样？
date: 2020-05-18 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS81MWY1ZjQ0NS04YzczLTQ1YTYtOTcxOS02NjI2M2Q4NDY2MTYucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

`json`包里使用的时候，结构体里的变量不加`tag`能不能正常转成`json`里的字段？

# 怎么答

- 如果变量`首字母小写`，则为`private`。无论如何`不能转`，因为取不到`反射信息`。
- 如果变量`首字母大写`，则为`public`。
  - `不加tag`，可以正常转为`json`里的字段，`json`内字段名跟结构体内字段`原名一致`。
  - `加了tag`，从`struct`转`json`的时候，`json`的字段名就是`tag`里的字段名，原字段名已经没用。

# 举例

通过一个例子加深理解。

```go
package main
import (
    "encoding/json"
    "fmt"
)
type J struct {
    a string             //小写无tag
    b string `json:"B"`  //小写+tag
    C string             //大写无tag
    D string `json:"DD"` //大写+tag
}
func main() {
    j := J {
      a: "1",
      b: "2",
      C: "3",
      D: "4",
    }
    fmt.Printf("转为json前j结构体的内容 = %+v\n", j)
    jsonInfo, _ := json.Marshal(j)
    fmt.Printf("转为json后的内容 = %+v\n", string(jsonInfo))
}
```

输出

```go
转为json前j结构体的内容 = {a:1 b:2 C:3 D:4}
转为json后的内容 = {"C":"3","DD":"4"}
```

# 解释

- 结构体里定义了四个字段，分别对应 `小写无tag`，`小写+tag`，`大写无tag`，`大写+tag`。
- 转为`json`后首字母`小写的`不管加不加 tag`都不能`转为`json`里的内容，而`大写的`加了`tag`可以`取别名`，不加`tag`则`json`内的字段跟结构体字段`原名一致`。

### 文章推荐：

- [golang 面试题：怎么避免内存逃逸？？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483692&idx=1&sn=d5d34fad7a4553e0b9d5714385b7af48&chksm=9aee2885ad99a193253c1e57bd361b3f5af643d3ba14f56f25c0c5551990c848c6f30a5ca23e&token=961196008&lang=zh_CN#rd)
- [golang 面试题：简单聊聊内存逃逸？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483686&idx=1&sn=e48c51107191f02da5751a19a54f7d41&chksm=9aee288fad99a199c126d5ff735af7320356ce4bb5753ae59ac6231e596354499414b5705b79&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：字符串转成 byte 数组，会发生内存拷贝吗？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483669&idx=1&sn=88f754ddabc04eb3f66ba8ac37ee1461&chksm=9aee28bcad99a1aa1ada41cfccaffc7ef4719a9bc11c1bef45b7d1b5427c1faa12d8d0c3156f&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：翻转含有`中文、数字、英文字母`的字符串](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483664&idx=1&sn=23a0cf8a78b1d9c30b2e3bc102bf421e&chksm=9aee28b9ad99a1af6c879ba4b1f6439e4c21c363f0a668f322c082ca334b62255507828f66d4&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：拷贝大切片一定比小切片代价大吗？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483674&idx=1&sn=ce4b5fee48c54ff69127ef2bd5d91427&chksm=9aee28b3ad99a1a57eed7651a16fd4bdc35ff23937e423c5e1322a234652fd135f1a16abbece&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：能说说 uintptr 和 unsafe.Pointer 的区别吗？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483679&idx=1&sn=7075859e59741b1d0a81dc472b8ce45f&chksm=9aee28b6ad99a1a0599416886660d9ea56bd7fec18841af0e5fe86c3daea3973732a83d7eabb&token=2092782362&lang=zh_CN#rd)

######

关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)
