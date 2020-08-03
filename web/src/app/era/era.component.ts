import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  select,
  scaleLinear,
  format,
  scaleOrdinal,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveCatmullRom,
  nest,
  schemeCategory10,
  descending
} from 'd3';

import { colorLegend } from './colorLegend';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-era',
  templateUrl: './era.component.html',
  styleUrls: ['./era.component.less'],
  encapsulation: ViewEncapsulation.None 
})

export class EraComponent implements OnInit {
  width: number;
  height: number;
  svg: any;

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {
    this.svg = select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.playerSrv.getEarnedRunAverageByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        this.render(res);
      }
    );
  }

  render (data) {
    const title = 'ERA By Day Of The Week';
    
    const xValue = d => d.year;
    const xAxisLabel = 'Year';
    
    const yValue = d => +d.era.toFixed(2);
    const circleRadius = 6;
    const yAxisLabel = 'ERA';
    
    const colorValue = d => d.day_of_week;
    
    const margin = { top: 60, right: 160, bottom: 88, left: 105 };
    const innerWidth =this.width - margin.left - margin.right;
    const innerHeight =this.height - margin.top - margin.bottom;
    
    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const colorScale = scaleOrdinal(schemeCategory10);
    
    const g = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight) 
      .tickFormat(format("d"))
      .tickPadding(15);
    
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveCatmullRom);
    
    const lastYValue = d =>
      yValue(d.values[d.values.length - 1]);
    
      const sorter = {
        // "sunday": 0, // << if sunday is first day of week
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6,
        "sunday": 7
      }

    const nested = nest()
      .key(colorValue)
      .entries(data)
      .sort((a, b) =>{
        let day1 = a.key.toLowerCase();
        let day2 = b.key.toLowerCase();
        return sorter[day1] - sorter[day2];
      }
      );
    
    colorScale.domain(nested.map(d => d.key));
    
    g.selectAll('.line-path').data(nested)
      .enter().append('path')
        .attr('class', 'line-path')
        .attr('class', 'era-line-path')
        .attr('d', d => lineGenerator(d.values))
        .attr('stroke', d => colorScale(d.key));
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
    
    this.svg.append('g')
      .attr('transform', `translate(820,121)`)
      .call(colorLegend, {
        colorScale,
        circleRadius: 13,
        spacing: 30,
        textOffset: 20
      });
  };
  
}
