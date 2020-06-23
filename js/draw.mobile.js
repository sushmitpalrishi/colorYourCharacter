var canvas;
var context;
var canvasWidth, width;
var canvasHeight, height;
var eraserBackgroundImage = new Image();
var crayonTextureImage = new Image();

var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = "#cb3594";
var curTool = "crayon";
var curSize = "huge";
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;
var mediumImageHeight = 46;
var drawingAreaX = 0;
var drawingAreaY = 0;
var drawingAreaWidth = 640;
var drawingAreaHeight = 905;
var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = 39;
sizeHotspotWidthObject.large = 25;
sizeHotspotWidthObject.normal = 18;
sizeHotspotWidthObject.small = 16;
var totalLoadResources = 8;
var curLoadResNum = 0;

var buffer, drawingCanvas;
var image1, image2;
var skeches = new Array();

/**
 * Calls the redraw function after all neccessary resources are loaded.
 */
/**
 * Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
 */
function prepareCanvas() {
  $(".tool").on("click", function () {
    $(this).toggleClass("open");
  });
  $(".curSize").click(function () {
    curSize = $(this).attr("data-value");
    console.log($(this).attr("data-value"));
  });
  $(".curColor").click(function () {
    var color = $(this).attr("value");
    curColor = color;
    $(".curSize").css("background", color);
  });

  eraserBackgroundImage.src = "images/erase.png";
  skeches = [
    { src: "images/bgpng.png", width: 320, height: 452 },
    { src: "images/bgpng.png", width: 320, height: 452 },
    { src: "images/bgpng.png", width: 320, height: 452 },
  ];
  index = Math.round(2 * Math.random());

  crayonTextureImage.src = skeches[index].src;
  canvasWidth = width = skeches[index].width;
  canvasHeight = height = skeches[index].height;
  var canvasDiv = document.getElementById("canvasDiv");
  canvas = document.createElement("canvas");
  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);
  canvas.setAttribute("id", "canvas");
  canvasDiv.appendChild(canvas);
  if (typeof G_vmlCanvasManager != "undefined") {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  context = canvas.getContext("2d");
  context.beginPath();
  context.rect(0, 0, width, height);
  context.closePath();
  context.fillStyle = "white";
  context.fill();
  image1 = context.getImageData(0, 0, width, height);

  // Add mouse events
  // ----------------
  $("#canvas").on("touchstart", function (e) {
    console.log(e);
    // Mouse down location
    var mouseX = e.originalEvent.touches[0].pageX - this.offsetLeft;
    var mouseY = e.originalEvent.touches[0].pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY, false);
    redraw();
  });

  $("#canvas").on("touchmove", function (e) {
    if (paint == true) {
      addClick(
        e.originalEvent.touches[0].pageX - this.offsetLeft,
        e.originalEvent.touches[0].pageY - this.offsetTop,
        true
      );
      redraw();
    }
  });
  $("#canvas").on("touchend", function (e) {
    paint = false;
    var pixels = 4 * width * height;
    image2 = context.getImageData(0, 0, width, height);
    var imageData1 = image1.data;
    var imageData2 = image2.data;
    mul1 = 0.5;
    mul2 = 0.5;
    //  console.log(imageData1[pixels]+" "+ imageData2[pixels])
    //  console.log(imageData1[pixels-1]+" "+ imageData2[pixels-1])
    //  console.log(imageData1[pixels-2]+" "+ imageData2[pixels-2])
    //  console.log(imageData1[pixels-3]+" "+ imageData2[pixels-3])
    // while (pixels--) {

    if (imageData1[pixels] != imageData2[pixels]) {
      //} && imageData1[pixels]!=255 &&  imageData2[pixels]!=255){
      imageData1[pixels] =
        mul1 * imageData1[pixels] + mul2 * imageData2[pixels]; // red
    }
    //imageData1[pixels] = mul1*imageData1[pixels+1] + mul2*imageData2[pixels+1]; // green
    //imageData1[pixels] = mul1*imageData1[pixels+2] + mul2*imageData2[pixels+2]; // red // blue

    // imageData1[pixels] = imageData1[pixels] * 0.1 + imageData2[pixels] * 1;
    //}
    image1.data = imageData1;
    context.putImageData(image1, 0, 0);
    redraw();
  });

  $("#canvas").on("mouseleave", function (e) {
    paint = false;
  });
}

/**
 * Adds a point to the drawing array.
 * @param x
 * @param y
 * @param dragging
 */
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickTool.push(curTool);
  clickColor.push(curColor);
  clickSize.push(curSize);
  clickDrag.push(dragging);
}

/**
 * Clears the canvas.
 */
function clearCanvas() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}
function saveShare() {
  var dataURL = canvas.toDataURL();
  $.ajax(
    {
      type: "POST",
      url: "saveimage.php",
      data: { imgBase64: dataURL },
    }.done(function (response) {
      //returns false or file name
      if (response != "false") {
        console.log("saved");
        var loc = window.location.origin + window.location.pathname;
        var href = loc + "?id=" + response;
        FB.ui({
          method: "share",
          href: "https://developers.facebook.com/docs/",
        });
      } else {
        console.log("not working!");
      }
      // If you want the file to be visible in the browser
      // - please modify the callback in javascript. All you
      // need is to return the url to the file, you just saved
      // and than put the image in your browser.
    })
  );
}

/**
 * Redraws the canvas.
 */
function redraw() {
  // Make sure required resources are loaded before redrawing

  clearCanvas();

  var locX;
  var locY;

  locX = 0;
  locY = 0;
  context.beginPath();
  context.rect(locX, locY, 2, 12);
  context.closePath();
  context.fillStyle = curColor;
  context.fill();
  context.fillStyle = eraserBackgroundImage;
  context.fill();

  // Keep the drawing in the drawing area
  context.save();
  context.beginPath();
  context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
  context.clip();

  var radius;
  var i = 0;
  for (; i < clickX.length; i++) {
    if (clickSize[i] == "small") {
      radius = 2;
    } else if (clickSize[i] == "normal") {
      radius = 5;
    } else if (clickSize[i] == "large") {
      radius = 10;
    } else if (clickSize[i] == "huge") {
      radius = 20;
    } else {
      alert("Error: Radius is zero for click " + i);
      radius = 0;
    }
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i], clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    // Initaliase a 2-dimensional drawing context

    if (clickTool[i] == "eraser") {
      //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
      context.strokeStyle = "white";
    } else {
      //context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
      context.strokeStyle = clickColor[i];
    }
    context.lineJoin = "round";
    context.lineWidth = radius;
    context.stroke();
  }
  //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
  context.restore();

  // Overlay a crayon texture (if the current tool is crayon)
  if (curTool == "crayon") {
    //	context.globalAlpha = 0.4; // No IE support
    context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
  }
  context.globalAlpha = 1; // No IE support

  // Draw the outline image
  //	context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}

/**/
