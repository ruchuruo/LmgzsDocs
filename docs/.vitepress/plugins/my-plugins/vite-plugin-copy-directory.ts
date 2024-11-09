import fs from 'fs';
import path from 'path';

// 复制文件
function copy_file__sync(src, dest) {

    // 判断路径是否存在
    // 源路径
    if(!fs.existsSync(src))
    {
        // 不存在
        console.error('源路径 不存在: ' + src);
        return;
    }
    // 目标路径
    // if(!fs.existsSync(dest))
    // {
    //     // 不存在
    //     console.error('目标路径 不存在: ' + dest);
    //     return;
    // }

    // 复制文件
    fs.copyFileSync(src, dest);
}

// 递归复制文件夹
function copy_folder__sync(src, dest) {

    // 判断路径是否存在
    // 源路径
    if(!fs.existsSync(src))
    {
        // 不存在
        console.error('源路径 不存在: ' + src);
        return;
    }
    // 目标路径
    if(!fs.existsSync(dest))
    {
        // 不存在
        console.error('目标路径 不存在: ' + dest);

        // 递归创建文件夹
        fs.mkdirSync(dest, { recursive: true });
        console.error('创建文件夹: ' + dest);
        // return;
    }

    // true时将在下次创建文件夹
    // var creationDirectoryFlag = false;
    // fs.mkdirSync(dest, { recursive: true });

    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copy_folder__sync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}


/**
 * vite 插件 复制目录
 * @param options.srcPath  源路径
 * @param options.destPath 目标路径
 * @returns
 */
export default function copy_directory(options) {
    return {
        name: 'vite-plugin-copy-directory',

        // 在构建结束时调用
        buildEnd: async () => {
            const srcPath = options.srcPath;   // 源路径
            const destPath = options.destPath; // 目标路径

            // 判断路径是否为空
            if (!srcPath || !destPath)
            {
                // 为空
                console.error('必须提供 源路径 和 目标路径');
                return;
            }

            // 判断路径是否存在
            // 源路径
            if(!fs.existsSync(srcPath))
            {
                // 不存在
                console.error('源路径 不存在: ' + srcPath);
                return;
            }
            // 目标路径
            // if(!fs.existsSync(destPath))
            // {
            //     // 不存在
            //     console.error('目标路径 不存在: ' + destPath);
            //     return;
            // }

            try {

                // 判断是否是文件
                if (fs.statSync(srcPath).isFile()) {
                    // 是文件
                    copy_file__sync(srcPath, destPath);
                    console.log(`成功复制文件 ${srcPath} 到 ${destPath}`);
                }

                // 判断是否是文件夹
                if (fs.statSync(srcPath).isDirectory()){
                    // 是文件夹
                    copy_folder__sync(srcPath, destPath);
                    console.log(`成功复制文件夹 ${srcPath} 到 ${destPath}`);
                }

                // console.log('未知类型')
            } catch (err) {
                console.error('复制文件或文件夹时出错:', err);
            }
        }
    };
}



