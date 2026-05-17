# 保持ssh连接不断

## 问题
在使用ssh连接时，空闲一段时间会断开连接





## 解决办法
### 客户端
连接时添加参数
```sh
ssh -o ServerAliveInterval=30 user@host
```

### 服务端
...





## 原因





## 参考
[Linux使用ssh超时断开连接的真正原因与解决【转】](https://zhuanlan.zhihu.com/p/376629899)
