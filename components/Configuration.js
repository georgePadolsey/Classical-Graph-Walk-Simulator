class ConfigurationObject {
  constructor() {
    this.baseConfig = {
      graphSize: 5,
      squishMode: false,
      walkerAmount: 1000,
      leftMargin: 0.1,
      rightMargin: 0.1,
      topMargin: 0.05,
      bottomMargin: 0.05,
    };
    this.gui = new dat.GUI({ name: "Graph Controller" });
    this.graphSizeCont = this.gui.add(this.baseConfig, "graphSize", 1, 8, 1);
    this.walkerAmountCont = this.gui.add(
      this.baseConfig,
      "walkerAmount",
      0,
      1200,
      10
    );
    this.gui.add(this.baseConfig, "squishMode");
  }
  getConfig() {
    // in function so can dynamically update with canvas size

    let configObj = {
      graphSize: this.baseConfig.graphSize,
      colLeftMargin: 0.1 * canvas.width,
      colRightMargin: 0.1 * canvas.width,
      topMargin: (0.45 * squashGraph + 0.05) * canvas.height,
      bottomMargin: (0.45 * squashGraph + 0.05) * canvas.height,
    };
    configObj.colAmount = 2 * configObj.graphSize + 1;
    configObj.colWidth =
      (canvas.width - configObj.colLeftMargin - configObj.colRightMargin) /
      configObj.colAmount;

    configObj.vertexRadius = Math.min(
      configObj.colWidth * 0.25,
      (0.5 * (canvas.height - configObj.topMargin - configObj.bottomMargin)) /
        Math.pow(2, configObj.colAmount / 2)
    );

    configObj.lineWidth = Math.max(
      configObj.vertexRadius * 1,
      configObj.colWidth * 0.02
    );

    return Object.assign({}, this.baseConfig, configObj);
  }
}

var Configuration = new ConfigurationObject();
