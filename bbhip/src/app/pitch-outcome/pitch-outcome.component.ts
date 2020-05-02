import { Component, OnInit } from '@angular/core';
// import player service to get pitch outcome data
import { pie, arc, scaleOrdinal, select } from 'd3';

@Component({
  selector: 'app-pitch-outcome',
  templateUrl: './pitch-outcome.component.html',
  styleUrls: ['./pitch-outcome.component.less']
})
export class PitchOutcomeComponent implements OnInit {

  public data: any = [
    {
      player_id: 'rizza001',
      year: 2018,
      balls: 971,
      strikes: 899,
      in_play: 495,
      no_affect: 199,
      total: 2564
    },
    {
      player_id: 'rizza001',
      year: 2019,
      balls: 100,
      strikes: 100,
      in_play: 100,
      no_affect: 100,
      total: 2510
    }
  ];

arcs() {
      return arc().innerRadius(100)
        .outerRadius(240)
        .cornerRadius(15);
}

  render(): void {

    const svg = select('svg');
    const height = svg.attr('width');
    const width = svg.attr('height');

    const g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const data = [this.data[0].balls, this.data[0].strikes, this.data[0].in_play, this.data[0].no_affect];
    const arcs = pie()(data);
    const color = scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3']);
    const arcDim = arc().innerRadius(10)
      .outerRadius(50);

    const background = g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .style('fill', (d, i) => color(i))
      .attr('d', arcDim);
  }

  constructor() { }

  ngOnInit(): void {
      this.render();
  }

}
