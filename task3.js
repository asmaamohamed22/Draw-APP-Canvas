var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}


function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}


var drawh;
function drawHLine() {
    // onmousemove=(e)=>{
    //     context.beginPath();
    //     context.arc(e.pageX -  canvas.getBoundingClientRect().left ,e.pageY- canvas.getBoundingClientRect().top,10,0,2*Math.PI)
    //     context.fill()
    // }


canvas.addEventListener("mousedown",function () {
    drawh = true;
  });
canvas.addEventListener("mouseup", function () {
    drawh = false;
  });

canvas.addEventListener("mousemove", function (e) {
   
            context.beginPath()
            context.arc(e.pageX -  canvas.getBoundingClientRect().left ,e.pageY- canvas.getBoundingClientRect().top,4,0,2*Math.PI)
            context.stroke();
            context.fill();
      
  });



}
function drawRectangle(position) {
    context.beginPath();
    context.rect(position.x, position.y , dragStartLocation.x - position.x, dragStartLocation.y - position.y);
   
}
function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}

function draw(position) {

    var fillBox = document.getElementById("fillBox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
        lineCap = document.querySelector('input[type="radio"][name="lineCap"]:checked').value;

    context.lineCap = lineCap;

    if (shape === "circle") {
        drawCircle(position);
    }
    if (shape === "line") {
        drawLine(position);
    }
    if (shape === "hline") {
        drawHLine();
    }
    if (shape === "rect") {
        drawRectangle(position);
    }
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position);
}

function changeLineWidth() {
    context.lineWidth = this.value;
    e.stopPropagation();
}

function changeFillStyle() {
    context.fillStyle = this.value;
    e.stopPropagation();
}

function changeStrokeStyle() {
    context.strokeStyle = this.value;
    e.stopPropagation();
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    var lineWidth = document.getElementById("lineWidth"),
        fillColor = document.getElementById("fillColor"),
        strokeColor = document.getElementById("strokeColor");

    context.strokeStyle = strokeColor.value;
    context.fillStyle = fillColor.value;
    context.lineWidth = lineWidth.value;


    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    lineWidth.addEventListener("input", changeLineWidth, false);
    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);


  var clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });


  var saveButton = document.getElementById('save');
  saveButton.addEventListener('click', function() {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  });
};

window.addEventListener('load', init, false);


