# Secure Firewall Management Center
---

![图片](./images/firewall-management-center/fmc-demo-gui-1550x936.avif)

::: info 2025年7月27日
:::

::: info 本教程目的
- VMware® Workstation 16+ Pro (虚拟机) 安装 `Secure Firewall Management Center`
- 学习使用 `Secure Firewall Management Center`
:::

::: info 本教程需求
- Linux 基础知识
- Cisco 基础知识
- 电脑
- Secure Firewall Management Center 软件
<br>
虚拟磁盘 : `Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172.tar.gz`

- VMware® Workstation 16+ Pro (虚拟机)
:::

::: tip 在开始之前应该查看以下官方内容
- [思科 Cisco Secure Firewall Management Center Virtual 入门指南](https://www.cisco.com/c/zh_cn/td/docs/security/firepower/quick_start/fmcv/fpmc-virtual/fpmc-virtual-vmware.html)

::: details FMC / FTD 软件下载
- [官网下载](https://software.cisco.com/download/)
```c
FMC
|   Downloads Home
|   Security
|   Firewalls
|   Firewall Management
|   Secure Firewall Management Center Virtual
└─  Firepower Management Center Software

FTD
|   Downloads Home
|   Security
|   Firewalls
|   Next-Generation Firewalls (NGFW)
|   Firepower 1000 Series
|   Firepower 1010 Security Appliance
└─  Firepower Threat Defense (FTD) Software
```
:::

::: tip 注意
- Management Center Virtual 300 (FMCv300) 虚拟设备设置

| 设置 | 默认 | 设置可调节？ |
|-|-|-|
| 内存 | 64 GB | 是 |
| 虚拟 CPU | 32 | 否 |
| 硬盘调配容量 | 2.2 TB | 否 |
:::

::: tip 提示
- 部分官方中文教程并不是最新版
- 不同语言的官方教程有出处
- 查看官方教程时应该在 熟悉的语言教程 和 英语教程 中切换对比
:::

![图片](./images/firewall-management-center/fmc_accordion_available_form_factors_878x659.avif)





## 解压
- 将文件 `Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172.tar.gz` 解压
- 得到以下文件
```cmd {1}
2024/07/30  05:36     3,335,764,480 Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1.vmdk
2024/07/30  05:36               228 Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-ESXi-7.4.2-172.mf
2024/07/30  05:36             8,283 Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-ESXi-7.4.2-172.ovf
2024/07/30  05:37               226 Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-VI-7.4.2-172.mf
2024/07/30  05:36            13,424 Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-VI-7.4.2-172.ovf
```

- 查看 `.ovf` 文件可以了解详细的虚拟机配置





## 转换虚拟磁盘格式

- 原本的 `.vmdk` 格式为 流优化的压缩磁盘
- 需要转换成 单一可扩展虚拟磁盘

```cmd
  Disk types:
  磁盘类型
      0                   : single growable virtual disk
                            单一可扩展虚拟磁盘

      1                   : growable virtual disk split into multiple files
                            分割为多个文件的可扩展虚拟磁盘

      2                   : preallocated virtual disk
                            预分配的虚拟磁盘

      3                   : preallocated virtual disk split into multiple files
                            分割为多个文件的预分配虚拟磁盘

      4                   : preallocated ESX-type virtual disk
                            预分配的 ESX 类型虚拟磁盘

      5                   : compressed disk optimized for streaming
                            为流优化的压缩磁盘

      6                   : thin provisioned virtual disk - ESX 3.x and above
                            精简置备虚拟磁盘 - 适用于 ESX 3.x 及以上版本
```

使用 VMware 安装目录下的 `vmware-vdiskmanager.exe` 命令行工具
- Windows/cmd/
- 需要自行修改路径
```bash
.\vmware-vdiskmanager.exe -r Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1.vmdk -t 0 Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1_converted-t0.vmdk
```
```log
D:\VMware> .\vmware-vdiskmanager.exe -r E:\tmp\Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1.vmdk -t 0 E:\tmp\Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1_converted-t0.vmdk
Creating disk 'E:\tmp\Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1_converted-t0.vmdk'
  Convert: 100% done.
Virtual disk conversion successful.
D:\VMware>
```

- 得到 `Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1_converted-t0.vmdk`





## 新建虚拟机

### 新建虚拟机向导

#### 类型配置
- 自定义

#### 虚拟机硬件兼容性
- [默认最新]

#### 安装客户机操作系统
- 稍后安装操作系统

#### 选择客户机操作系统
- Linux
- 其他 Linux 5.x 内核 64 位

#### 命名虚拟机
- [自定义]

#### 处理器配置
- 1
- 4

#### 此虚拟机的内存
- 16 GB

#### 网络类型
- 使用桥接网络

#### 选择 I/O 控制器类型
- LSI Logic SAS

#### 选择磁盘类型
- SCSI

#### 选择磁盘
- 使用现有虚拟磁盘
<br>
`Cisco_Secure_FW_Mgmt_Center_Virtual300_VMware-7.4.2-172-disk1_converted-t0.vmdk`
<br>
保持现有格式

### 确认虚拟机设置
编辑虚拟机设置 -> 选项 -> 高级 -> 固件类型 -> BIOS
- 确认 固件类型 `BIOS`





## 首次启动虚拟机前进行快照(可选)
配置错误时可以省去前面的步骤





## 启动虚拟机
::: tip 提示
- 首次启动需要等待30到40分钟
:::

屏幕出现以下内容表示系统启动完成
```log
[INF0] Using model number 66R
```





## web登录FMC
::: tip 提示
如果出现 `503` 则表示软件还没启动完成，需要再等待一会
:::





## 系统中值得留意的地方
::: details

### CLI登录FMC
- 管理电脑/ssh/
- 切换成root用户
```bash
ssh admin@192.168.0.40 -P 8305 -o ServerAliveInterval=30
```
```log
$ ssh admin@192.168.0.40 -P 8305 -o ServerAliveInterval=30
(admin@192.168.0.40) Password: 
Last login: Fri Jul 25 21:04:57 UTC 2025 from 192.168.0.109 on pts/0

Copyright 2004-2024, Cisco and/or its affiliates. All rights reserved. 
Cisco is a registered trademark of Cisco Systems, Inc. 
All other trademarks are property of their respective owners.

Cisco Firepower Extensible Operating System (FX-OS) v2.14.1 (build 167)
Cisco Secure Firewall Management Center for VMWare 300 v7.4.2 (build 172)

> expert 
admin@firepower:~$ sudo su
Password: 
Last login: Thu Jul 31 15:57:33 UTC 2025 on pts/0
root@firepower:/Volume/home/admin# 
```

### 配置文件
```log
/etc/my.cnf
```
```log
/etc/sf/.health_monitor.data
```

#### 查看配置文件
在启用评估模式时 `.health_monitor.data` 文件会多出以下内容
```
DEMOSTART:3376656000
```

### 数据库
#### 登录数据库操作
v7.0+ 版本中更改了 mysql 密码，如果要修改数据库，可以给 `my.cnf` 添加以下内容
```log
[mysqld]
skip-grant-tables
```

然后
```bash
mysql -uroot -padmin

SHOW DATABASES;

USE sfsnort;
SHOW TABLES;

SELECT * FROM license_caps LIMIT 10;
SELECT * FROM smart_licenses LIMIT 10;

UPDATE license_caps SET last_changed=3376656000;
UPDATE smart_licenses SET last_changed=3376656000;
```

#### 不登录数据库操作
或是使用 `OmniQuery.pl` 命令行工具
```bash
OmniQuery.pl -db mdb -e "SELECT * FROM license_caps LIMIT 10;"
OmniQuery.pl -db mdb -e "SELECT * FROM smart_licenses LIMIT 10;"

OmniQuery.pl -db mdb -e "UPDATE license_caps SET last_changed=3376656000;"
OmniQuery.pl -db mdb -e "UPDATE smart_licenses SET last_changed=3376656000;"
```

:::





---

# 结束
::: info [返回顶部](#secure-firewall-management-center)
:::


















<!-- 

- 管理电脑/Minicom/
```bash
```
```log
```

- 管理电脑/ssh/
```bash
```
```log
``

 -->
