/**
 * Describes singular walker
 */
class Walker {
  constructor(startCol, startV) {
    this.col = startCol;
    this.v = startV;
    this.nextCol = null;
    this.nextV = null;
    this.progress = 0;
    this.color = "#fdcb00";
    this.adjustX = Math.random() - 0.5;
    this.adjustY = Math.random() - 0.5;
  }

  /**
   * run up every time step to update position of walker
   */
  update() {
    const { colAmount } = Configuration.getConfig();
    if (this.nextCol == null || this.nextV == null) {
      if (this.col === 0) {
        const rand = Math.random();
        this.nextCol = this.col + 1;
        if (rand < 0.5) {
          //go up
          this.nextV = this.v;
        } else {
          // go down
          this.nextV = this.v + 1;
        }
      } else if (this.col === colAmount - 1) {
        const rand = Math.random();
        this.color = "#EE5363";
        this.nextCol = this.col - 1;
        if (rand < 0.5) {
          //go up
          this.nextV = this.v | 0;
        } else {
          // go down
          this.nextV = (this.v | 0) + 1;
        }
      } else if (this.col < Math.floor(colAmount / 2)) {
        // on left one edge, on right 2 edges
        const rand = Math.random();

        if (rand < 0.33) {
          // go left
          this.nextCol = this.col - 1;
          this.nextV = (this.v / 2) | 0;
        } else if (rand >= 0.33 && rand <= 0.66) {
          // go right up
          this.nextCol = this.col + 1;
          this.nextV = (this.v * 2) | 0;
        } else {
          // go right down
          this.nextCol = this.col + 1;
          this.nextV = (this.v * 2) | (0 + 1);
        }
      } else if (this.col > Math.floor(colAmount / 2)) {
        // on left two edge, on right 1 edges
        const rand = Math.random();

        if (rand < 0.33) {
          // go right
          this.nextCol = this.col + 1;
          this.nextV = (this.v / 2) | 0;
        } else if (rand >= 0.33 && rand <= 0.66) {
          // go left up
          this.nextCol = this.col - 1;
          this.nextV = (this.v * 2) | 0;
        } else {
          // go left down
          this.nextCol = this.col - 1;
          this.nextV = ((this.v * 2) | 0) + 1;
        }
      } else if (this.col === Math.floor(colAmount / 2)) {
        // on left 1 edge, on right 1 edge
        const rand = Math.random();

        if (rand < 0.5) {
          //go left
          this.nextCol = this.col - 1;
          this.nextV = (this.v / 2) | 0;
        } else {
          // go right
          this.nextCol = this.col + 1;
          this.nextV = (this.v / 2) | 0;
        }
      }
    }

    if (this.progress >= 1) {
      this.v = this.nextV;
      this.col = this.nextCol;
      this.nextV = null;
      this.nextCol = null;
      this.progress = 0;
    }
  }

  /**
   * run every render cycle to render walker to canvas
   */
  render() {
    const { vertexRadius } = Configuration.getConfig();
    const [centerX1, centerY1] = getVertexCoords(this.col, this.v);
    const [centerX2, centerY2] = getVertexCoords(this.nextCol, this.nextV);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      (centerX2 - centerX1) * easeInQuad(this.progress) +
        centerX1 +
        vertexRadius * 0.5 * this.adjustX,
      (centerY2 - centerY1) * easeInQuad(this.progress) +
        centerY1 +
        vertexRadius * 0.5 * this.adjustY,
      squashGraph >= 1 ? canvas.height * 0.005 : vertexRadius * 0.6,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    if (this.progress < 1) {
      this.progress += 0.04;
    }
  }
}
