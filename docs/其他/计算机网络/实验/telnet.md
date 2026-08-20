# 使用 Telnet 与一个 SMTP 服务器进行一次直接对话
> `debian-13.6.0`

## 环境准备
### 安装 pip
```sh
apt install python3-pip
```

### 安装 Python venv
```sh
apt install python3-venv
```

### 创建 Python 虚拟环境
创建文件夹
```c
.
└── lab
    └── telnet-py-pack
```

指定虚拟环境文件夹
```sh
python3 -m venv lab/telnet-py-pack/
```
```c
.
└── lab
    └── telnet-py-pack
        ├── bin
        ├── include
        ├── lib
        ├── lib64 -> lib
        └── pyvenv.cfg
```

### 激活虚拟环境
更改文件权限
```sh
chmod u+x lab/telnet-py-pack/bin/activate
```

执行
```sh
source lab/telnet-py-pack/bin/activate
```
```log
kitty@debian:~/kittyall$ source lab/telnet-py-pack/bin/activate
(telnet-py-pack) kitty@debian:~/kittyall$
```

### pip 安装 aiosmtpd
```sh
pip install aiosmtpd
```
```log
(telnet-py-pack) kitty@debian:~/kittyall$ pip install aiosmtpd
Collecting aiosmtpd
  Downloading aiosmtpd
```

### 运行 aiosmtpd
```sh
python3 -m aiosmtpd -n -l 127.0.0.1:1025
```
- `-m` 使用模块
- `-n` 关闭名称解析
- `-l` 监听地址和端口





## 开始实验
::: tip 提示
Telnet 会把 退格键(Backspace) 当作控制字符发送，若敲错命令，建议直接回车让服务器报错后重试当前步骤
:::

### 使用 Telnet 建立连接
```sh
telnet 127.0.0.1 1025
```
```log
kitty@debian:~/kittyall$ telnet 127.0.0.1 1025
Trying 127.0.0.1...
Connected to 127.0.0.1.
Escape character is '^]'.
220 debian Python SMTP 1.4.6
```

### 向服务器打招呼
告诉服务器你的客户端 主机名 或 域名
```http
HELO debian
```
```log
HELO debian
250 debian
```

### 指定发件人
```http
MAIL FROM: <zhangsan@example.com>
```
```log
MAIL FROM: <zhangsan@example.com>
250 OK
```

### 指定收件人
```http
RCPT TO: <lisi@example.com>
```
```log
RCPT TO: <lisi@example.com>
250 OK
```

### 告诉服务器准备输入邮件正文
```http
DATA
```
```log
DATA
354 End data with <CR><LF>.<CR><LF>
```

### 输入邮件正文
邮件内容输入完成后，回车 换行，输入 `.`，回车 换行，代表邮件发送结束
```http
这是邮件正文！
.
```
```log
这是邮件正文！
.
250 OK
```

### 断开连接
```http
QUIT
```
```log
QUIT
221 Bye
Connection closed by foreign host.
```

## 完整日志
客户端
```http
kitty@debian:~/kittyall$ telnet 127.0.0.1 1025
S: Trying 127.0.0.1...
S: Connected to 127.0.0.1.
S: Escape character is '^]'.
S: 220 debian Python SMTP 1.4.6
C: HELO debian
S: 250 debian
C: MAIL FROM: <zhangsan@example.com>
S: 250 OK
C: RCPT TO: <lisi@example.com>
S: 250 OK
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: 这是邮件正文！
C: .
S: 250 OK
C: QUIT
S: 221 Bye
S: Connection closed by foreign host.
```

客户端 更标准的(包含 报文首部)
```http {14-17}
kitty@debian:~/kittyall$ telnet 127.0.0.1 1025
S: Trying 127.0.0.1...
S: Connected to 127.0.0.1.
S: Escape character is '^]'.
S: 220 debian Python SMTP 1.4.6
C: HELO debian
S: 250 debian
C: MAIL FROM: <zhangsan@example.com>
S: 250 OK
C: RCPT TO: <lisi@example.com>
S: 250 OK
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: From: zhangsan@example.com
C: To: lisi@example.com
C: Subject: SMTP Telnet Test Email
C: 
C: 这是邮件正文！
C: .
S: 250 OK
C: QUIT
S: 221 Bye
S: Connection closed by foreign host.
```

服务端
```http
(telnet-py-pack) kitty@debian:~/kittyall$ python3 -m aiosmtpd -n -l 127.0.0.1:1025
---------- MESSAGE FOLLOWS ----------
这是邮件正文！
------------ END MESSAGE ------------
```
