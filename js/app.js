var operands = [];
var goal = -1;
var operations = [
    math.add,
    math.divide,
    math.mod,
    math.multiply,
    math.pow,
    math.subtract
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
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

window.onload = function () {

    //timeStart();

    var operations = [
        math.add,
        math.divide,
        math.mod,
        math.multiply,
        math.pow,
        math.subtract
    ]

    while (operands.length < 4) {
        var r = Math.floor(Math.random() * 10) + 1;
        if (operands.indexOf(r) === -1) operands.push(r);
    }

    var takes = 0;

    while (!math.isPositive(goal) || !math.isInteger(goal) || goal < 1 || goal > 100) {
        try {
            takes++;
            // choose 3 operations
            var op1index = Math.floor(Math.random() * operations.length);
            var op2index = Math.floor(Math.random() * operations.length);
            var op3index = Math.floor(Math.random() * operations.length);
            // apply operations
            var resultAfter1 = operations[op1index](operands[0], operands[1])
            var resultAfter2 = operations[op2index](operands[2], resultAfter1)
            goal = operations[op3index](operands[3], resultAfter2)
        } catch (error) {
            continue;
        }
    }

    console.log(takes);
    shuffleArray(operands);
    document.getElementById('num1').innerHTML = operands[0];
    document.getElementById('num2').innerHTML = operands[1];
    document.getElementById('num3').innerHTML = operands[2];
    document.getElementById('num4').innerHTML = operands[3]
    document.getElementById('goal').innerHTML = goal;
    console.log(operands)
}

function check() {
    var inputStr = document.getElementById("math-input").value;
    var numbersInAnswer = inputStr.match(/[0-9 , \.]+/g);

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
    } else {
        alert(inputVal + " is not equal to " + document.getElementById('goal').innerHTML);
    }

}
