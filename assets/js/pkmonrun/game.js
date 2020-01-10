var myGamePiece;
var myObstacles = [];
var myScore;
var myFondo;
var imgPikachu = [];
var imgFearow = [];
var imgMaractus = [];
var findeljuego = false;

function startGame() {
    imgPikachu[0] = cargarImagen("pika1.png");
    imgPikachu[1] = cargarImagen("pika2.png");
    myGamePiece = new component(50, 30, imgPikachu[0], 30, 15);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "", 280, 40, "text", "black");
    myFondo=cargarImagen("fondo.png");

    myGameArea.start();
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.context.drawImage(cargarImagen("fondo.png"), 0, 0);
        updateGameArea();
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(myFondo, 0, 0);
    }
}

function cargarImagen(nombre) {
    img = new Image();
    img.src = './assets/img/pkmonrun/' + nombre;
    return img;
}

function component(width, height, img, x, y, type, color) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.puedeSaltar = false;
    this.img = img;
    this.update = function () {

        ctx = myGameArea.context;
        
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if(this.type == "fondo"){
            ctx.drawImage(this.img, this.width, this.height);
        }
        else {
            ctx.drawImage(this.img, this.x, this.y);
            //ctx.fillStyle = "black";
            //ctx.fillRect(this.x+10, this.y+10, this.width-10, this.height-10);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.chocaSuelo();
        this.chocaMedioCielo();
    }
    this.chocaSuelo = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom - 5) {
            this.y = rockbottom - 15;
            this.gravitySpeed = 0;
            this.puedeSaltar = true;
        }
    }
    this.chocaMedioCielo = function () {
        var rockbottom = myGameArea.canvas.height / 2.5;
        if (this.y < rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.gravity = 0.1;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x + 10;
        var myright = this.x - 10 + (this.width);
        var mytop = this.y + 10;
        var mybottom = this.y + 10 + (this.height);
        var otherleft = otherobj.x + 10;
        var otherright = otherobj.x - 10 + (otherobj.width);
        var othertop = otherobj.y + 10;
        var otherbottom = otherobj.y - 10 + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        
        return crash;
    }
}

function updateGameArea() {
    $(window).scrollTop(0);
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            $("#boton").attr("disabled", false);
            findeljuego = true;
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(125)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height;
        if (Math.round(Math.random()) > 0.33) {
            myObstacles.push(new component(50, 65, cargarImagen("maractus.png"), 430, 200));
        } else {
            myObstacles.push(new component(50, 65, cargarImagen("fearow1.png"), 430, 150));
        }

    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -3;
        myObstacles[i].update();
    }


    myScore.text = "SCORE: " + myGameArea.frameNo;
    if (myGameArea.frameNo % 10 == 0) {
        if (myGamePiece.img == imgPikachu[0]) {
            myGamePiece.img = imgPikachu[1];
        } else {
            myGamePiece.img = imgPikachu[0];
        }

    }
    myScore.update();

    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}





$(document).keypress(function (e) {
    
    if (e.keyCode == 70 && myGamePiece.puedeSaltar === true) {
        myGamePiece.puedeSaltar = false;
        if (!myGameArea.interval) {
            myGameArea.interval = setInterval(updateGameArea, 20);
        }
        myGamePiece.gravity = -0.2;

    }
});

$(document).keyup(function (e) {
    if (e.keyCode == 70) {
        if (!myGameArea.interval) {
            myGameArea.interval = setInterval(updateGameArea, 20);
        }
        myGamePiece.gravity = 0.1;
        myGamePiece.puedeSaltar = false;
    }
});

$("#boton").click(function (e) {
    if (findeljuego) {
        myGamePiece = null;
        myObstacles = null;
        myObstacles = [];
        myFondo=null;
        myScore = null;
        imgPikachu = null;
        imgPikachu = [];
        findeljuego = false;
    }
    $("#boton").attr("disabled", true);
    if (!myGameArea.interval) {
        myGameArea.interval = setInterval(updateGameArea, 20);
    }
    startGame();
});