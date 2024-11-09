
# 落梦域_Java-1.20.1-互通服-帮助
---

## 问答
```c
Q:进服后如何注册和登录？
A:如果玩家id是首次进入服务器需要注册，
    注册指令 /register 密码 密码
    注册是需要输入两次密码

    登录指令 /login 密码

Q:忘记密码了怎么办？
A:联系管理员改密码

Q:我注册填的密码管理员知道吗？
A:不知道，密码是加密的

Q:我从未进入过服务器，为什么不显示注册而是登录
A:有和你名字一样的玩家，你需要改名。
    如果你拥有正版 Minecraft账号，并且服务器内有和你名字重复的玩家，
    联系管理员解决重名问题。

Q:如何圈地？
A:联系管理员圈地

Q:为什么使用paper端
A:当前实在没办法
```

## MCDR插件使用教程
TpManager
指令
|标准指令格式|介绍|
|----|----|
!!tp help               |显示帮助信息, 同!!tp
!!tp pos <\x> <\y> <\z> |传送到, ,<\x><\y><\z>
!!tp ask <\name>        |请求传送到玩家, 同!!tpa
!!tp askhere <\name>    |请求玩家传送到你, 同!!tph
!!tp accept             |同意传送请求
!!tp reject             |拒绝传送请求
!!tp cancel             |取消传送请求

Daytime
指令
|指令格式|介绍|
|----|----|
!!daytime |显示游戏中的时间

## 领地
Residence
圈地和扩大领地暂时需要联系管理员
```c
https://www.minebbs.com/resources/residence.4683/

/res ? —— 查看帮助
/res set —— 打开GUI操作
/res set <领地名> [权限] [true/false/remove] —— 在不同的领地内设置权限

/res padd <领地名> [玩家] —— 向玩家添加基本权限
/res pdel <领地名> [玩家] —— 删除玩家的基本权限
/res pset <领地名> [玩家] [权限] [true/false/remove] —— 给不同的玩家上设置权限

/res tp [领地名] —— 传送到指定领地
/res tpset —— 设置领地中的传送位置（当玩家输入/res tp [领地名]时，将会传送至您在领地内设置的传送位置）
```

### 实例
```c
设置公共权限
    /res set —— 打开GUI操作
    /res set <领地名> [权限] [true/false/remove] —— 在不同的领地内设置权限

给我的好友添加领地权限
    /res padd <领地名> [玩家] —— 向玩家添加基本权限
    /res padd deepDark xiaoming

我的好友绝交了
    /res pdel <领地名> [玩家] —— 删除玩家的基本权限
    /res pdel deepDark xiaoming

领地添加和删除管理员
    /res pset <领地名> [玩家] admin [true/false/remove]
    /res pset deepDark xiaoming admin true
    /res pset deepDark xiaoming admin false

领地内打开tnt爆炸
    /res set <领地名> tnt true
```

## 服务器使用的插件
```c
AuthMe
Geyser
Residence
```

## 服务器设置
```c
离线玩家也可以进入
服务器当前是paper端
配置文件中开启了
    allow-headless-pistons: true
    allow-permanent-block-break-exploits: true
    allow-piston-duplication: true
```