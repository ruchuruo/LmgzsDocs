
import fs from 'node:fs'
import path from 'node:path'
import child_process from 'node:child_process'





/**
 * 获取指定文件从创建到最后修改的所有 Git 提交时间戳
 * @param filePath 文件路径
 * @returns 包含 "filePath" 所有修改时间戳(毫秒) 的数组, 按时间从旧到新排序(旧 -> 新)
 */
export default async function getFileGitTimestamps(filePath: string): Promise<number[]> {

    const normalizeFilePath = path.normalize(filePath);

    // 参数检查
    try {
        fs.accessSync(normalizeFilePath, fs.constants.F_OK);
    } catch (err) {
        console.error(`路径不存在: "${filePath}"`);
        return [];
    }

    return new Promise((resolve) => {

        // 拆分文件路径
        const dir = path.dirname(normalizeFilePath);
        const fileName = path.basename(normalizeFilePath);

        // git 命令
        // 获取文件从创建到最后修改的所有 Git 提交时间戳
        // --follow 选项用于跟踪文件的重命名和移动
        // --format=%at 选项用于格式化输出时间为 Unix 时间戳(秒)
        const gitCommand = `git log --follow --format=%at -- "${fileName}"`;

        // 执行 git 命令, 通过 cwd 参数切换到文件目录来执行
        // error  执行错误 命令由于某种原因中断了
        // stdout 标准输出 命令正常执行成功后返回的内容
        // stderr 错误输出 命令运行过程中产生的警告或错误信息
        child_process.exec(gitCommand, { cwd: dir }, (error, stdout) => {
            if (error || !stdout) {
                // console.error(`执行 Git 命令时出错: ${error}`);
                resolve([]);
                return;
            }

            const timestamps = stdout.trim()
                                     .split('\n')
                                     .filter(Boolean) // 过滤掉空行
                                     .map((line) => Number.parseInt(line, 10) * 1000) // 转换为 数字 和 JavaScript 使用的毫秒
                                     .reverse(); // 反转数组 git log 默认输出为 新 -> 旧

            resolve(timestamps);
        });
    });
}
