/**
 * Class handling the process of creation of Timer
 */
class CountDownTimer {
    /**
     * @param {Number} seconds
     * @param {HTMLElement} finalTimeDiv is used to display finaltime(Time when timer is finshed)
     * @param {HTMLElement} timerDiv is used to show remaining time before timer gets finshied
     */
    constructor(seconds, finalTimeDiv, timerDiv) {
        this.finalTime = new Date();
        this.finalTime.setSeconds(this.finalTime.getSeconds() + Number(seconds))
        setElementText(finalTimeDiv, "Will be back at "
            + getDateString(this.finalTime) + " "
            + getTimeString(this.finalTime));
        this.start(seconds,timerDiv);
    }


    /**
     * Start the countdowntimer
     */
    start(seconds,timerDiv) {
        // clearing interval if any present
        clearInterval(CountDownTimer.timerInstance);
        displayTime(seconds, timerDiv);

        //setting new Interval that executes every second
        CountDownTimer.timerInstance = setInterval(function () {
            displayTime(--seconds, timerDiv);
        }, 1000)

        //clearing interval after completing total seconds
        setTimeout(clearInterval, seconds * 1000, CountDownTimer.timerInstance)
    }
}

//returns formatted Date string
function getDateString(time) {
    return `${time.getDate()} / ${time.getMonth()} / ${time.getFullYear()} `
}

//returns formatted time string
function getTimeString(time) {
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}

//function that displays remaining time
function displayTime(seconds, timerDiv) {

    let d = new Date(0, 0, 0, 0, 0, seconds);
   
    //Calculating days from seconds
    let days = parseInt(seconds / (60 * 60 * 24))

    if (days > 0)
        setElementText(timerDiv, `${days}d ${getTimeString(d)}`);
    else
        setElementText(timerDiv, getTimeString(d));
}

function createTimer(seconds, finalTimeDiv, timerDiv) {
    let timer = new CountDownTimer(seconds, finalTimeDiv, timerDiv);
}
//returns HTMLElement having given ID
function getElementById(id) {
    return document.getElementById(id);
}

//function that set the given text to given HTML element
function setElementText(element, text) {
    element.innerText = text;
}

window.onload = function () {

    let buttons = document.getElementsByClassName("timer__button");
    let finalTimeDiv = getElementById("finalTime");
    let timerDiv = getElementById("remainingTime");

    //setting click listeners to buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            createTimer(buttons[i].dataset.time, finalTimeDiv, timerDiv);
        })
    }
    
    //setting Onchange listener to form input
    let form = document.getElementById("custom");
    let inputMinutes = form.elements['minutes'];

    inputMinutes.addEventListener('change', function () {

        let seconds = this.value * 60;
        if (!isNaN(Number(seconds)))
            createTimer(seconds, finalTimeDiv, timerDiv);
        else alert("Enter minutes in numbers only")
    })
}