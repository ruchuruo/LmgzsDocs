import { type Plugin } from 'vitepress'

// 自定义工具
import getFileGitTimestamps from '../../utils/my-utils/get-file-git-timestamps'





// 定义插件配置项的接口
interface InjectionOptions {

    // 要处理的文件后缀列表
    fileExtensionArray: string[];
}





/**
 * 在页面的 frontmatter 中注入文件的 Git 时间戳
 */
export default function pageFrontmatterInjectionTimestamp(options: InjectionOptions): Plugin {

    // 解构配置项
    const {
        fileExtensionArray = [".md"]
    } = options;

    return {
        name: 'vite-plugin-page-frontmatter-injection-timestamp', // 插件名称
        enforce: 'pre',                                           // 强制插件在 VitePress 处理 Markdown 之前运行

        // code 是文件的原始字符串
        // id   是文件绝对路径
        async transform(code, id) {

            // 标志 是否应该处理这个文件
            let shouldProcess: boolean = false;

            // 没有指定文件后缀列表，或者列表为空，则不处理任何文件
            if (fileExtensionArray === undefined || fileExtensionArray.length === 0) {
                shouldProcess = false;
                return null;
            }

            // 当前文件后缀 和 fileExtensionArray 列表进行匹配
            for (let i = 0; i < fileExtensionArray.length; i++) {
                const fileExt = fileExtensionArray[i].trim();

                if (id.endsWith(fileExt) === true) {
                    // 匹配成功 设置标志为 true 并跳出循环
                    shouldProcess = true;
                    break;
                }
            }

            // 如果标志为 true 则执行操作
            if (shouldProcess) {

                // 获取当前文件的时间戳数据
                const timestamps = await getFileGitTimestamps(id);

                // 没有 git 记录 直接返回
                if (!timestamps || timestamps.length === 0) return null

                const createTime = timestamps[0]
                const updateTime = timestamps[timestamps.length - 1]
                const editCount = timestamps.length

                // 构造要注入的 YAML 节点 (注意缩进格式)
                const yamlNode = `myGitArticleData:\n` + 
                                 `    createTime: ${createTime}\n` +
                                 `    updateTime: ${updateTime}\n` +
                                 `    editCount: ${editCount}\n`;

                // 匹配顶部的 Frontmatter 区域中的内容 (--- 内部的内容) \r? 以兼容 Windows (CRLF) (\r? 表示 \r 是可选)
                const frontmatterMatch = code.match(/^---\r?\n([\s\S]*?)\r?\n---/);

                if (frontmatterMatch) {

                    // frontmatterMatch[0] 是完整内容 包括首尾 ---
                    // frontmatterMatch[1] 是 --- 内部内容
                    const innerContent = frontmatterMatch[1];

                    // 将 YAML 节点拼接到原内容下方 并重新用 --- 闭合
                    const newFrontmatter = `---\n${innerContent}\n${yamlNode}---`;

                    // 将 YAML 节点插入到 Frontmatter 区域的末尾
                    return code.replace(frontmatterMatch[0], newFrontmatter);
                } else {
                    // 没有找到 Frontmatter 区域 在文件开头插入
                    return `---\n${yamlNode}---\n\n${code}`;
                }
            }
        }
    }
}
