# smtp报文格式

### 交换报文文本的例子
在 SMTP 客户(C) 和 SMTP 服务器(S) 之间交换报文文本的例子。

客户的主机名为 `crepes.fr`，服务器的主机名为 `hamburger.edu`。

以 "C:" 开头的 ASCII 码文本行正是客户交给其 TCP 套接字的那些行，以 "S:" 开头的 ASCII 码文本行则是服务器发送给其 TCP 套接字的那些行。一旦创建了 TCP 连接，就开始了下列过程。

```http
S:  220 hamburger.edu
C:  HELO crepes.fr
S:  250 Hello crepes.fr, pleased to meet you
C:  MAIL FROM: <alice@crepes.fr>
S:  250 alice@crepes.fr ... Sender ok
C:  RCPT TO: <bob@hamburger.edu>
S:  250 bob@hamburger.edu ... Recipient ok
C:  DATA
S:  354 Enter mail, end with "." on a line by itself
C:  Do you like ketchup?
C:  How about pickles?
C:  .
S:  250 Message accepted for delivery
C:  QUIT
S:  221 hamburger.edu closing connection
```
- 客户从邮件服务器 `crepes.fr` 向邮件服务器 `hamburger.edu` 发送了一个报文 ("Do you like ketchup? How about pickles?")。

- 作为对话的一部分，该客户发送了5条命令 (这些命令都是自解释的):
    - `HELO` (HELLO 的缩写)
    - `MAIL FROM`
    - `RCPT TO`
    - `DATA`
    - `QUIT`

- 该客户通过发送一个只包含一个句点的行，向服务器指示该报文结束了。(按照 ASCII 码的表示方法，每个报文以 `CRLF.CRLF` 结束，其中的 `CR` 和 `LF` 分别表示 回车 和 换行。)

- 服务器对每条命令做出回答，其中每个回答含有一个 回答码 和一些 英文解释(可选的)。

SMTP 用的是持续连接
- 如果发送邮件服务器有几个报文发往同一个接收邮件服务器，它可以通过同一个 TCP 连接发送所有这些报文。
- 对每个报文，该客户用一个新的 "`MAIL FROM:` `crepes.fr`" 开始
- 用一个独立的 句点 指示该邮件的结束，并且仅当所有邮件发送完后才发送 `QUIT`。

### Telnet
[使用 Telnet 与一个 SMTP 服务器进行一次直接对话](../实验/telnet.md)
```sh
telnet <ip/域名> <端口>
```
```sh
telnet example.com 25
```

执行命令后
- 在本地主机与邮件服务器之间建立了一个 TCP 连接
- 立即会从该服务器收到 `220` 回答。

接下来，在适当的时机发出 `HELO`、`MAIL FROM`、`RCPT TO`、`DATA`、`CRLF.CRLF` 、`QUIT` 等 SMTP 命令。

### 邮件报文格式
当一个人给另一个人发送电子邮件时，一个包含环境信息的首部位于报文体前面。(如对方的地址、自己的回复地址以及日期等)

这些环境信息包括在一系列首部行中，这些行由 RFC 5322 定义。

首部行和该报文的体用空行(即 回车 和 换行)进行分隔。RFC 5322 定义了邮件首部行和它们的语义解释的精确格式。如同 HTTP 一样，每个首部行包含了可读的文本，是由关键词后跟冒号及其值组成的。

某些关键词是必需的，另一些则是可选的。每个首部必须含有一个 `From:` 首部行和一个 `To:` 首部行，一个首部也许包含一个 `Subject:` 首部行以及其他可选的首部行。

这些首部行不同于 SMTP 命令(即使那里包含了某些相同的词汇，如 from 和 to)。那些命令是 SMTP 握手协议的一部分，这里的首部行则是邮件报文自身的一部分。

一个典型的报文首部看起来如下：
```http
From: alice@crepes.fr
To: bob@hamburger.edu
Subject: Searching for the meaning of life.
```
- 在报文首部之后，紧接着一个空白行，然后是以 ASCII 格式表示的报文体。

应当用 Telnet 向邮件服务器发送包含一些首部行的报文，包括 `Subject:` 首部行。
