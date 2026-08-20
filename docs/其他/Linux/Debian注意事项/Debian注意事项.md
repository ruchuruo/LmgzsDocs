# Debian 注意事项





## 离线安装
> - `debian-13.6.0-amd64-DVD-1.iso`
> 
> 从 DVD 离线安装 Debian 之后 `/etc/apt/sources.list` 文件里只有 DVD 被列为软件源。
> <br>无法再次运行 "配置软件包管理器" 任务 以便选择和配置网络镜像。
> > Reddit [离线安装后重新配置软件包管理器](https://www.reddit.com/r/debian/comments/1615icm/reconfiguring_package_manager_after_offline/)

从 doc 示例中 搞点靠谱的默认设置

```c
/usr/share/doc/apt/examples/debian.sources
```
```http
## Debian distribution repository
##
......
##
## See the sources.list(5) manual page for further settings.
Types: deb
URIs: http://deb.debian.org/debian
Suites: trixie trixie-updates
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

## Debian security updates. Aside from URIs and Suites,
## this should mirror your choices in the previous section.
Types: deb
URIs: http://deb.debian.org/debian-security
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

注释镜像源，复制 `Types` `URIs` `Suites` `Components` 的内容填写到 `sources.list`
```c
/etc/apt/sources.list
```
```c
# deb cdrom:[Debian GNU/Linux 13.6.0 _Trixie_ - Official amd64 DVD Binary-1 with firmware 20260711-09:43]/ trixie contrib main non-free-firmware

deb http://deb.debian.org/debian/ trixie main contrib non-free non-free-firmware
deb http://deb.debian.org/debian-security/ trixie-security main contrib non-free non-free-firmware
```
