# LmgzsDocs

---

## 开发
### 安装
[Node.js](https://nodejs.org/) 20 及以上版本



### 克隆仓库
```c
https://github.com/ruchuruo/LmgzsDocs.git
```
```c
https://github.com/ruchuruo/LmgzsDocs_StaticAsset.git
```



### 开启http服务
打开 `LmgzsDocs_StaticAsset` 目录开启http服务

可以参考以下方法

- python
```c
python3 -m http.server <port>
python3 -m http.server 8001
```

- nodejs
```c
npx http-server -p <port>
npx http-server -p 8001
```

- vscode 扩展
[Ritwick Dey - Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)



### 安装 npm 包
打开 `LmgzsDocs` 目录执行命令
```sh
npm install
```



### 设置变量
修改 `LmgzsDocs` 根目录下 `.env.public.development` 文件中的 `STATIC_ASSET_SERVER_URL`



### 启动并运行
打开 `LmgzsDocs` 目录执行命令
```c
npm run docs:dev
```



### 注意事项
每次运行 `dev` 启动命令时，NodeJS `process.env.NODE_ENV` 可能不为 `development`

所以会读取 `.env.public.production` 变量文件

需要重启来获取正确的 环境变量，在任务终端中键入 `r`
