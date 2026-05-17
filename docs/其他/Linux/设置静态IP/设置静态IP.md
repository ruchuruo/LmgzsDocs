# 设置静态IP

## Ubuntu

::: info
- 新版 Ubuntu 的默认网络管理工具是 Netplan
- Netplan 的配置文件是 YAML 格式
- 扩展名为 .yaml
:::

### 查看当前网络的信息

如当前分配的 IP 子网掩码 和 网络适配器，以便在配置中进行更改

使用以下任意命令查看
```sh
ifconfig
```
```sh
ip a
```

假设当前适配器是 `eth0`

### 更改配置

转到 netplan 目录
```sh
cd /etc/netplan
```

如果里面没有文件，可以创建一个

文件名应该以 `01-` 这样的数字开头

以 `.yaml` 结尾

如果有多个配置文件，数字大小决定优先级

打开配置文件
```sh
vim 01-network-manager-all.yaml
```

配置文件说明
```yaml
network:                            顶层节点
  version: 2                        网络定义版本
  renderer: NetworkManager          渲染器
  ethernets:
    eth0:                           网络适配器名称
      dhcp4: no                     是否动态分配 IP
      addresses: [192.168.0.100/24] 静态 IP
      gateway4: 192.168.1.1         网关
      nameservers:                  DNS 服务器
        addresses: [8.8.8.8,8.8.8.4]
```

### 应用
测试更改
```sh
netplan try
```

应用更改
```sh
netplan apply
```

再次使用以下任意命令查看当前网络的信息
```sh
ifconfig
```
```sh
ip a
```





## Debian
无
