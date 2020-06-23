var canvas;
var context;
var canvasWidth, cwid;
var canvasHeight, chei;
var padding = 25;
var lineWidth = 8;
var bcanvas, bcontext;
var outlineImage = new Image();
var crayonImage = new Image();
var markerImage = new Image();
var eraserImage = new Image();
var crayonBackgroundImage = new Image();
var markerBackgroundImage = new Image();
var eraserBackgroundImage = new Image();
var charpng = new Image();
charpng.src = "images/character.png";
var skechImage = new Image();
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = "#FFF";
var curTool = "crayon";
var curSize = 30;
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;
var mediumImageHeight = 46;
var drawingAreaX = 0;
var drawingAreaY = 0;

var totalLoadResources = 8;
var curLoadResNum = 0;
var buffer, drawingCanvas;
var image1, image2;
var mobile = 0;
var contextx = 0,
  contexty = 0;
var pattern;
//var skeches = new Array();

var skeches = [
  {
    src: "images/character.png",
    width: 500,
    height: 636,
    colors: ["#ffecce", "#475272", "#fd84b0"],
  },
  {
    src: "images/character2.png",
    width: 500,
    height: 636,
    colors: ["#80F1FF", "#73E574", "#EFC90B"],
  },
  {
    src: "images/character3.png",
    width: 500,
    height: 636,
    colors: ["#70DADA", "#ABDF2F", "#F24EB2"],
  },
];
var logoImage = new Image();
//logoImage.src = 'images/whats.png';
crayonBackgroundImage.src = "images/crayon-texture.png";

var shref = "";
var winRatio = 1056 / 787; //width/height
//var winRatio=500/373;//width/height
// var maxWid = 1056;
// var maxHei = 787;
var maxWid = 1056;
var maxHei = 787;
var winWid, winHeight;
var index;
var switchImg;

/**
 * Calls the redraw function after all neccessary resources are loaded.
 */
/**
 * Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
 */

function prepareCanvas() {
  /*$('.curSize').click(function(){
		curSize = $(this).attr('data-value');
		$('.brushWrapper .active').removeClass('active');
		$(this).addClass('active');
		$('.toolbox').removeClass('open');
		clearCanvas();

	});*/

  if (mobile) {
    $(".colors").click(function () {
      $(".colorbox").toggleClass("open");
    });
    $(".brushes").click(function () {
      $(".brushbox").toggleClass("open");
    });
  }

  $(".curColor").colorPicker({
    renderCallback: function ($elm, toggled) {
      curColor = $elm.text == "" ? curColor : $elm.text;
      $(".curtool").css("background", curColor);
    },
  });

  $(".curEraser").click(function () {
    $(".colorWrapper .active").removeClass("active");
    // var color= $(this).addClass('active').attr('value');
    // curColor = color;
    $(".toolbox").removeClass("open");
    //clearCanvas();
  });

  $(".curtool").click(function () {
    curTool = $(this).data("tool");
    $(".curtool.active").removeClass("active");
    $(this).addClass("active");
    //curColor = color;
    clearCanvas();
  });

  index = Math.round(2 * Math.random());
  skechImage.src = skeches[index].src;
  skechImage.onload = function () {
    /*
		for(i=0;i<skeches[index].colors.length;i++)
		{
			var col =skeches[index].colors[i];
			var div='<div><button class="curColor color" value="'+col+'" style="background:'+col+';"></button></div>';
			$('.colorWrapper').prepend(div);
		}*/
    skechImage.onload = function () {};
    curColor = $(".curColor.active").attr("value");
    $(".colors,.mouseBrush").css("background", curColor);

    function winResize() {
      winWid = $(window).width();
      winHeight = $(window).height();
      //console.log(winHeight*winRatio);

      if (winWid > winHeight * winRatio) {
        //win height is greater
        cwid = winHeight * winRatio;
        chei = winHeight;
      } else {
        cwid = winWid;
        chei = winWid / winRatio;
      }
      canvasWidth = $(".cl_ch_lh").width();
      canvasHeight = (canvasWidth * 787) / 1056;

      canvas.setAttribute("width", canvasWidth);
      canvas.setAttribute("height", canvasHeight);

      bcanvas.setAttribute("width", canvasWidth);
      bcanvas.setAttribute("height", canvasHeight);

      drawingAreaWidth = cwid;
      drawingAreaHeight = chei;

      context.beginPath();
      context.rect(0, 0, cwid, chei);
      context.closePath();
      context.fillStyle = "white";
      context.fill();
      redraw();
      //context.drawImage(skechImage, 0, 0, canvasWidth, canvasHeight);
    }

    window.onresize = winResize;
    function ano() {
      setTimeout(function () {
        $("body").removeClass("nooverflow");
        $(".toolbox").addClass("show");
      }, 2000);

      var canvasDiv = document.getElementById("canvasDiv");
      canvas = document.createElement("canvas");
      bcanvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      winResize();
      canvas.setAttribute("id", "canvas");
      canvasDiv.appendChild(canvas);
      bcontext = bcanvas.getContext("2d");
      bcontext.drawImage(canvas, 0, 0);
      if (typeof G_vmlCanvasManager != "undefined") {
        canvas = G_vmlCanvasManager.initElement(canvas);
      }

      context = canvas.getContext("2d");
      context.beginPath();
      context.rect(0, 0, cwid, chei);
      context.closePath();
      context.fillStyle = "white";
      context.fill();
      //logoLeft =canvasWidth/4;
      //logoTop = 410*(logoLeft)/640;
      //context.drawImage(logoImage, 0, 0,640,410,logoLeft,canvasHeight/2-logoTop,2*logoLeft, 2*logoTop);
    }
    ano();

    $("#canvas").mousedown(function (e) {
      // Mouse down location
      var mouseX = e.pageX - $(this).offset().left;
      var mouseY = e.pageY - $(this).offset().top;

      paint = true;
      addClick(mouseX, mouseY, false);
      redraw();
    });

    $("#canvas").mousemove(function (e) {
      //console.log(this.offsetLeft);
      if (paint == true) {
        addClick(
          e.pageX - $(this).offset().left,
          e.pageY - $(this).offset().top,
          true
        );
        redraw();
      }
      contextx = e.pageX - $(this).offset().left;
      contexty = e.pageY - $(this).offset().top;
      // context.beginPath();
      // context.fillStyle= curColor;
      // context.strokeStyle =curColor;
      // context.arc(contextx+curSize/2,contexty+curSize/2,curSize/2,0,2*Math.PI);

      // context.stroke();
      // context.fill();
      // context.closePath();
    });

    $("#canvas").mouseup(function (e) {
      paint = false;
      redraw();
    });
    $("#canvas").on("touchstart", function (e) {
      // Mouse down location
      var mouseX = e.originalEvent.touches[0].pageX - $(this).offset().left;
      var mouseY = e.originalEvent.touches[0].pageY - $(this).offset().top;
      paint = true;
      addClick(mouseX, mouseY, false);
      redraw();
    });

    $("#canvas").on("touchmove", function (e) {
      if (paint == true) {
        addClick(
          e.originalEvent.touches[0].pageX - $(this).offset().left,
          e.originalEvent.touches[0].pageY - $(this).offset().top,
          true
        );
        redraw();
      }
    });
    $("#canvas").on("touchend", function (e) {
      paint = false;
      redraw();
    });

    $("#canvas").on("mouseleave", function (e) {
      paint = false;
    });
  };
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
  bcontext.drawImage(canvas, 0, 0);
  clickX = new Array();
  clickY = new Array();
  clickTool = new Array();
  clickColor = new Array();
  clickSize = new Array();
  clickDrag = new Array();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(bcanvas, 0, 0);
  redraw();
  switchImg = 0;
}
function switchImage() {
  switchImg = 1;
  index = index == skeches.length - 1 ? 0 : index + 1;
  clearCanvas();
  context.drawImage(
    logoImage,
    0,
    0,
    640,
    410,
    logoLeft,
    canvasHeight / 2 - logoTop,
    2 * logoLeft,
    2 * logoTop
  );
  skechImage.src = skeches[index].src;
  skechImage.onload = function () {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(skechImage, 0, 0, 1056, 787);
    skechImage.onload = function () {};
  };
}
function saveShare() {
  bcontext.drawImage(canvas, 0, 0);
  //bcontext.drawImage(logoImage,0,0,300,202,17,canvasHeight-50, 50,33);
  var dataURL = bcanvas.toDataURL();

  $.ajax({
    type: "POST",
    url: "saveimage.php",
    data: {
      imgBase64: dataURL,
    },
  }).done(function (response) {
    //returns false or file name
    if (response != "false") {
      var loc = window.location.origin + window.location.pathname;
      shref = loc + "?id=" + response;

      $(".overlay").fadeIn(500).find("img#userimg").attr("src", dataURL);
      $(".share").show();
      $(".share.twt").attr("data-href", shref);
      alert("Image saved");
    } else {
      console.log("not working");
    }
  });
}
function fbshare() {
  FB.ui({
    method: "share",
    href: shref,
  });
}
function twtshare() {}

function closeOverlay() {
  $(".overlay").fadeOut(400);
  $(".createnew").fadeOut(400);
}
function openinst() {
  $(".overlay").fadeIn(400);
}
function redraw() {
  //getBCanvas();

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawBcanvas(context);
  var locX = 0;
  var locY = 0;

  //context.rect(locX, locY, 2, 12);

  context.fillStyle = curColor;

  //	context.fillStyle = eraserBackgroundImage;
  //	context.fill();

  // Keep the drawing in the drawing area
  context.save();
  context.beginPath();
  context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
  //clipcontent(context);
  //context.clip();

  var radius;
  var i = 0;
  for (; i < clickX.length; i++) {
    radius = clickSize[i];

    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i], clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();

    if (clickTool[i] == "eraser") {
      curTool = "eraser";
      //	context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
      context.strokeStyle = "white";
    } else {
      //	context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
      context.strokeStyle = clickColor[i];
      //context.fillStyle =  clickColor[i];
    }
    context.lineJoin = "round";
    context.lineWidth = radius;
    context.stroke();

    if (clickTool[i] == "crayon") {
      curTool = "crayon";

      //context.fill();
      //	context.clip();
      //context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);
      //console.log(clickTool[i]);
    }
  }

  //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
  context.restore();
  //context.strokeStyle = curColor;
  if (curTool == "crayon") {
    //context.globalAlpha = 0.4; // No IE support
    context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);
  }

  context.drawImage(charpng, 0, 0, canvasWidth, canvasHeight);
}

function drawBcanvas(ctx) {
  ctx.drawImage(bcanvas, 0, 0);
}
function getBCanvas(ctx) {
  bcontext.drawImage(canvas, 0, 0);
}

//context.globalAlpha = 1;

window.onload = function () {
  document.getElementById("strokesize").onchange = function () {
    curSize = this.value;
    console.log(curSize);

    $(".pop-submit_artwork").click(function () {
      saveShare();
    });
  };

  /*
document.getElementById('strokealpha').onchange=function(){
	console.log(this.value);
	context.globalAlpha=this.value;
}*/
};

function clipcontent(ctx) {
  //drawcharacter(ctx);
  //ctx.clip();
}

function showImage() {
  paint = true;
  $("#canvas").dispatchEvent(new Event("mousedown"));

  setTimeout(function () {
    $("#canvas").dispatchEvent(new Event("mouseup"));
    paint = false;
  }, 500);
}
