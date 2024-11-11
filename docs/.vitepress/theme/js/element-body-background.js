/**
 * 不适用的
 * 切换页面时并不会重新调用
 * element-body-background.js
 * dynamic-height.vue
 * 
 */
function setBeforeHeight() {

    // 获取元素
    const body = document.getElementsByTagName("body")[0];
    const html = document.getElementsByTagName("html")[0];
    var root = document.querySelector(":root")

    // 获取body的宽度和高度
    const DOMW = document.body.clientWidth
    // const DOMH = document.body.scrollHeight
    const DOMH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);


    console.log(DOMW, DOMH)
    // console.log(DOMW, DOMH, root)
    body.style.setProperty('--body-before-height', DOMH + "px");
}

// 初始化
// setBeforeHeight();

// 监听窗口大小变化
// window.addEventListener('resize', setBeforeHeight);

// 监听暗色模式切换
// document.documentElement.addEventListener('theme-change', setBeforeHeight);
