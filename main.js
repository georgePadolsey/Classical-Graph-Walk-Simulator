/**
 * Classical graph walk simulator written for ES5.
 */

let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");

function render(t) {
  const {
    vertexRadius,
    colAmount,
    colWidth,
    lineWidth,
  } = Configuration.getConfig();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var col = 0; col < colAmount; col++) {
    let vertices =
      col < Math.floor(colAmount / 2)
        ? Math.pow(2, col)
        : Math.pow(2, colAmount - col - 1);

    if (squashGraph >= 1) {
      vertices = 1;
    }

    for (var v = 0; v < vertices; v++) {
      const [centerX, centerY] = getVertexCoords(col, v);
      //draw lines before circles

      if (col !== 0) {
        ctx.strokeStyle = "#e82a84";
        ctx.lineWidth = lineWidth;
        if (col <= Math.floor(colAmount / 2)) {
          const [pastX, pastY] = getVertexCoords(col - 1, (v / 2) | 0);
          ctx.beginPath();
          ctx.moveTo(pastX, pastY);
          ctx.lineTo(centerX, centerY);

          ctx.stroke();
        } else {
          const [pastX1, pastY1] = getVertexCoords(col - 1, (v * 2) | 0);
          ctx.beginPath();
          ctx.moveTo(pastX1, pastY1);
          ctx.lineTo(centerX, centerY);

          ctx.stroke();
          const [pastX2, pastY2] = getVertexCoords(col - 1, (v * 2) | (0 + 1));
          ctx.beginPath();
          ctx.moveTo(pastX2, pastY2);
          ctx.lineTo(centerX, centerY);

          ctx.stroke();
        }
      }
    }
  }

  for (var col = 0; col < colAmount; col++) {
    let vertices =
      col < Math.floor(colAmount / 2)
        ? Math.pow(2, col)
        : Math.pow(2, colAmount - col - 1);
    if (squashGraph >= 1) {
      vertices = 1;
    }
    for (var v = 0; v < vertices; v++) {
      // circles
      const [centerX, centerY] = getVertexCoords(col, v);
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        squashGraph >= 1 ? canvas.height * 0.005 : vertexRadius,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  walkers.map((w) => {
    w.update();
    w.render();
  });

  if (Configuration.getConfig().squishMode) {
    squashGraph = Math.min(1, squashGraph + 0.05);
  } else {
    squashGraph = Math.max(0, squashGraph - 0.05);
  }

  // if fully squashed
  if (squashGraph >= 1) {
    var colCounter = {};
    walkers.forEach((w) => {
      colCounter[w.col] = (colCounter[w.col] || 0) + 1;
    });

    for (var col = 0; col < colAmount; col++) {
      const [centerX, centerY] = getVertexCoords(col, 0);
      ctx.font = "48px sans-serif";
      ctx.fillStyle = "#FDCB00";
      ctx.textAlign = "center";
      ctx.fillText(colCounter[col] || 0, centerX, centerY - 48, colWidth / 2);
    }
  }

  requestAnimationFrame(render);
}

var walkers = [];

function resetWalkers() {
  let { walkerAmount } = Configuration.getConfig();
  walkers = [];
  for (var i = 0; i < walkerAmount; i++) {
    walkers.push(new Walker(0, 0));
  }
}
resetWalkers();

Configuration.graphSizeCont.onChange(resetWalkers);

Configuration.walkerAmountCont.onChange(resetWalkers);

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", setCanvasSize);

function start() {
  requestAnimationFrame(render);

  setCanvasSize();
}

window.addEventListener("load", start);
