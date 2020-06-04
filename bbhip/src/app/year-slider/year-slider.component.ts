import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { line, select, scaleLinear} from 'd3';
@Component({
  selector: 'app-year-slider',
  templateUrl: './year-slider.component.html',
  styleUrls: ['./year-slider.component.less']
})
export class YearSliderComponent implements OnInit, OnChanges  {

  constructor() { }

  private svg: any;
  private line: any;
  private chart: any;

  ngOnInit(): void {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  setup() {
    const data = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 ];
    const height = 600;
    const width = 50;
    const margin = {top: 20, left: 0, bottom: 0, right: 0};

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
    .merge(lines)
      .append('path')
      .attr('d', this.line( data ) )
      .attr('stroke', 'black')
      .attr('stroke-width', 5);

    const circles = this.chart.selectAll('circle').data(data);

    circles.exit().remove();

    circles
      .enter()
      .merge(circles)
      .append('circle')
      .attr('cx', ( d ) => 10 )
      .attr('cy', (d, i) => yScale(i) )
      .attr('r', (d) => 8 )
      .style('fill', 'red');
  }
}
