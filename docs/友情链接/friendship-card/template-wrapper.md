<div class="wrapper">
    <img src="#" alt="favicon">
    <a href="#" target="_blank">链接文本模板</a>
    <span>介绍模板</span>
</div>

<!-- 私有样式 -->
<style scoped>

.wrapper {
    background-color: rgb(240, 240, 240);

    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    margin: 4px;

    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;

    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    transition: 0.33s;

    .dark & {
        background-color: rgb(50, 50, 50);
        border-color: rgba(255, 255, 255, 0.1);
    }
}

.wrapper:hover {
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

img {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: rgb(100, 100, 100);
}

a {
    font-size: 1.1em;
    font-weight: 600;
    color: rgb(0, 0, 0);
    text-decoration: none;

    /* 当标题过长时自动显示省略号 */
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;

    .dark & {
        color: rgb(255, 255, 255);
    }
}

span {
    color: rgb(100, 100, 100);
    font-size: 1em;

    .dark & {
        color: rgb(200, 200, 200);
    }
}

</style>
