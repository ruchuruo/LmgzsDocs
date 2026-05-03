import { type Plugin } from 'vitepress'

// 自定义工具
import myLoadEnv from './load-env'





// 定义插件配置项的接口
interface ReplaceOptions {

    // 开发环境 变量文件路径
    devEnvFilePath: string;

    // 生产环境 变量文件路径
    buildEnvFilePath: string;

    // 文件编码 默认为 "utf-8"
    encoding: BufferEncoding;

    // 环境变量中对应的键名 比如 'VITE_ASSET_SERVER_URL'
    envKey: string;
}





/**
 * 获取给定的 键 对应的 值
 * - 从给定的 环境变量文件 中读取 变量
 * @param options 插件配置项的接口
 * @returns string
 */
export default function getEnvValue(options: ReplaceOptions): string {

    // 解构配置项
    const {
        devEnvFilePath,
        buildEnvFilePath,
        encoding = 'utf-8',
        envKey
    } = options;

    // 最终要替换的值
    let finalEnvValue = '';

    // 根据当前环境选择对应的 .env 文件路径
    const envFilePath = process.env.NODE_ENV === 'development' ? devEnvFilePath : buildEnvFilePath;

    // 只获取环境变量 不添加到 "process.env" 中
    const envObj: { [key: string]: string } | void = myLoadEnv(envFilePath, encoding, false);

    // 从加载的环境变量中获取最终要替换的值
    if (envObj && envObj[envKey]) {
        finalEnvValue = envObj[envKey];
    } else {
        // 没有找到就用空字符串
        finalEnvValue = '';
    }

    return finalEnvValue;
}
