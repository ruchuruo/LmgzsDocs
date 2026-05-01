
// 声明模块
// TypeScript 需要这些类型声明来理解模块类型
// 避免 index.ts 中报错: "找不到“*.css”的副作用导入的模块或类型声明。"
declare module '*.css';
declare module '*.vue';
