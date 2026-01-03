
// 插件 vitepress-sidebar 选项
export const vitepressSidebarOptions = [
    {
        documentRootPath: 'docs',                // 文档根路径
        scanStartPath: '测试',                   // 从 `docs/guides` 目录开始扫描
        resolvePath: '/测试/',                   // 配置多个侧边栏 解析路径
        basePath: '/测试/',                      // 配置多个侧边栏 绝对路径
        useTitleFromFileHeading: true,           // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true,           // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,                     // 将文件名中的连字符转换为空格
        sortMenusOrderNumericallyFromTitle: true,//排序 按照文件名开头数字
        sortFolderTo: "bottom" as const,         // 排序 文件在文件夹上方
        collapsed: true,                         // 侧边栏折叠
        excludePattern: [                        // 根据文件模式字符串数组排除文件或文件夹
            '*index*',
            '404'
        ],
        debugPrint: false, // 在控制台中打印生成的侧边栏结构
    },
    {
        documentRootPath: 'docs',                // 文档根路径
        scanStartPath: '落梦工作室',             // 从 `docs/guides` 目录开始扫描
        resolvePath: '/落梦工作室/',             // 配置多个侧边栏 解析路径
        basePath: '/落梦工作室/',                // 配置多个侧边栏 绝对路径
        useTitleFromFileHeading: true,           // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true,           // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,                     // 将文件名中的连字符转换为空格
        sortMenusOrderNumericallyFromTitle: true,//排序 按照文件名开头数字
        sortFolderTo: "bottom" as const,         // 排序 文件在文件夹上方
        collapsed: true,                         // 侧边栏折叠
        excludePattern: [                        // 根据文件模式字符串数组排除文件或文件夹
            '*index*',
            '404'
        ],
        debugPrint: false, // 在控制台中打印生成的侧边栏结构
    },
    {
        documentRootPath: 'docs',                // 文档根路径
        scanStartPath: '啸霄领域',               // 从 `docs/guides` 目录开始扫描
        resolvePath: '/啸霄领域/',               // 配置多个侧边栏 解析路径
        basePath: '/啸霄领域/',                  // 配置多个侧边栏 绝对路径
        useTitleFromFileHeading: true,           // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true,           // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,                     // 将文件名中的连字符转换为空格
        sortMenusOrderNumericallyFromTitle: true,//排序 按照文件名开头数字
        sortFolderTo: "bottom" as const,         // 排序 文件在文件夹上方
        collapsed: true,                         // 侧边栏折叠
        excludePattern: [                        // 根据文件模式字符串数组排除文件或文件夹
            '*index*',
            '404'
        ],
        debugPrint: false, // 在控制台中打印生成的侧边栏结构
    },
    {
        documentRootPath: 'docs',                // 文档根路径
        scanStartPath: '其他',                   // 从 `docs/guides` 目录开始扫描
        resolvePath: '/其他/',                   // 配置多个侧边栏 解析路径
        basePath: '/其他/',                      // 配置多个侧边栏 绝对路径
        useTitleFromFileHeading: true,           // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true,           // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,                     // 将文件名中的连字符转换为空格
        sortMenusOrderNumericallyFromTitle: true,//排序 按照文件名开头数字
        sortFolderTo: "bottom" as const,         // 排序 文件在文件夹上方
        collapsed: true,                         // 侧边栏折叠
        excludePattern: [                        // 根据文件模式字符串数组排除文件或文件夹
            '*index*',
            '404'
        ],
        debugPrint: false, // 在控制台中打印生成的侧边栏结构
    },
    {
        documentRootPath: 'docs',                // 文档根路径
        scanStartPath: '合作须知',               // 从 `docs/guides` 目录开始扫描
        resolvePath: '/合作须知/',               // 配置多个侧边栏 解析路径
        basePath: '/合作须知/',                  // 配置多个侧边栏 绝对路径
        useTitleFromFileHeading: true,           // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true,           // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,                     // 将文件名中的连字符转换为空格
        sortMenusOrderNumericallyFromTitle: true,//排序 按照文件名开头数字
        sortFolderTo: "bottom" as const,         // 排序 文件在文件夹上方
        collapsed: true,                         // 侧边栏折叠
        excludePattern: [                        // 根据文件模式字符串数组排除文件或文件夹
            '*index*',
            '404'
        ],
        debugPrint: false, // 在控制台中打印生成的侧边栏结构
    },
    {
        documentRootPath: 'docs',                // 文档根路径
        scanStartPath: '成员',                   // 从 `docs/guides` 目录开始扫描
        resolvePath: '/成员/',                   // 配置多个侧边栏 解析路径
        basePath: '/成员/',                      // 配置多个侧边栏 绝对路径
        useTitleFromFileHeading: true,           // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true,           // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,                     // 将文件名中的连字符转换为空格
        sortMenusOrderNumericallyFromTitle: true,//排序 按照文件名开头数字
        sortFolderTo: "bottom" as const,         // 排序 文件在文件夹上方
        collapsed: true,                         // 侧边栏折叠
        excludePattern: [                        // 根据文件模式字符串数组排除文件或文件夹
            '*index*',
            '404',
            'inclusion.md'
        ],
        debugPrint: false, // 在控制台中打印生成的侧边栏结构
    }
]