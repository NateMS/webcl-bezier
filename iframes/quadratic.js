window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p0 = {
            x: 125,
            y: 325
        },
        p1 = {
            x: 75,
            y: 75
        },
        p2 = {
            x: 325,
            y: 125
        },
        pA = {},
        pB = {},
        pFinal = {},
        t = 0,
        maxT = 0,
        dir = 0.005;

    context.scale(1, 1);
    context.font = "25px Arial";
    draw();

    function draw() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
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


        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(p0.x, p0.y);

        for (t = 0; t <= maxT; t += Math.abs(dir)) {
            pA.x = utils.lerp(t, p0.x, p1.x);
            pA.y = utils.lerp(t, p0.y, p1.y);

            pB.x = utils.lerp(t, p1.x, p2.x);
            pB.y = utils.lerp(t, p1.y, p2.y);

            pFinal.x = utils.lerp(t, pA.x, pB.x);
            pFinal.y = utils.lerp(t, pA.y, pB.y);

            context.lineTo(pFinal.x, pFinal.y);
        }
        context.stroke();

        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(pA.x, pA.y);
        context.lineTo(pB.x, pB.y);
        context.stroke();

        context.beginPath();
        context.arc(pA.x, pA.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(pB.x, pB.y, 4, 0, Math.PI * 2, false);
        context.fill();

        context.fillStyle = "red";
        context.beginPath();
        context.arc(pFinal.x, pFinal.y, 4, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = "black";



        labelPointLeft(p0, "p0");
        labelPointLeft(p1, "p1");
        labelPointLeft(p2, "p2");

        maxT += dir;
        if (maxT >= 1) {
            maxT = 1;
            dir *= -1;
        }
        if (maxT <= 0) {
            maxT = 0;
            dir *= -1;
        }

        requestAnimationFrame(draw);
    }

    function labelPointLeft(p, name) {
        context.fillStyle = "black";
        context.fillText(name, p.x + 15, p.y - 10);
    }
};