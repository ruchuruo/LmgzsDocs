# 修改ssh端口

修改 SSH 配置文件
```sh
vim /etc/ssh/sshd_config
```

取消注释，可以添加多个 `Port`
```c
Port 22
Port 2202
```

重启 SSH 服务
```sh
systemctl restart sshd
```
