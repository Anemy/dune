import noise from './noise';

export const duneContants = {
  amountOfLines: 200,
  amountOfPoints: 10,
  displacementAmount: 100,
  iterations: 0,
  noiseGridX: 0.001,
  noiseGridY: 0.001,
  timeChangeAmount: 0.005
};

// 898

class Dunes {
  renderDunes(width, height, svg) {
    this.width = width;
    this.height = height;
    this.svg = svg;

    this.renderLines();

    console.log('Done rendering dunes.');
  }

  renderLines() {

    const noiseSeed = Math.floor(Math.random() * 10000);

    console.log('seeding with', noiseSeed);
    noise.seed(noiseSeed);

    let time = 0;
    this.interval = setInterval(() => {
      for (let i = 0; i < duneContants.amountOfLines; i++) {
        if (Math.random() > 0.05) {
          this.renderLine((this.height / duneContants.amountOfLines) * i, time);
        }
      }

      time += duneContants.timeChangeAmount;

      if (time > duneContants.timeChangeAmount * duneContants.iterations) {
        clearInterval(this.interval);
      }
    }, 100);
  }

  renderLine(yBase, time) {
    let x = 0;
    let y = yBase;

    let pathD = '';

    pathD += `M ${x} ${y}`;

    const xTravel = this.width / duneContants.amountOfPoints;

    for (let i = 0; i < duneContants.amountOfPoints - 2; i++) {
      x += xTravel;

      const angleNoiseValue = Math.abs(noise.simplex3(x * duneContants.noiseGridX, y * duneContants.noiseGridY, time)) * Math.PI * 2;
      const displacementNoiseValue = Math.abs(noise.simplex3((x * duneContants.noiseGridX) + 20000, (y * duneContants.noiseGridY) + 20000, time)) * duneContants.displacementAmount;

      // const xDisplacement = Math.cos(angleNoiseValue) * displacementNoiseValue;
      const yDisplacement = Math.sin(angleNoiseValue) * displacementNoiseValue;

      const xVal = x;// + (xDisplacement / 2);
      const yVal = y + yDisplacement;

      pathD += ` S ${xVal} ${yVal} ${xVal + (xTravel / 2)} ${yVal}`;
    }

    pathD += ` S ${this.width} ${yBase} ${this.width} ${yBase}`;

    this.svg.append('path')
      .attr('d', pathD)
      .attr('class', 'dune-line');
  }
}

export default Dunes;