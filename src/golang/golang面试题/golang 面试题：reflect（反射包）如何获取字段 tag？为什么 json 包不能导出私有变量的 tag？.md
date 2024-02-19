---
title: golang 面试题：reflect（反射包）如何获取字段 tag？为什么 json 包不能导出私有变量的 tag？
date: 2020-07-11 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9kYmE0ODBhYS04ZjNiLTQ2MmMtOTUzYy04OWUxYmNlYmE5YzQucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

`json`包里使用的时候，会结构体里的字段边上加`tag`，有没有什么办法可以获取到这个`tag`的内容呢？

# 举例

`tag`信息可以通过`反射（reflect包）`内的方法获取，通过一个例子加深理解。

```go
package main

import (
    "fmt"
    "reflect"
)

type J struct {
    a string //小写无tag
    b string `json:"B"` //小写+tag
    C string //大写无tag
    D string `json:"DD" otherTag:"good"` //大写+tag
}

func printTag(stru interface{}) {
    t := reflect.TypeOf(stru).Elem()
    for i := 0; i < t.NumField(); i++ {
        fmt.Printf("结构体内第%v个字段 %v 对应的json tag是 %v , 还有otherTag？ = %v \n", i+1, t.Field(i).Name, t.Field(i).Tag.Get("json"), t.Field(i).Tag.Get("otherTag"))
	}
}

func main() {
    j := J{
      a: "1",
      b: "2",
      C: "3",
      D: "4",
    }
    printTag(&j)
}
```

输出

```go
结构体内第1个字段 a 对应的json tag是  , 还有otherTag？ =
结构体内第2个字段 b 对应的json tag是 B , 还有otherTag？ =
结构体内第3个字段 C 对应的json tag是  , 还有otherTag？ =
结构体内第4个字段 D 对应的json tag是 DD , 还有otherTag？ = good
```

# 解释

- `printTag`方法传入的是 j 的指针。
- `reflect.TypeOf(stru).Elem()`获取指针指向的值对应的结构体内容。
- `NumField()`可以获得该结构体含有几个字段。
- 遍历结构体内的字段，通过`t.Field(i).Tag.Get("json")`可以获取到`tag`为`json`的字段。
- 如果结构体的字段有`多个tag`，比如叫`otherTag`,同样可以通过`t.Field(i).Tag.Get("otherTag")`获得。

# 再补一句

[上篇文章](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483698&idx=1&sn=352a5cddf20fe95f5ec26bfc9a6de64b&chksm=9aee289bad99a18d9914d085421e4f218b18d4f0c7a24da306642816e91fb4b235be6aea0e40&token=961196008&lang=zh_CN#rd) 提到`json包`不能导出`私有变量的tag`是因为**取不到**`反射信息`的说法，但是直接取`t.Field(i).Tag.Get("json")`**却可以**获取到私有变量的`json字段`，是**为什么**呢？

其实**准确的**说法是，`json`包里不能导出私有变量的`tag`是因为`json`包里认为私有变量为不可导出的`Unexported`，所以**跳过获取**名为`json`的`tag`的内容。
具体可以看`/src/encoding/json/encode.go:1070`的代码。

```go
func typeFields(t reflect.Type) []field {
    // 注释掉其他逻辑...
    // 遍历结构体内的每个字段
    for i := 0; i < f.typ.NumField(); i++ {
        sf := f.typ.Field(i)
        isUnexported := sf.PkgPath != ""
        // 注释掉其他逻辑...
        if isUnexported {
            // 如果是不可导出的变量则跳过
            continue
        }
        // 如果是可导出的变量（public），则获取其json字段
        tag := sf.Tag.Get("json")
        // 注释掉其他逻辑...
    }
    // 注释掉其他逻辑...
}
```
