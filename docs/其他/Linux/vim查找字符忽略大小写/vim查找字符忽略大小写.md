# vim查找字符忽略大小写

## 临时控制
在搜索模式中添加 `\c` 或 `\C` 临时控制

`\c` 忽略大小写
```c
/\chello
```
```c
hello   // [!code ++]
Hello   // [!code ++]
HELLO   // [!code ++]
```

`\C` 区分大小写
```c
/\chello
```
```c
hello   // [!code ++]
Hello
HELLO
```

## 设置
忽略大小写
```c
:set ignorecase
```

区分大小写
```c
:set noignorecase
```

智能匹配，当搜索模式中包含大写字母时，会自动切换为区分大小写的搜索
```c
:set ignorecase smartcase
```
```c
hello   // [!code ++]
Hello   // [!code ++]
HELLO   // [!code ++]

/hello
```
```c
hello
Hello   // [!code ++]
HELLO

/Hello
```
