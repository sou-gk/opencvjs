let canvas, pg, capture;
let cvFlag = false;

function setup() {
  canvas = createCanvas(560, 420);

  pg = createGraphics(width, height);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
}

function draw() {
  background(120);
  pg.image(capture, 0, 0, width, height);

  if (cvFlag) {
    let src = cv.imread(pg.elt);
    let dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
    cv.imshow(canvas.elt, dst);
    src.delete();
    dst.delete();
  }
}

window.addEventListener("load", (event) => {
  console.log("The page has fully loaded");

  let script = document.createElement("script");
  script.addEventListener("load", (event) => {
    console.log("opencv.js file has been loaded");
    cv["onRuntimeInitialized"] = () => {
      console.log("onRuntimeInitialized");
      cvFlag = true;
    };
  });

  script.src = "https://docs.opencv.org/4.7.0/opencv.js";
  document.body.appendChild(script);
});
