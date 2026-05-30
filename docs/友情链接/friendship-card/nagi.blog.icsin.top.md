<div class="wrapper">
    <div class="overlay">
        <div class="title">
            <img src="__LmgzsDocs_STATIC_ASSET_SERVER__/__CUR_DIR__/images/nagi.blog.icsin.top/favicon.png" alt="favicon">
            <a href="https://nagi.blog.icsin.top/" target="_blank">Na-Gi</a>
        </div>
        <div class="introduction">
            <span>传播经验</span>
            <span>-</span>
            <span>分享快乐</span>
            <span>-</span>
        </div>
    </div>
</div>

<!-- 私有样式 -->
<style scoped>

.wrapper {
    background-color: rgb(240, 240, 240);
    background: url(__LmgzsDocs_STATIC_ASSET_SERVER__/__CUR_DIR__/images/nagi.blog.icsin.top/background.jpg)no-repeat center;
    background-size: cover;

    border-radius: 12px;

    margin: 4px;

    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    transition: 0.33s;

    overflow: hidden;

    .dark & {
        background-color: rgb(50, 50, 50);
        border-color: rgba(255, 255, 255, 0.1);
    }
}

.wrapper:hover {
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

.overlay {
    width: 100%;
    height: 100%;

    padding-top: 16px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;

    background-color: rgba(0, 0, 0, 0.4);
}

.title {
    display: flex;
    gap: 8px;
}

.introduction {
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 0px;
    padding-right: 0px;
}

img {
    margin: 0px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: rgb(100, 100, 100);
}

a {
    font-size: 1.1em;
    font-weight: 600;
    color: rgb(127, 255, 0);
    text-decoration: none;

    /* 当标题过长时显示省略号 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;

    .dark & {
        color: rgb(67, 205, 128);
    }
}

span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: bottom; /* 保持与光标对齐 */

    font-size: 1em;

    color: rgb(144, 238, 144);

    .dark & {
        color: rgb(173, 216, 230);
    }
}





/* ======== ======== 动画 ======== ======== */

/* 第1个 span */
span:nth-of-type(1) {
    width: 0; /* 默认宽度0 由动画展开 */
    animation: typing-1 10s infinite;
}

/* 第2个 span */
span:nth-of-type(2) {
    width: 0; /* 默认宽度0 由动画展开 */
    animation: typing-2 10s infinite;
}

/* 第3个 span */
span:nth-of-type(3) {
    width: 0; /* 默认宽度0 由动画展开 */
    animation: typing-3 10s infinite;
}

/* 第4个 span */
span:nth-of-type(4) {
    animation: blink 0.7s infinite;
}



/* 动画关键帧 */

/* 打字机 */
@keyframes typing-1 {
    0% {
        width: 0;
        animation-timing-function: steps(4);
    }
    5% {
        width: 6.4ch;
    }
    100% {
        width: 6.4ch;
    }
}
@keyframes typing-2 {
    0% {
        width: 0;
        animation-timing-function: steps(1);
    }
    5% {
        width: 1ch;
    }
    100% {
        width: 1ch;
    }
}
@keyframes typing-3 {
    5% {
        width: 0;
        animation-timing-function: steps(4);
    }
    10% {
        width: 6.4ch;
    }
    100% {
        width: 6.4ch;
    }
}

/* 闪烁 */
@keyframes blink {
    from, to { opacity: 0; }
    50% { opacity: 1; }
}

</style>
