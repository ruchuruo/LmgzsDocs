import fs from 'fs';
import path from 'path';

function copyFileSync(src, dest) {
    fs.copyFileSync(src, dest);
}

function copyFolderSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

export default function copyPlugin(options) {
    return {
        name: 'vite-plugin-copy',
        closeBundle: async () => {
            const srcDir = options.src; // 源文件夹路径
            const destDir = options.dest; // 目标文件夹路径

            if (!srcDir || !destDir) {
                console.error('源文件夹路径和目标文件夹路径必须提供');
                return;
            }

            try {
                if (fs.statSync(srcDir).isFile()) {
                    // 如果源路径是一个文件，直接复制文件
                    const destDirPath = path.dirname(destDir);
                    if (!fs.existsSync(destDirPath)) {
                        fs.mkdirSync(destDirPath, { recursive: true });
                    }
                    copyFileSync(srcDir, destDir);
                    console.log(`成功复制文件 ${srcDir} 到 ${destDir}`);
                } else {
                    // 如果源路径是一个文件夹，递归复制文件夹
                    copyFolderSync(srcDir, destDir);
                    console.log(`成功复制文件夹 ${srcDir} 到 ${destDir}`);
                }
            } catch (err) {
                console.error('复制文件或文件夹时出错:', err);
            }
        }
    };
}