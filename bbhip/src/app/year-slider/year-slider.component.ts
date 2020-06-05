import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { line, select, scaleLinear, event, selectAll} from 'd3';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-year-slider',
  templateUrl: './year-slider.component.html',
  styleUrls: ['./year-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class YearSliderComponent implements OnInit, OnChanges  {

  constructor(
    public playerSrv: PlayerService
  ) { }

  private svg: any;
  private line: any;
  private chart: any;

  ngOnInit(): void {
    this.setup();
  }

  setup() {
    const data = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 ];
    const height = 600;
    const width = 25;
    const margin = {top: 20, left: 5, bottom: 0, right: 0};

    this.svg = select('app-year-slider svg');

    this.chart = this.svg.append('g')
        .attr('width', width)
        .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const yScale = scaleLinear()
    .domain([0, data.length])
    .range([0, height]);


    this.line = line()
      .x( ( d ) => 10 )
      .y( (d, i) => yScale(i) );


    const lines = this.chart.selectAll('year-lines')
      .data([data]);

    lines.exit().remove();

    lines
    .enter()
    .append('path')
    .attr('class', 'year-slider-line')
    .merge(lines)
    .attr('d', this.line( data ) );

    const circles = this.chart.selectAll('year-circle').data(data);

    circles.exit().remove();

    circles
      .enter()
      .merge(circles)
      .append('circle')
      .attr('cx', ( d ) => 10 )
      .attr('cy', (d, i) => yScale(i) )
      .attr('r', (d) => 8 )
      .attr('class', 'year-slider-circle')
      .on('click', (d, i, n) => {
        console.log(d);
        n.forEach(element => {
           select(element).attr('r', 10);
        });
        select(n[i]).attr('r', 15);
        this.playerSrv.announceDisplayDateChange(d);
      });
  }
}
