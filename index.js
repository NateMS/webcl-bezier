function changeSource(newSource) {
    document.querySelector("#iframe").src = newSource
}

window.onload = function() {
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
                y: 200
            },
            cp2: {
                x: 200,
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
}

function showTransitionGraph(canvasId, cp1, cp2) {
    let factor = 200;
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d"),
        width = canvas.width = factor,
        height = canvas.height = factor,
        p0 = {
            x: 0 * factor,
            y: 1 * factor
        },
        p1 = {
            x: cp1.x * factor,
            y: cp1.y * factor
        },
        p2 = {
            x: cp2.x * factor,
            y: cp2.y * factor
        },
        p3 = {
            x: 1 * factor,
            y: 0 * factor
        },
        pA = {},
        pB = {},
        pC = {},
        pM = {},
        pN = {},
        pFinal = {},
        t = 1,
        maxT = 0,
        dir = 0.005,
        animating = true;;

    context.scale(1, 1);
    draw();

    function draw() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(p0.x, p0.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(p1.x, p1.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(p2.x, p2.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(p3.x, p3.y, 4, 0, Math.PI * 2, false);
        context.fill();

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