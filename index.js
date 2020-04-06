function changeSource(newSource) {
    document.querySelector("#iframe").src = newSource
}

window.onload = function() {

}

function showTransitionGraph(canvasId, cp1, cp2) {
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p0 = {
            x: 0,
            y: 200
        },
        p1 = {
            x: cp1.x,
            y: cp1.y
        },
        p2 = {
            x: cp2.x,
            y: cp2.y
        },
        p3 = {
            x: 200,
            y: 0
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
        animating = false;;

    context.scale(1, 1);
    context.font = "25px Arial";

    draw();
    document.body.addEventListener("click", function() {
        draw();
    });

    function draw() {
        context.clearRect(0, 0, width, height);

        context.strokeStyle = "#ccc";
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.stroke();

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

        context.beginPath();
        context.strokeStyle = "green";
        context.moveTo(pA.x, pA.y);
        context.lineTo(pB.x, pB.y);
        context.lineTo(pC.x, pC.y);
        context.stroke();

        context.beginPath();
        context.strokeStyle = "blue";
        context.moveTo(pM.x, pM.y);
        context.lineTo(pN.x, pN.y);
        context.stroke();

        context.fillStyle = "green";
        context.beginPath();
        context.arc(pA.x, pA.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(pB.x, pB.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(pC.x, pC.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.fillStyle = "blue";
        context.beginPath();
        context.arc(pM.x, pM.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(pN.x, pN.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.fillStyle = "red";
        context.beginPath();
        context.arc(pFinal.x, pFinal.y, 4, 0, Math.PI * 2, false);
        context.fill();

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