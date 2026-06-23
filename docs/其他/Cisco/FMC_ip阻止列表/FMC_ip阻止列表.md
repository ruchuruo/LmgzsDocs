# FMC ip阻止列表
::: info
- These lists are empty until you populate them. To build these lists, see **Global and Domain Security Intelligence Lists**.
<br>
这些列表在填充之前是空的。要构建这些列表，请参阅 **全局和域安全情报列表**。
:::





## 列表添加ip
比如在
- 导航栏 > 分析 > 连接 > 事件

在 `发起方IP/响应方IP` 上鼠标右键
```c
+----------------------------+
| 在新窗口中打开             |
|----------------------------|
| 排除                       |
|----------------------------|
| 在 Context Explorer 中打开 |
|----------------------------|
| Whois                      |
| 查看主机配置文件           |
|----------------------------|
| 将 IP 添加到阻止列表       |  // [!code ++]
| 将 IP 添加到不阻止列表     |
|----------------------------|
| AlienVault IP              |
| IBM X-Force Exchange IP    |
| Looking Glass IP           |
| Recorded Future IP         |
| Talos IP                   |
| Threat Grid IP             |
| Threat Response IP         |
| Umbrella IP                |
| Virus Total IP             |
+----------------------------+
```





## 查看列表
- 导航栏 > 对象 > 对象管理 > 安全情报 > 网络列表和源

| 名称 | 类型 | - |
| - | - | - |
|Global-Block-List 阻止列表          | 列表 | 🖊 ❌ |
|Global-Do-Not-Block-List 不阻止列表 | 列表 | 🖊 ❌ |
