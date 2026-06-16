# Pages重定向到自定义域名
::: info
- Cloudflare Pages 默认域名格式: xxx.pages.dev
- Cloudflare Pages 无法关闭默认域名，Workers 才能关闭默认域名
- 可以使用重定向，当访问默认域名时跳转到自定义域名
:::





### 1
在侧栏找到
- Protect & Connect 保护 & 连接
    - Delivery & performance 交付 & 性能
        - Bulk redirects 批量重定向

### 2
Bulk Redirect Lists 批量重定向列表

#### 2.1
点击
- Create Bulk Redirect List 创建批量重定向列表

#### 2.2
Bulk Redirect Lists > **Name list** > Add URLs > Edit URLs
- Name 名字
- 输入名字
- 不可更改

#### 2.3
Bulk Redirect Lists > Name list > **Add URLs** > Edit URLs
- Or, manually add URL redirects 或者，手动添加URL重定向
- 手动添加

| Source URL | Target URL | Status | Edit parameters |
| - | - | - | - |
| Pages默认域名 / | https:// 自定义域名 / | 301 | 全选 |

Edit parameters 编辑参数
- ✔ Preserve query string  保留查询字符串
- ✔ Include subdomains     包含子域名
- ✔ Subpath matching       子路径匹配
- ✔ Preserve path suffix   保留路径后缀

#### 2.4
Bulk Redirect Lists > Name list > Add URLs > **Edit URLs**
- 此处可以修改已经添加的 URL

保存

### 3
#### 3.1
点击
- Create Bulk Redirect Rule 创建批量重定向规则

#### 3.2
Rule name 规则名称
- 输入名字

Redirect incoming requests based on the URL redirects in the following list:
根据以下列表中的URL重定向，重定向来的请求
- 选择刚才创建的列表

保存

#### 4
回到
- Bulk Redirects 批量重定向

确认规则启用
