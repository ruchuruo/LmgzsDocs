
/**
 * 获取当前时间
 * @param delimiterString 分隔符, 用于分割时间各部分
 * @returns 格式化后的时间字符串, 返回 "delimiterString + 1" 个时间部分
 */
export default function getTime(delimiterString: string): string {

    if (!delimiterString || delimiterString.length > 6) {
        console.error('分隔符长度必须在1-6个字符之间');
        return '';
    }

    const nowDate = new Date();
    const timeArray = [];

    timeArray.push(nowDate.getFullYear());     // 年
    timeArray.push(nowDate.getMonth() + 1);    // 月
    timeArray.push(nowDate.getDate());         // 日
    timeArray.push(nowDate.getHours());        // 时
    timeArray.push(nowDate.getMinutes());      // 分
    timeArray.push(nowDate.getSeconds());      // 秒
    timeArray.push(nowDate.getMilliseconds()); // 毫秒

    let finalTime = '';

    for (let i = 0; i < delimiterString.length; i++) {
        finalTime += timeArray[i] + delimiterString[i];
    }

    finalTime += timeArray[delimiterString.length];

    return finalTime;
}
