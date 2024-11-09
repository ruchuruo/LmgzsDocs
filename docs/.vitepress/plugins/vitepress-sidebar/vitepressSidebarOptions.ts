
// 插件 vitepress-sidebar 选项
export const vitepressSidebarOptions = [
    {
        documentRootPath: 'docs',      // 文档根路径
        scanStartPath: '测试',         // 从 `docs/guides` 目录开始扫描
        basePath: '/测试/',            // 绝对路径
        resolvePath: '/测试/',         // 解析路径
        useTitleFromFileHeading: true, // 使用文件中的第一个标题作为侧边栏项的文本
        hyphenToSpace: true,           // 将文件名中的连字符转换为空格
        excludePattern: ['*index*'],   // 根据文件模式字符串数组排除文件或文件夹
        debugPrint: true,              // 在控制台中打印生成的侧边栏结构

        collapsed: true,               // VitePress 默认的侧边栏折叠
    },
    {
        documentRootPath: 'docs',      // 文档根路径
        scanStartPath: '落梦工作室',    // 从 `docs/guides` 目录开始扫描
        basePath: '/落梦工作室/',       // 绝对路径
        resolvePath: '/落梦工作室/',    // 解析路径
        useTitleFromFileHeading: true, // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true, // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,           // 将文件名中的连字符转换为空格
        excludePattern: ['*index*', '404'],   // 根据文件模式字符串数组排除文件或文件夹
        debugPrint: true,              // 在控制台中打印生成的侧边栏结构

        collapsed: true,               // VitePress 默认的侧边栏折叠
    },
    {
        documentRootPath: 'docs',      // 文档根路径
        scanStartPath: '啸霄领域',      // 从 `docs/guides` 目录开始扫描
        basePath: '/啸霄领域/',         // 绝对路径
        resolvePath: '/啸霄领域/',      // 解析路径
        useTitleFromFileHeading: true, // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true, // 使用Frontmatter作为侧边栏项的文本
        sortFolderTo: "bottom",        // 完成所有排序后，文件夹和文件将被分批放置。如果值为 top，则所有文件夹都放在文件上方；如果为 bottom，则放在文件下方。子文件夹中的项目也会一起排序。
        hyphenToSpace: true,           // 将文件名中的连字符转换为空格
        excludePattern: ['*index*', '404'],   // 根据文件模式字符串数组排除文件或文件夹
        debugPrint: true,              // 在控制台中打印生成的侧边栏结构

        collapsed: true,               // VitePress 默认的侧边栏折叠
    },
    {
        documentRootPath: 'docs',      // 文档根路径
        scanStartPath: '其他',         // 从 `docs/guides` 目录开始扫描
        basePath: '/其他/',            // 绝对路径
        resolvePath: '/其他/',         // 解析路径
        useTitleFromFileHeading: true, // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true, // 使用Frontmatter作为侧边栏项的文本
        sortFolderTo: "bottom",        // 完成所有排序后，文件夹和文件将被分批放置。如果值为 top，则所有文件夹都放在文件上方；如果为 bottom，则放在文件下方。子文件夹中的项目也会一起排序。
        hyphenToSpace: true,           // 将文件名中的连字符转换为空格
        excludePattern: ['*index*', '404'],   // 根据文件模式字符串数组排除文件或文件夹
        debugPrint: true,              // 在控制台中打印生成的侧边栏结构

        collapsed: true,               // VitePress 默认的侧边栏折叠
    },
    {
        documentRootPath: 'docs',      // 文档根路径
        scanStartPath: '合作须知',      // 从 `docs/guides` 目录开始扫描
        basePath: '/合作须知/',         // 绝对路径
        resolvePath: '/合作须知/',      // 解析路径
        useTitleFromFileHeading: true, // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true, // 使用Frontmatter作为侧边栏项的文本
        hyphenToSpace: true,           // 将文件名中的连字符转换为空格
        excludePattern: ['*index*', '404'],   // 根据文件模式字符串数组排除文件或文件夹
        debugPrint: true,              // 在控制台中打印生成的侧边栏结构

        collapsed: true,               // VitePress 默认的侧边栏折叠
    },
    {
        documentRootPath: 'docs',      // 文档根路径
        scanStartPath: '成员',         // 从 `docs/guides` 目录开始扫描
        basePath: '/成员/',            // 绝对路径
        resolvePath: '/成员/',         // 解析路径
        useTitleFromFileHeading: true, // 使用文件中的第一个标题作为侧边栏项的文本
        useTitleFromFrontmatter: true, // 使用Frontmatter作为侧边栏项的文本
        sortFolderTo: "bottom",        // 完成所有排序后，文件夹和文件将被分批放置。如果值为 top，则所有文件夹都放在文件上方；如果为 bottom，则放在文件下方。子文件夹中的项目也会一起排序。
        hyphenToSpace: true,           // 将文件名中的连字符转换为空格
        excludePattern: ['*index*', '404'],   // 根据文件模式字符串数组排除文件或文件夹
        debugPrint: true,              // 在控制台中打印生成的侧边栏结构

        collapsed: true,               // VitePress 默认的侧边栏折叠
    }
]