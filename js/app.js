var mstats = {
    "streak": 0,
    "wins": 0,
    "games": 0,
    "lastPlayed": "1/1/2000",
    "lastWon": "1/1/2000",
};

var seed = Math.round((new Date() - new Date(1999, 12, 8)) / (1000 * 60 * 60 * 24));
var goal = -1;
var operands = [];
var operations = [
    math.add,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.divide,
    math.mod,
    math.mod,
    math.mod,
    math.mod,
    math.mod,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.multiply,
    math.pow,
    math.pow,
    math.pow,
    math.pow,
    math.pow,
    math.subtract
]

window.onload = function () {


    var prevMstats = getCookie("mstats");
    if (prevMstats === "") {
        var e = '01/01/2025';
        document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
    } else {
        mstats = JSON.parse(prevMstats);
        var today = (new Date()).toLocaleDateString("en-US");
        if (mstats.lastPlayed != today) {
            mstats.games++;
        }
        mstats.lastPlayed = today;
        document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
    }

    document.getElementById('games').innerHTML = "Games played: " + mstats.games;
    document.getElementById('wins').innerHTML = "Wins: " + mstats.wins;
    document.getElementById('win-perc').innerHTML = "Win Percentage: " + mstats.wins / mstats.games * 100 + "%";
    document.getElementById('streak').innerHTML = "Streak: " + mstats.streak;


    while (operands.length < 4) {
        var r = Math.floor(random() * 10) + 1;
        if (operands.indexOf(r) === -1) operands.push(r);
    }

    var takes = 0;

    while (!math.isPositive(goal) || !math.isInteger(goal) || goal < 1 || goal > 100) {
        try {
            takes++;
            // choose 3 operations
            var op1index = Math.floor(random() * operations.length);
            var op2index = Math.floor(random() * operations.length);
            var op3index = Math.floor(random() * operations.length);
            // apply operations
            var resultAfter1 = operations[op1index](operands[0], operands[1])
            var resultAfter2 = operations[op2index](operands[2], resultAfter1)
            goal = operations[op3index](operands[3], resultAfter2)
        } catch (error) {
            continue;
        }
    }

    shuffleArray(operands);
    document.getElementById('num1').innerHTML = operands[0];
    document.getElementById('num2').innerHTML = operands[1];
    document.getElementById('num3').innerHTML = operands[2];
    document.getElementById('num4').innerHTML = operands[3]
    document.getElementById('goal').innerHTML = goal;
}

function check() {

    var inputStr = document.getElementById("math-input").value.trim();
    var numbersInAnswerStr = inputStr.match(/[0-9 , \.]+/g);
    var numbersInAnswer = [];

    if (!numbersInAnswerStr) {
        alert("No input");
        return;
    }

    for (var i = 0; i < 4; i++) {
        numbersInAnswer.push(parseInt(numbersInAnswerStr[i]));
    }

    // check length
    if (numbersInAnswer == null || numbersInAnswer.length != 4) {
        alert("Didn't use all numbers");
        return;
    }

    // validate all numbers are there

    if (!(numbersInAnswer.sort().join(',') === operands.sort().join(','))) {
        alert("Used invalid numbers");
        return;
    }

    var inputVal = math.evaluate(inputStr);

    if (parseInt(inputVal) == parseInt(document.getElementById('goal').innerHTML)) {

        alert("Correct!");

        var todayDate = new Date()
        var today = todayDate.toLocaleDateString("en-US");
        var yesterdayDate = new Date();
        yesterdayDate.setDate(todayDate.getDate() - 1);
        var yesterday = yesterdayDate.toLocaleDateString("en-US");

        if (mstats.lastWon == yesterday) {
            mstats.streak++;
        } else {
            mstats.streak = 1;
        }

        if (today !== mstats.lastWon) {
            mstats.lastWon = today;
            mstats.wins++;
        }

    } else {
        alert(inputVal + " is not equal to " + document.getElementById('goal').innerHTML);
    }
    document.cookie = 'mstats=' + JSON.stringify(mstats) + ';AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax';
    document.getElementById('games').innerHTML = "Games played: " + mstats.games;
    document.getElementById('wins').innerHTML = "Wins: " + mstats.wins;
    document.getElementById('win-perc').innerHTML = "Win Percentage: " + mstats.wins / mstats.games * 100 + "%";
    document.getElementById('streak').innerHTML = "Streak: " + mstats.streak;
}


// HELPERS 


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function timeStart() {
    const watch = document.getElementById("timer");
    let millisecound = 0;
    let timer;
    timer = setInterval(() => {
        millisecound += 1000;
        let dateTimer = new Date(millisecound);
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2)
    }, 1000);
}

function toggleInfo() {
    if (document.getElementById("info-full").style.display === "block") {
        document.getElementById("info-full").style.display = "none";
    } else {
        document.getElementById("info-full").style.display = "block";
    }
}

function share() {
    const shareData = {
        title: 'MATHLE',
        text: 'math and stuff',
        url: 'https://briansayre.com/mathle/'
    }
    navigator.share(shareData)
}