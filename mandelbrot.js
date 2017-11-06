let canvasData;
let canvasWidth;
let canvasHeight;

let colors = [
   [66, 30, 15],
   [25, 7, 26],
   [9, 1, 47],
   [4, 4, 73],
   [0, 7, 100],
   [12, 44, 138],
   [24, 82, 177],
   [57, 125, 209],
   [134, 181, 229],
   [211, 236, 248],
   [241, 233, 191],
   [248, 201, 95],
   [255, 170, 0],
   [204, 128, 0],
   [153, 87, 0],
   [106, 52, 3],
];

function mandelbrot() {
    let w = canvasWidth;
    let h = canvasHeight;
    let max = 32;

    let black = [0, 0, 0];
    for (let row=0; row < h-1; row++) {
        for (let col=0; col < w-1; col++) {
            let c_re = (col - w/2.0)* (4.0/w);
            let c_im = (row - h/2.0)* (4.0/w);
            let x = 0, y = 0;
            let iter = 0;
            while (x*x + y*y <= 4 && iter < max) {
                let x_new = x*x - y*y + c_re;
                y = 2*x*y + c_im;
                x = x_new;
                iter = iter + 1;
            }
            let color = colors[iter%colors.length];
            if (iter >= max) {
                drawPixel(col, row, black);
            } else {
                drawPixel(col, row, color);
            }
        }
    }
}

function drawPixel (x, y, rgba) {
    var off = (x + y * canvasWidth) * 4;
    canvasData.data[off++] = rgba[0];
    canvasData.data[off++] = rgba[1];
    canvasData.data[off++] = rgba[2];
    canvasData.data[off++] = 255;
}

onmessage = function(e) {
    let msg = e.data[0];
    canvasData = e.data[1];
    canvasWidth = e.data[2];
    canvasHeight = e.data[3];

    if (msg == 'mandelbrot') {
        mandelbrot();
        postMessage([canvasData]);
    } 
}
