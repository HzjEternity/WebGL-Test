
// 设置canvas大小
function settingSize() {
    const canvas = document.getElementById('canvas')
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
}

// 生成随机颜色
function randomColor() {
    return {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        a: Math.random()
    };
}

