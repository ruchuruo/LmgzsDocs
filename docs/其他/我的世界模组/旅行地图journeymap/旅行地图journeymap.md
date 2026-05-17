
# 旅行地图journeymap
::: info journeymap-1.20.1-5.9.17-forge.jar
:::

## 配置文件 和 地图数据文件
```c
└─📁.minecraft
   └─📁versions
      └─📁<版本名字>
            └─📁journeymap
               |  📄journeymap.log     日志
               ├─📁config              配置文件 在全屏地图中设置，存储 字体大小 等
               ├─📁data                地图数据
               |  ├─📁mp               多人游戏地图数据
               |  |  └─📁<服务器名字>
               |  |     ├─📁<维度名字>
               |  |     └─📁waypoints  路标点
               |  |
               |  └─📁sp               单人游戏地图数据
               |     └─📁<存档名字>
               |        ├─📁<维度名字>
               |        └─📁waypoints  路标点
               |
               ├─📁icon                图标
               |  └─📁theme            主题样式
               |  
               └─📁server              服务端配置文件 在全屏地图中设置，当 客户端 作为多人联机 服务端 时

```
