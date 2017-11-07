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

function mandelbrot(ia, rs, re, w, h) {
    let max = 32;

    let black = [0, 0, 0];
    for (let row=rs; row < re; row++) {
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
            let pos = (col + row * w) * 4;
            let color = (iter >= max) ? black : colors[iter%colors.length];
            drawPixel(ia, pos, color);
        }
    }
}

function drawPixel (ia, pos, rgba) {
    ia[pos++] = rgba[0];
    ia[pos++] = rgba[1];
    ia[pos++] = rgba[2];
    ia[pos++] = 255;
}

onmessage = function(e) {
    let ia = e.data[0];
    let tag = e.data[1];
    let nworkers = e.data[2];
    let w = e.data[3];
    let h = e.data[4];

    let step = h / nworkers;
    let rs = tag * step; 
    let re = (tag+1) * step; 

    mandelbrot(ia, rs, re, w, h);
    postMessage([ia]);
}
