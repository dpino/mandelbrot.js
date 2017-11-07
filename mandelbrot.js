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

function mandelbrot(canvasData, xo, yo, xf, yf) {
    let w = xf;
    let h = yf;
    let max = 32;

    let black = [0, 0, 0];
    for (let row=xo; row < h-1; row++) {
        for (let col=yo; col < w-1; col++) {
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
            let pos = (col + row * xf) * 4;
            let color = (iter >= max) ? black : colors[iter%colors.length];
            drawPixel(canvasData, pos, color);
        }
    }
}

function drawPixel (canvasData, pos, rgba) {
    canvasData.data[pos++] = rgba[0];
    canvasData.data[pos++] = rgba[1];
    canvasData.data[pos++] = rgba[2];
    canvasData.data[pos++] = 255;
}

onmessage = function(e) {
    let canvasData = e.data[0];
    let xo = e.data[1];
    let yo = e.data[2];
    let xf = e.data[3];
    let yf = e.data[4];

    mandelbrot(canvasData, xo, yo, xf, yf);
    postMessage([canvasData]);
}
