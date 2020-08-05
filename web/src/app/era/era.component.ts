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
    this.svg = select('#era-by-day');
    this.width = 900;
    this.height = 600;
    this.svg.attr("viewBox", '0 0 '+this.width+' '+this.height)
    this.playerSrv.getEarnedRunAverageByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        this.render(res);
      }
    );
  }

  render (data) {

    const margin = { top: 30, right: 300, bottom: 200, left: 30 };
    const innerWidth =this.width - margin.left - margin.right;
    const innerHeight =this.height - margin.top - margin.bottom;
    const circleRadius = 6;

    const title = 'ERA By Day Of The Week';


    const xValue = d => d.year;
    const yValue = d => +d.era.toFixed(2);
    const colorValue = d => d.day_of_week;
    
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

    const yAxisLabel = 'ERA';
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -margin.left + 10)
        .attr('x', - margin.bottom)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisLabel = 'Year';
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    xAxisG.select('.domain').remove();
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', margin.top + 10)
        .attr('x', margin.right)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveCatmullRom);
    
    const lastYValue = d =>
      yValue(d.values[d.values.length - 1]);
    
      const sorter = {
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
    
    // title position
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth / 2 )
        .text(title);
    
    // legend position
    this.svg.append('g')
      .attr('transform', 'translate(' + (this.width - margin.right + 10) + ',121)')
      .call(colorLegend, {
        colorScale,
        circleRadius: circleRadius,
        spacing: 30,
        textOffset: 10
      });
  };
  
}
