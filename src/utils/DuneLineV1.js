import noise from './noise';

export const duneContants = {
  amountOfLines: 25,
  amountOfPoints: 10,
  displacementAmount: 100,
  noiseGridX: 10,
  noiseGridY: 10
};

const noiseSeed = 1234;

noise.seed(noiseSeed);

class Dunes {
  renderDunes(width, height, svg) {
    this.width = width;
    this.height = height;
    this.svg = svg;

    this.renderLines();

    console.log('Done rendering dunes.');
  }

  renderLines() {
    // for (let i = 0; i < duneContants.amountOfLines; i++) {
    //   this.renderLine(i);
    // }

    let time = 0;
    setInterval(() => {
      this.renderLine(time);
      time += 0.01;
    }, 100);
  }

  renderLine(time) {
    let x = 0;
    let y = this.height / 2;

    let pathD = '';

    pathD += `M ${x} ${y}`;

    const xTravel = this.width / duneContants.amountOfPoints;

    for (let i = 0; i < duneContants.amountOfPoints - 1; i++) {
      x += xTravel;

      const angleNoiseValue = Math.abs(noise.simplex3(x * duneContants.noiseGridX, y * duneContants.noiseGridY, time)) * Math.PI * 2;
      const displacementNoiseValue = Math.abs(noise.simplex3((x * duneContants.noiseGridX) + 20000, (y * duneContants.noiseGridY) + 20000, time)) * duneContants.displacementAmount;

      // xDisplacement: Math.cos(angleNoiseValue) * displacementNoiseValue,
      // yDisplacement: Math.sin(angleNoiseValue) * displacementNoiseValue
      const yDisplacement = Math.sin(angleNoiseValue) * displacementNoiseValue;

      const yVal = y + yDisplacement;

      pathD += ` L ${x} ${yVal}`;
    }

    pathD += ` L ${this.width} ${this.height / 2}`;

    this.svg.append('path')
      .attr('d', pathD)
      .attr('class', 'dune-line');
  }
}

export default Dunes;