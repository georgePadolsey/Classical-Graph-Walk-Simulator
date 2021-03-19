/**
 * Utility function to help easing
 * @param {easing paramater} x [0,1]
 */
function easeInQuad(x) {
  return x * x;
}

function getVertexCoords(colI, vertexI) {
  const {
    colLeftMargin,
    colWidth,
    topMargin,
    colAmount,
    bottomMargin,
  } = Configuration.getConfig();

  const vertices =
    colI < Math.floor(colAmount / 2)
      ? Math.pow(2, colI)
      : Math.pow(2, colAmount - colI - 1);

  const heightPerVertex = (canvas.height - topMargin - bottomMargin) / vertices;

  // centerX, centerY
  return [
    colLeftMargin + colWidth * colI + colWidth * 0.5,
    topMargin + heightPerVertex * vertexI + 0.5 * heightPerVertex,
  ];
}

var squashGraph = 0;
