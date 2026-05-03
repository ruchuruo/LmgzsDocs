import { type Plugin } from 'vitepress'

// 自定义工具
import myLoadEnv from '../../utils/my-utils/load-env'





// 定义插件配置项的接口
interface ReplaceOptions {

    // 开发环境 变量文件路径
    devEnvFilePath: string;

    // 生产环境 变量文件路径
    buildEnvFilePath: string;

    // 文件编码 默认为 "utf-8"
    encoding: BufferEncoding;

    // 要处理的文件后缀列表
    fileExtensionArray: string[];

    // 要替换的关键字 比如 '@server'
    keyword: string;

    // 环境变量中对应的键名 比如 'VITE_ASSET_SERVER_URL'
    envKey: string;
}





/**
 * pre 阶段 替换 关键字
 * - 从给定的 环境变量文件 中读取 变量
 * - 效果:
 *      - SERVER_URL -> http://127.0.0.1:8080
 * @param options 插件配置项的接口
 * @returns Plugin
 */
export default function preReplaceKeyword(options: ReplaceOptions): Plugin {

    // 解构配置项
    const {
        devEnvFilePath,
        buildEnvFilePath,
        encoding = 'utf-8',
        fileExtensionArray,
        keyword,
        envKey
    } = options;

    // 最终要替换的值
    let finalEnvValue = '';

    return {
        name: 'vite-plugin-pre-replace-keyword', // 插件名称
        enforce: 'pre',                          // 强制插件在 VitePress 处理 Markdown 之前运行

        configResolved(config) {
            // 根据当前环境选择对应的 .env 文件路径
            const envFilePath = config.command === 'serve' ? devEnvFilePath : buildEnvFilePath;

            // 只获取环境变量 不添加到 "process.env" 中
            const envObj: { [key: string]: string } | void = myLoadEnv(envFilePath, encoding, false);

            // 从加载的环境变量中获取最终要替换的值
            if (envObj && envObj[envKey]) {
                finalEnvValue = envObj[envKey];
            } else {
                // 没有找到就用空字符串
                finalEnvValue = '';
            }
        },

        // code 是文件的原始字符串
        // id   是文件绝对路径
        transform(code, id) {

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

            // 如果标志为 true 则执行替换操作
            if (shouldProcess) {
                // 执行全局替换
                // 使用正则转义，防止 keyword 包含特殊字符导致正则失效
                const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexObj = new RegExp(safeKeyword, 'g');

                return code.replace(regexObj, finalEnvValue);
            }

            // 否则返回 null 不做处理
            return null;
        }
    }
}
