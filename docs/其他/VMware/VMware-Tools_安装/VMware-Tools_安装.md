# VMware Tools 安装





## 安装自带的 VMware Tools
1. 
`虚拟机` > `设置` > `硬件` > `添加` > `CD/DVD 驱动器`

2. 
`虚拟机` > `安装 VMware Tools`

3. 
之后按照提示进行操作





## Linux
1. 
安装 open-vm-tools

带桌面环境的系统
```sh
apt install open-vm-tools-desktop
```

无桌面环境的系统
```sh
apt install open-vm-tools
```

2. 
重启

3. 
查看运行状态
```sh
systemctl status open-vm-tools
```
