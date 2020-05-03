// カラーピッカー本体
colorPickerDiv = document.createElement("div")
// カラーピッカーの幅と高さ
colorPickerDiv.setAttribute("style", "width: 240px; height: 306px;")
// 自分自身を取得
var nodeList = document.getElementsByTagName("script")
// カラーピッカー本体を追加
nodeList.item(nodeList.length - 1).parentNode.appendChild(colorPickerDiv)
colorPickerDiv.innerHTML = "<canvas width='200px' height='200px' id='ColorPicker'></canvas>"
colorPickerDiv.innerHTML += "<canvas width='40px' height='200px' id='Chroma'></canvas>"
colorPickerDiv.innerHTML += "<div style='width: 240px; height: 70px; display: flex; justify-content: center; align-items: center;'><div style='width: 218px; height: 78px; background-color: #000; border: solid 1px #000;' id='ColorPreview'></div></div>"
ColorPicker = document.getElementById("ColorPicker")
Chroma = document.getElementById("Chroma")
ColorPreview = document.getElementById("ColorPreview")
ColorPicker_ctx = ColorPicker.getContext("2d")
Chroma_ctx = Chroma.getContext("2d")
ColorPickerHeight = ColorPicker.height
ChromaHeight = Chroma.height
ColorPickerWidth = ColorPicker.width
ChromaWidth = Chroma.width
imageData = ColorPicker_ctx.createImageData(ColorPicker.width-20, ColorPicker.height-20)
imageData2 = Chroma_ctx.createImageData(Chroma.width-20, Chroma.height-20)
imgd = imageData.data
imgd2 = imageData2.data
ColorPickerX = ColorPickerWidth - 1
ColorPickerY = ColorPickerHeight - 1
ColorPickerR = 0
ColorPickerB = 0
ColorPickerG = 0
ColorPickerArray = [0, 0, 0]
h = 0
function ColorPickerFill(){
    var r = 255
    var g = 255
    var b = 255
    for (y = 0; y < ColorPickerHeight - 20; y++) {
        for (x = 0; x < ColorPickerWidth - 20; x++) {
            base = (x + y * (ColorPickerWidth - 20)) * 4
            if(0 <= h && h < 60){
                r =  255
                g = (255 * h) / 60
                b = 0
            }else if(60 <= h && h < 120){
                r = 255-(255 * (h - 60)) / 60
                g = 255
                b = 0
            }else if(120 <= h && h < 180){
                r = 0
                g = 255
                b = (255 * (h - 120 )) / 60
            }else if(180 <= h && h < 240){
                r = 0
                g = 255 - (255 * (h - 180)) / 60
                b = 255
            }else if(240 <= h && h < 300){
                r = (255 * (h - 240)) / 60
                g = 0
                b = 255
            }else if(300 <= h && h < 360){
                r = 255
                g = 0
                b = 255 - (255 * (h - 300)) / 60
            }
            
            s = x / (ColorPickerWidth - 21) * 100
            r2 = r + (255 - r) / 100 * (100 - s)
            g2 = g + (255 - g) / 100 * (100 - s)
            b2 = b + (255 - b) / 100 * (100 - s)
            
            v = 100 - y / (ColorPickerHeight - 21) * 100
            r3 = r2 / 100 * v
            g3 = g2 / 100 * v
            b3 = b2 / 100 * v
            
            imgd[base] = r3
            imgd[base + 1] = g3
            imgd[base + 2] = b3
            imgd[base + 3] = 255
        }
    }
    ColorPicker_ctx.putImageData(imageData, 10, 10)
}
function ChromaFill(){
    var r = 255
    var g = 255
    var b = 255
    for (y = 0; y < ChromaHeight - 20; y++) {
        for (x = 0; x < ChromaWidth - 20; x++) {
            base = (x + y * (ChromaWidth - 20)) * 4
            h = y / (ChromaHeight - 20) * 359
            if(0 <= h && h < 60){
                r =  255
                g = (255 * h) / 60
                b = 0
            }else if(60 <= h && h < 120){
                r = 255-(255 * (h - 60)) / 60
                g = 255
                b = 0
            }else if(120 <= h && h < 180){
                r = 0
                g = 255
                b = (255 * (h - 120 )) / 60
            }else if(180 <= h && h < 240){
                r = 0
                g = 255 - (255 * (h - 180)) / 60
                b = 255
            }else if(240 <= h && h < 300){
                r = (255 * (h - 240)) / 60
                g = 0
                b = 255
            }else if(300 <= h && h < 360){
                r = 255
                g = 0
                b = 255 - (255 * (h - 300)) / 60
            }
            imgd2[base] = r
            imgd2[base + 1] = g
            imgd2[base + 2] = b
            imgd2[base + 3] = 255
        }
    }
    Chroma_ctx.putImageData(imageData2, 10, 10)
}
function ChromaMoveFunction(y){
    if(!y){
        y = 10
    }
    x = 20
    if(y >= ChromaHeight - 11){y = ChromaHeight - 11}
    if(y <= 10){y = 10}
    Chroma_ctx.clearRect(0,0,ChromaWidth,ChromaHeight)
    Chroma_ctx.putImageData(imageData2, 10, 10)
    Chroma_ctx.beginPath()
    Chroma_ctx.strokeStyle = "#ffffff"
    Chroma_ctx.lineWidth = 1
    Chroma_ctx.arc(x, y, 3, 0, Math.PI*2, false)
    Chroma_ctx.stroke()
    Chroma_ctx.beginPath()
    Chroma_ctx.strokeStyle = "#000000"
    Chroma_ctx.lineWidth = 1
    Chroma_ctx.arc(x, y, 4, 0, Math.PI*2, false)
    Chroma_ctx.stroke()
    h = (y - 10) / (ChromaHeight - 20) * 359
    ColorPickerFill()
}
function ColorPickerMoveFunction(x, y){
    if(!x && !y){
        x = 0
        y = 0
    }
    if(x >= ColorPickerWidth - 11){x = ColorPickerWidth - 11}
    if(y >= ColorPickerHeight - 11){y = ColorPickerHeight - 11}
    if(x <= 10){x = 10}
    if(y <= 10){y = 10}
    base = ((x - 10) + (y - 10) * (ColorPickerWidth - 20)) * 4
    ColorPickerR = imgd[base]
    ColorPickerG = imgd[base + 1]
    ColorPickerB = imgd[base + 2]
    ColorPickerArray = [ColorPickerR, ColorPickerG, ColorPickerB]
    ColorPickerFill()
    ColorPickerX = Math.round(x)
    ColorPickerY = Math.round(y)
    ColorPicker_ctx.clearRect(0,0,ColorPickerWidth,ColorPickerHeight)
    ColorPicker_ctx.putImageData(imageData, 10, 10)
    ColorPicker_ctx.beginPath()
    ColorPicker_ctx.strokeStyle = "#ffffff"
    ColorPicker_ctx.lineWidth = 1
    ColorPicker_ctx.arc(x, y, 3, 0, Math.PI*2, false)
    ColorPicker_ctx.stroke()
    ColorPicker_ctx.beginPath()
    ColorPicker_ctx.strokeStyle = "#000000"
    ColorPicker_ctx.lineWidth = 1
    ColorPicker_ctx.arc(x, y, 4, 0, Math.PI*2, false)
    ColorPicker_ctx.stroke()
}
function ColorPreviewChange(r, g, b){
    if(r != null && g != null && b != null){
        ColorPickerR = r
        ColorPickerG = g
        ColorPickerB = b
    }
}
function initialize(){
    ChromaFill()
    ColorPickerFill()
    ChromaMoveFunction(0)
    ColorPickerMoveFunction(ColorPickerWidth - 11, ColorPickerHeight - 11)
    ColorPreviewChange()
}
function ColorPreviewFill(){
	ColorPreview.style.backgroundColor = "rgb(" + ColorPickerR + ", " + ColorPickerG + ", " + ColorPickerB + ")";
}
function ColorPickerColorChange(r, g, b){
    if(r != null && g == null && b == null && r.style){
        var backgroundColor = r.style.backgroundColor
        var backgroundColorLength = backgroundColor.length
        if(backgroundColor.indexOf("rgba") == -1){
            ColorPickerArray = backgroundColor.substr(4).substr(0, backgroundColorLength - 5).split(",")
        }else{
            ColorPickerArray = backgroundColor.substr(4).substr(0, backgroundColorLength - 6).split(",")
        }
        r = ColorPickerArray[0] * 1
        g = ColorPickerArray[1] * 1
        b = ColorPickerArray[2] * 1
        ColorPickerArray = [r, g, b]
    }
    ColorPickerColorChangeR = r
    ColorPickerColorChangeG = g
    ColorPickerColorChangeB = b
    max = Math.max(r,g,b)
    min = Math.min(r,g,b)
    if(max == r){h = 60 * ((g - b)/(max - min))}
    if(max == g){h = 60 * ((b - r)/(max - min)) + 120}
    if(max == b){h = 60 * ((r - g)/(max - min)) + 240}
    if(r == g && g == b && r == b){h = 0}
    if(h < 0){h += 360}
    var s = (max - min) / max
    if(max == 0){s = 0}
    var v = max / 255
    var x = s * (ColorPickerWidth - 20)
    var y = (ColorPickerHeight - 20) - v * (ColorPickerHeight - 20)
    ChromaMoveFunction(10 + h / 359 * (ChromaHeight - 20))
    ColorPickerMoveFunction(10 + x, 10 + y)
    ColorPickerR = ColorPickerColorChangeR
    ColorPickerG = ColorPickerColorChangeG
    ColorPickerB = ColorPickerColorChangeB
    ColorPreviewChange()
}
initialize()
ColorPickerMove = false
ChromaMove = false
ColorPicker.onmousedown = function(e){
    ColorPickerMove = true
    rect = ColorPicker.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top
    ColorPickerMoveFunction(offsetX, offsetY)
    ColorPreviewChange()
    ColorPreviewFill();
}
Chroma.onmousedown = function(e){
    ChromaMove = true
    rect = Chroma.getBoundingClientRect()
    offsetY = e.clientY - rect.top
    ChromaMoveFunction(offsetY)
    ColorPickerMoveFunction(ColorPickerX, ColorPickerY)
    ColorPreviewChange()
    ColorPreviewFill();
}
ColorPicker.onmouseout = function(){
    ChromaMove = false;
}
Chroma.onmouseout = function(){
    ChromaMove = false;
}
window.addEventListener("mousemove", function(e){
    rect = ColorPicker.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top
    if(ColorPickerMove == true){
    	ColorPickerFill()
        ColorPickerMoveFunction(offsetX, offsetY)
        ColorPreviewChange()
        ColorPreviewFill();
    }else if(ChromaMove == true){
        ChromaMoveFunction(offsetY)
        ColorPickerMoveFunction(ColorPickerX, ColorPickerY)
        ColorPreviewChange()
        ColorPreviewFill();
    }
});
window.addEventListener("mouseup", function(){
    ColorPickerMove = false
    ChromaMove = false
});

