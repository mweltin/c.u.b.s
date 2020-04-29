import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ViewEncapsulation,  AfterViewInit } from '@angular/core';
import { STATISTICS } from './Statistics';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit, OnChanges,  AfterViewInit {
  @ViewChild('barChart')
  private chartContainer: ElementRef;

  @Input()
  data = STATISTICS;

  margin = { top: 20, right: 20, bottom: 10, left: 40 };

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.createChart(); 
  }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const data = this.data;

    d3.select(element).select('svg').remove();

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.frequency));
  }

  onResize(what) {
    this.createChart();
  }

}
