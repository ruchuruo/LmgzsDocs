# VMware Tools 注意事项





## Unity 模式 闪退
> - VMware® Workstation 17 Pro
> - 17.5.2 build-23775571
> 
> `查看` > `Unity` 时 视窗没有跳出来，几秒后退出 Unity 模式

Workstation 17.5.2 及以上自带的 VMware Tools 无法使用 Unity 模式

1. 
卸载当前 VMware Tools

2. 
安装 `VMware Tools 版本 12.3.5 build-22544099`





## 剪贴板无法共享 和 鼠标无法自动释放
> - VMware® Workstation 17 Pro
> - 17.5.2 build-23775571
> - open-vm-tools-desktop 2:12.5.0-2+deb13u1
> - Debian kde-plasma-desktop Wayland
> 
> 主机 与 虚拟机 之间无法复制粘贴文本和文件
> <br>鼠标离开虚拟机窗口 需按 Ctrl+Alt 释放

切换到 X11 桌面会话

1. 
注销当前用户

2. 
左下/右下 选择 桌面会话 `X11`

3. 
登录
