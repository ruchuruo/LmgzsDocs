
/*
    为 .vitepress/config.mts defineConfig 获取值
 */

import getTime from './get-time';
import getEnvValue from './get-env-value';





// 获取 构建输出目录
export function getOutDir(): string {
    return  process.env.GITHUB_PAGES_BUILD_OUT_DIR ||
            process.env.CLOUDFLARE_PAGES_BUILD_OUT_DIR ||
            `./.vitepress/dist/${getTime("--_..") || 'NoneTime'}`
}

// 获取 favicon
export function getFavicon(): string {
    return  getEnvValue({
                devEnvFilePath:   './.env.public.development',
                buildEnvFilePath: './.env.public.production',
                encoding:         'utf-8',
                envKey:           'DOCS_STATIC_ASSET_SERVER',
            }) + "/public/images/icon/favicon.svg"
}

// 获取 导航栏logo url
export function getNavLogoServer(): string {
    return  getEnvValue({
                devEnvFilePath:   './.env.public.development',
                buildEnvFilePath: './.env.public.production',
                encoding:         'utf-8',
                envKey:           'DOCS_STATIC_ASSET_SERVER',
            }) + "/public/images/icon/nav-logo.svg"
}

// 获取 文件索引服务器
export function getFileIndexServer(): string {
    return  getEnvValue({
                devEnvFilePath:   './.env.public.development',
                buildEnvFilePath: './.env.public.production',
                encoding:         'utf-8',
                envKey:           'FILE_INDEX_SERVER',
            })
}

// 获取 Minecraft Skin 服务器
export function getMinecraftSkinServer(): string {
    return  getEnvValue({
                devEnvFilePath:   './.env.public.development',
                buildEnvFilePath: './.env.public.production',
                encoding:         'utf-8',
                envKey:           'MINECRAFT_SKIN_SERVER',
            })
}
