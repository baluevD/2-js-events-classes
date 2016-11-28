'use strict';

var input = document.getElementById('offset');
var figureToMove = document.getElementById('block');
var degrees = 0;

function Application() {
    this.start = function () {
        document.getElementById('start').addEventListener('click', startMoving);
    };
    this.stop = function () {
        document.getElementById('stop').addEventListener('click', callback);
    }
}

function startMoving() {
        checkOffset();
        document.body.addEventListener('keydown', checkKeycode);
}

function checkKeycode(event) {
    if (!event.shiftKey) {
        switch (event.code) {
            case 'ArrowUp':
                figureToMove.style.bottom = blockValue('bottom','+') + 'px';
                break;
            case 'ArrowRight':
                figureToMove.style.left = blockValue('left','+') + 'px';
                break;
            case 'ArrowDown':
                figureToMove.style.bottom = blockValue('bottom','-') + 'px';
                break;
            case 'ArrowLeft':
                figureToMove.style.left = blockValue('left','-') + 'px';
                break;
            default:
                break;
        }
    }
    else {
        switch (event.code) {
            case 'ArrowRight':
                degrees += 10;
                figureToMove.style.transform = 'rotate('+ degrees +'deg)';
                break;
            case 'ArrowLeft':
                degrees -= 10;
                figureToMove.style.transform = 'rotate('+ degrees + 'deg)';
                break;
            default:
                break;
        }
    }
}

function callback() {
    document.body.removeEventListener('keydown', checkKeycode);
}

function checkOffset() {
    if (input.value < 10)
        input.value = 10;
    if (input.value > 50)
        input.value = 50;
}

function blockValue(directionToMove,sign) {
    var offset = sign + input.value;
    var curPropValue = window.getComputedStyle(figureToMove, null).getPropertyValue(directionToMove);// + offset;
    curPropValue = curPropValue.substring(0, curPropValue.length - 2);
    var requiredValue = parseInt(offset) + parseInt(curPropValue);
    return requiredValue;
}

var app = new Application();
app.start();
app.stop();