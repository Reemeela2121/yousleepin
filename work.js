
// events

document.addEventListener('keydown', function(event) {
if (event.code == 32 || event.key == " ") {
        checkPlayer()
}
});


// functions

function randomInt(a, b){
return Math.floor(a+(b-a)*Math.random())
}

function drawRect(x, y) {
ctx.drawImage(img,x,y, imgx, imgy)
    visible = true
}

function clearRect(x, y) {
ctx.clearRect(x,y,imgx, imgy)
    visible = false
}


function c1() {
// check if the game ended
    date = new Date()
    t = date.getTime()
    if (t < tEnd){
    // continue game
        x = randomInt(0, width-imgx)
        y = randomInt(0, height-imgx)
        drawRect(x, y)
        setTimeout(checkMiss, tTooSlow)
        }
    else {
    // wait for the last or quit
        }
    }

function checkMiss() {
tOld = t
    date = new Date()
    t = date.getTime()
    if (visible && (t-tOld > tTooSlow-1)) {
    reactionTime.push(-2)
        clearRect(x,y)
        document.getElementById("c1").innerHTML = reactionTime.toString()
        setTimeout(c1, randomInt(tMin, tMax))
    }
}

function checkPlayer() {
if (visible) {
    tOld = t
        date = new Date()
        t = date.getTime()
        reactionTime.push(t-tOld)
        clearRect(x,y)
        document.getElementById("c1").innerHTML = reactionTime.toString()
        setTimeout(c1, randomInt(tMin, tMax))
    }
else {
    reactionTime.push(-1)
        document.getElementById("c1").innerHTML = reactionTime.toString()
        }
    }



function startGame() {
// Set the current time end the end time
date = new Date()
    t = date.getTime()
    tEnd = tEnd + t
    setTimeout(c1, randomInt(tMin, tMax))
    }

// any kind of extension (.txt,.cpp,.cs,.bat)


// variables

// canvas
var c = document.getElementById("gameCanvas")
var width = c.width
var height = c.height
var ctx = c.getContext("2d")

// time
var date = new Date()
var t = date.getTime()
var tOld = t
var tMin = 500
var tMax = 1500
var tTooSlow = 2000
var tEnd = 20000


// image
var img = document.getElementById("emoji");
var x = 0
var y = 0
var imgx = 100
var imgy = 100
var visible = false
// data -1 for pressing when there is no space, -2 for missing one
var reactionTime = []

// draw a rect
//drawRect(x, y)
startGame()

document.getElementById("demo").innerHTML = t
