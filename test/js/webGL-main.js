
class webGL{

}

// 源码分配及编译
function createShader(gl, type, shaderSource) {
    // 创建着色器对象
    const shaderObj = gl.createShader(gl[ type ])
    // 源码分配到着色器对象
    gl.shaderSource(shaderObj, shaderSource)
    // 编译着色器
    gl.compileShader(shaderObj)
    // 返回着色器对象
    return shaderObj
}

// 创建着色器对象
function createProgram (webGl, shaderArr) {
    //创建着色器程序
    const program = webGl.createProgram();
    //将顶点、片元着色器挂载在着色器程序上
    shaderArr.forEach((shader) => {
        webGl.attachShader(program, shader);
    })
    //链接着色器程序
    webGl.linkProgram(program);
    return program
}

// 清除画布
function clearColor(webGl) {
    // 设置清空画布颜色为黑色
    webGl.clearColor(0, 0, 0, 1.0);
    // 用上一步设置的清空画布颜色清空画布
    webGl.clear(webGl.COLOR_BUFFER_BIT);
}

// 绘制图形
function webGl_Graphing(canvas, vertexShaderSource, fragmentShaderSource) {
    /**
     * @vertexShaderSource: 顶点着色器源码
     * @fragmentShaderSource 片元着色器源码
     * @canvas: canvas 节点
     **/

    const webGl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl")

    // 创建、编译顶点着色器对象
    const vertexShader = createShader(webGl, 'VERTEX_SHADER', vertexShaderSource)
    // 创建、编译片元着色器对象
    const fragmentShader = createShader(webGl, 'FRAGMENT_SHADER', fragmentShaderSource)
    // 创建着色器程序
    const program = createProgram(webGl, [vertexShader, fragmentShader])
    // 使用创建的着色器程序
    webGl.useProgram(program)

    // 清空画布颜色
    clearColor(webGl)

    // 找到顶点着色器中的变量a_Position
    const a_Position = webGl.getAttribLocation(program, 'a_Position')
    // 找到顶点着色器中的变量a_Screen_Size
    const a_Screen_Size = webGl.getAttribLocation(program, 'a_Screen_Size')
    // 找到片元着色器中的变量u_Color
    const u_Color = webGl.getUniformLocation(program, 'u_Color')
    // 为顶点着色器中的 a_Screen_Size 传递 canvas 的宽高信息
    webGl.vertexAttrib2f(a_Screen_Size, canvas.width, canvas.height)

    // 存储点击位置的容器。
    const points = [];
    // 绑定点击事件
    canvas.addEventListener('click', e => {
        const x = e.pageX;
        const y = e.pageY;
        const color = randomColor();
        points.push({ x: x, y: y, color: color })

        //清除画布
        clearColor(webGl)
        // 遍历绘制点
        points.forEach((point) => {
            const color = point.color;

            // 为片元着色器中的 u_Color 传递随机颜色
            webGl.uniform4f(u_Color, color.r, color.g, color.b, color.a)
            // 为顶点着色器中的 a_Position 传递顶点坐标
            webGl.vertexAttrib2f(a_Position, point.x, point.y)
            // 绘制点
            webGl.drawArrays(webGl.POINTS, 0, 1)
        })
    })
}


