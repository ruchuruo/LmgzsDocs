import fs from 'fs';

// 参数检查
function argumentVerify(filePath: string): boolean {

    if (filePath === undefined || filePath === null || filePath.trim() === '') {
        console.error("envFilePath 参数不能为空");
        return false;
    }

    try {
        fs.accessSync(filePath, fs.constants.R_OK);
    } catch (err) {
        console.error(`路径不可读: "${filePath}"`);
        return false;
    }

    return true;
}



/**
 * 加载环境变量
 * @param envFilePath   ".env" 文件路径
 * @param encoding      文件编码 默认为 "utf-8"
 * @param addProcessEnv 是否将环境变量添加到 "process.env" 中 默认为 "true"
 * @returns 如果 "addProcessEnv" 为 "false" 则返回一个包含环境变量的对象，否则返回 "void"
 */
export default function myLoadEnv(envFilePath: string,
    encoding: BufferEncoding = 'utf-8',
    addProcessEnv: boolean = true
): { [key: string]: string } | void {

    // 参数检查
    if (argumentVerify(envFilePath) === false) {
        return;
    }

    // 读取文件内容
    const envFileContentString: string = fs.readFileSync(envFilePath, encoding);

    // 按行分割
    const envFileContentArray: string[] = envFileContentString.split('\n');

    // 定义一个对象来存储环境变量
    const envObj: { [key: string]: string } = {};

    // 使用传统 for 循环遍历数组
    for (let i = 0; i < envFileContentArray.length; i++) {

        const line = envFileContentArray[i].trim();

        // 如果行内包含 "#"，则取 "#" 前面的部分
        const hashIndex = line.indexOf('#');
        const lineWithoutComments = hashIndex !== -1 ? line.substring(0, hashIndex).trim() : line;

        // 空行和注释跳过
        if (lineWithoutComments === '' || lineWithoutComments.startsWith('#')) {
            continue;
        }

        // 如果行内不包含 "=", 则跳过
        if (lineWithoutComments.includes('=') === false) {
            continue;
        }

        // 分割键值对
        const parts = lineWithoutComments.split('=');

        // 如果分割后的数组长度不为 2，则跳过
        if (parts.length !== 2) {
            continue;
        }

        // 去掉键和值的空格
        const key   = parts[0].trim();
        const value = parts[1].trim();

        // 如果 addProcessEnv 为 true，则将变量添加到 process.env
        if (addProcessEnv === true) {
            process.env[key] = value;
        }

        // 如果 addProcessEnv 为 false，则返回环境变量对象
        if (addProcessEnv === false) {
            envObj[key] = value;
        }
    }

    return addProcessEnv ? undefined : envObj;
}

// // 使用函数
// const envFilePath = "./read/.env";
// const myEnvObj = myLoadEnv(envFilePath, 'utf-8', false);
// console.log(myEnvObj);
