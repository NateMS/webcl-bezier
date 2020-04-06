window.onload = function() {
    let btnContainer = document.getElementById("navigation");
    var btns = btnContainer.getElementsByClassName("framelink");

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            document.querySelector("#iframe").src = this.dataset.src
        });
    }

    let transitions = [{
            id: "canvas-linear",
            cp1: {
                x: 0,
                y: 1
            },
            cp2: {
                x: 1,
                y: 0
            },
        },
        {
            id: "canvas-ease",
            cp1: {
                x: 0.25,
                y: 0.9
            },
            cp2: {
                x: 0.25,
                y: 0
            },
        },
        {
            id: "canvas-ease-in",
            cp1: {
                x: 0.42,
                y: 1
            },
            cp2: {
                x: 1,
                y: 0
            },
        },
        {
            id: "canvas-ease-in-out",
            cp1: {
                x: 0.42,
                y: 1
            },
            cp2: {
                x: 0.58,
                y: 0
            },
        },
        {
            id: "canvas-ease-out",
            cp1: {
                x: 0,
                y: 1
            },
            cp2: {
                x: 0.58,
                y: 0
            },
        },
        {
            id: "canvas-custom",
            cp1: {
                x: 0.5,
                y: 0.7
            },
            cp2: {
                x: 0.7,
                y: -0.3
            },
        }
    ];

    transitions.forEach(transition => {
        showTransitionGraph(transition.id, transition.cp1, transition.cp2);
    });

    var c = document.getElementById("quadraticCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.quadraticCurveTo(20, 100, 200, 20);
    ctx.stroke();

    var c = document.getElementById("cubicCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
    ctx.stroke();
}

function showTransitionGraph(canvasId, cp1, cp2) {
    let factor = 200;
    let xOffset = 65;
    let yOffset = 65;
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d"),
        width = canvas.width = factor + (xOffset * 2),
        height = canvas.height = factor + (yOffset * 2),
        p0 = {
            x: 0 * factor + xOffset,
            y: 1 * factor + yOffset
        },
        p1 = {
            x: cp1.x * factor + xOffset,
            y: cp1.y * factor + yOffset
        },
        p2 = {
            x: cp2.x * factor + xOffset,
            y: cp2.y * factor + yOffset
        },
        p3 = {
            x: 1 * factor + xOffset,
            y: 0 * factor + yOffset
        },
        pA = {},
        pB = {},
        pC = {},
        pM = {},
        pN = {},
        pFinal = {},
        t = 1,
        maxT = 0,
        dir = 0.01,
        animating = true;;

    context.scale(1, 1);
    draw();

    function draw() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.fillStyle = "blue";
        context.beginPath();
        context.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(p2.x, p2.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.fillStyle = "black";
        context.beginPath();
        context.arc(p3.x, p3.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(0 * factor + xOffset, 1 * factor + yOffset);
        context.lineTo(1 * factor + xOffset, 1 * factor + yOffset);
        context.stroke();

        context.beginPath();
        context.moveTo(0 * factor + xOffset, 1 * factor + yOffset);
        context.lineTo(0 * factor + xOffset, 0 * factor + yOffset);
        context.stroke();


        // X Achse
        context.font = "20px Arial";
        context.textAlign = 'center';
        context.fillText("Zeitverhältnis", factor / 2 + xOffset, factor + yOffset + yOffset - 15);
        context.font = "18px Arial";
        context.fillText("0", xOffset, factor + yOffset + (yOffset / 3) + 3);

        context.fillText("0.5", factor / 2 + xOffset, factor + yOffset + (yOffset / 3) + 3);
        context.fillText("|", factor / 2 + xOffset, factor + yOffset + 6);

        context.fillText("1", factor + xOffset, factor + yOffset + (yOffset / 3) + 3);
        context.fillText("|", factor + xOffset, factor + yOffset + 6);

        // Y Achse
        context.font = "18px Arial";
        context.textAlign = 'right';
        context.fillText("0", xOffset - 12, factor + yOffset + 8);
        context.fillText("0.5", xOffset - 12, factor / 2 + yOffset + 8);
        context.fillText("1", xOffset - 12, yOffset + 8);
        context.save();
        context.translate(xOffset + 5, yOffset);
        context.rotate(-Math.PI / 2);
        context.textAlign = 'center';
        context.fillText('|', 0, 0);
        context.fillText('|', factor / 2 * -1, 0);
        context.font = "20px Arial";
        context.fillText("Ausgabeverhältnis", factor / 2 * -1, -50);
        context.restore();

        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(p0.x, p0.y);

        for (t = 0; t <= maxT; t += Math.abs(dir)) {
            pA.x = utils.lerp(t, p0.x, p1.x);
            pA.y = utils.lerp(t, p0.y, p1.y);

            pB.x = utils.lerp(t, p1.x, p2.x);
            pB.y = utils.lerp(t, p1.y, p2.y);

            pC.x = utils.lerp(t, p2.x, p3.x);
            pC.y = utils.lerp(t, p2.y, p3.y);

            pM.x = utils.lerp(t, pA.x, pB.x);
            pM.y = utils.lerp(t, pA.y, pB.y);

            pN.x = utils.lerp(t, pB.x, pC.x);
            pN.y = utils.lerp(t, pB.y, pC.y);

            pFinal.x = utils.lerp(t, pM.x, pN.x);
            pFinal.y = utils.lerp(t, pM.y, pN.y);

            context.lineTo(pFinal.x, pFinal.y);
        }
        context.stroke();

        context.fillStyle = "black";
        maxT += dir;
        if (maxT >= 1) {
            maxT = 1;
            dir *= -1;
        }
        if (maxT <= 0) {
            maxT = 0;
            dir *= -1;
        }

        if (animating)
            requestAnimationFrame(draw);
    }
}