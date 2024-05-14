const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
const total = document.getElementById('total');
const calcBtn = document.getElementById('calc-btn');
const breakTime = document.getElementById('break-time');
const resetBtn = document.getElementById('reset');
const totalFloat = document.getElementById('total-float');
const timeList = document.getElementById('time-list');

let timesArray = [];

// Default values are set to
// 9:00 AM for start
// 5:00 PM for end
// 60 minutes for break duration
startTime.defaultValue = "09:00";
endTime.defaultValue = "17:00";
breakTime.defaultValue = 60;

/*********** Breakdown
1) User inputs start time, end time, and the break duration
2) Calculate time between start time and end time
3) Subtract the amount of time for break
4) Add that time to timesArray
5) Display all times in timesArray
6) Calculate total time, and display as HH:MM, and a float for time
7) User can hit reset to reset totalTime and timesArray

***********/

/*********** Functions needed
    reset - completed
    calculate time - completed
    calculate total time - completed
    convert to proper format - completed
    display list properly - completed
 
***********/

function main() {

    const time = calculateTime();

    timesArray.push(time);

    displayList();

    total.textContent = `Total Time (HH:MM): ${formatTimeHHMM(calculateTotalHHMM())}`;
    totalFloat.textContent = `Total Time (Decimal): ${calculateTotal().toFixed(2)}`;
}

function calculateTime() {

    const startTimeValue = startTime.value;
    const endTimeValue = endTime.value;

    const startTimeArray = startTimeValue.split(":");
    const endTimeArray = endTimeValue.split(":");

    let difference = [];

    difference[0] = endTimeArray[0] - startTimeArray[0];
    difference[1] = endTimeArray[1] - startTimeArray[1] - breakTime.value;

    while (difference[1] < 0) {
        difference[0] -= 1;
        difference[1] = 60 + difference[1];
    }

    return difference;
}

function calculateTotal() {
    let totalTime = 0;

    for (let i = 0; i < timesArray.length; i++) {
        totalTime += parseFloat(formatTimeFloat(timesArray[i]));
    }

    return totalTime;
}

function calculateTotalHHMM() {
    let totalTime = [0, 0];

    for (let i = 0; i < timesArray.length; i++) {
        totalTime[0] += timesArray[i][0];
        totalTime[1] += timesArray[i][1];

        while (totalTime[1] >= 60) {
            totalTime[0]++;
            totalTime[1] -= 60
        }
    }

    return totalTime;
}

function displayList() {
    while (timeList.firstChild) {
        timeList.removeChild(timeList.firstChild);
    }

    for (let i = 0; i < timesArray.length; i++) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(`Time ${i + 1}: ${formatTimeHHMM(timesArray[i])} / ${formatTimeFloat(timesArray[i])}`));

        timeList.appendChild(li);
    }
}

/************************** Format functions section - start **************************/

function formatTimeHHMM(timeObject) {
    const hours = timeObject[0];
    const minutes = timeObject[1];

    if (minutes < 9) {
        return `${hours}:0${minutes}`;
    }
    else {
        return `${hours}:${minutes}`;
    }
}

function formatTimeFloat(timeObject) {
    const hours = timeObject[0];
    const minutes = timeObject[1];
    const total = hours + (minutes / 60);

    return total.toFixed(2);
}

/************************** Format functions section - end **************************/

// reset timesArray, total displays, time list
function reset() {
    timesArray = [];

    total.textContent = ``;
    totalFloat.textContent = ``;

    while (timeList.firstChild) {
        timeList.removeChild(timeList.firstChild);
    }
}

calcBtn.addEventListener('click', main);
resetBtn.addEventListener('click', reset);