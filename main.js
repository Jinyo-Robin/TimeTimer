// html references
let optionsButton = document.querySelector('#optionsButton');
let addClockButton = document.querySelector('#addClockButton');
let silenceButton = document.querySelector('#silenceButton');

let maxFps = 60;
let scaleMinutes = 60;
let newStarttime = 0;

function calc() {
    if (startTime <= Date.now()) {
        alert('Done!');
        return;
    }
    draw();
};

function draw(timer, time) {
    drawTime(timer, time);
};

function drawTimerdigits() {
    let canvas = timer.querySelector('.analogTimer');
    let ctx = canvas.getContext("2d");
}

function drawTime(timer, time) {
    let canvas = timer.querySelector('.analogTimer');
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2.5 + 1, 2*Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2.5, ((60-time)/60 -0.25) *2*Math.PI, 1.5*Math.PI);
    ctx.lineTo(canvas.width/2, canvas.height/2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/8, 2*Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center"; 
    ctx.fillText(Math.ceil(time), canvas.width/2, canvas.height/2);
}

document.addEventListener('mousedown', (event) => {
    if (event.target.className == 'analogTimer' && event.buttons == 1) {
        newStarttime = getTimeFromPosition(event.offsetX, event.offsetY, event.target.width, event.target.height, 60);
        this.debug.innerText = 'new start time: ' + newStarttime;
        draw(event.target.parentElement, newStarttime);
    }
}, false);

document.addEventListener('mousemove', (event) => {
    if (event.target.className == 'analogTimer' && event.buttons == 1) {
        newStarttime = getTimeFromPosition(event.offsetX, event.offsetY, event.target.width, event.target.height, 60);
        this.debug.innerText = 'new start time: ' + newStarttime;
        draw(event.target.parentElement, newStarttime);
    }
}, false);

document.addEventListener('mouseup', (event) => {
    if (event.target.className == 'analogTimer') {
        updateTime(event.target.parentElement, newStarttime);
        startTimer(event.target.parentElement);
    }
}, false);

function updateTime(timer, time) {
    timer.setAttribute('time', time);
}

function startTimer(timer) {
    console.log(timer.childElements);
    // timer.querySelector('.digitalTimer').innerText = Math.ceil(timer.getAttribute('time'));
    // let lastStart = Date.now();
    // calc();
}

function getTimeFromPosition(x, y, width, height, scale) {
    return (Math.atan2(x - width/2, y - height/2) * (180 / Math.PI) + 180) / (360 / scale);
}