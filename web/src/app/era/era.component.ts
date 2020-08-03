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

  constructor() { }

  ngOnInit(): void {
    this.svg = select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    const data = [{"era": 6.63157894736842105266, "day_of_week": "monday", "year": 2010}, {"era": 3.46788990825688073394, "day_of_week": "wednesday", "year": 2010}, {"era": 5.40000000000000000000, "day_of_week": "thursday", "year": 2010}, {"era": 5.40000000000000000000, "day_of_week": "friday", "year": 2010}, {"era": 5.40000000000000000000, "day_of_week": "saturday", "year": 2010}, {"era": 3.70588235294117647062, "day_of_week": "monday", "year": 2011}, {"era": 5.40000000000000000000, "day_of_week": "tuesday", "year": 2011}, {"era": 3.17647058823529411761, "day_of_week": "wednesday", "year": 2011}, {"era": 3.37500000000000000000, "day_of_week": "thursday", "year": 2011}, {"era": 6.09677419354838709678, "day_of_week": "friday", "year": 2011}, {"era": 6.09677419354838709678, "day_of_week": "saturday", "year": 2011}, {"era": 10.04651162790697674423, "day_of_week": "sunday", "year": 2011}, {"era": 6.53225806451612903229, "day_of_week": "monday", "year": 2012}, {"era": 4.42622950819672131144, "day_of_week": "tuesday", "year": 2012}, {"era": 6.15789473684210526312, "day_of_week": "wednesday", "year": 2012}, {"era": 2.99999999999999999997, "day_of_week": "thursday", "year": 2012}, {"era": 16.20000000000000000000, "day_of_week": "friday", "year": 2012}, {"era": 4.88571428571428571426, "day_of_week": "saturday", "year": 2012}, {"era": 5.55882352941176470584, "day_of_week": "sunday", "year": 2012}, {"era": 5.06250000000000000000, "day_of_week": "monday", "year": 2013}, {"era": 8.37931034482758620685, "day_of_week": "tuesday", "year": 2013}, {"era": 1.63636363636363636362, "day_of_week": "wednesday", "year": 2013}, {"era": 6.00000000000000000003, "day_of_week": "thursday", "year": 2013}, {"era": 1.28571428571428571426, "day_of_week": "friday", "year": 2013}, {"era": 4.23529411764705882354, "day_of_week": "saturday", "year": 2013}, {"era": 7.20000000000000000000, "day_of_week": "sunday", "year": 2013}, {"era": 1.40259740259740259744, "day_of_week": "monday", "year": 2014}, {"era": 1.19999999999999999997, "day_of_week": "tuesday", "year": 2014}, {"era": 2.72093023255813953489, "day_of_week": "wednesday", "year": 2014}, {"era": 4.73684210526315789477, "day_of_week": "thursday", "year": 2014}, {"era": 4.71428571428571428568, "day_of_week": "friday", "year": 2014}, {"era": 1.66153846153846153842, "day_of_week": "saturday", "year": 2014}, {"era": 1.58823529411764705885, "day_of_week": "sunday", "year": 2014}, {"era": 0.58378378378378378374, "day_of_week": "monday", "year": 2015}, {"era": 1.28571428571428571426, "day_of_week": "tuesday", "year": 2015}, {"era": 1.87499999999999999997, "day_of_week": "wednesday", "year": 2015}, {"era": 1.71428571428571428571, "day_of_week": "thursday", "year": 2015}, {"era": 2.29787234042553191493, "day_of_week": "friday", "year": 2015}, {"era": 1.92857142857142857139, "day_of_week": "saturday", "year": 2015}, {"era": 3.41052631578947368422, "day_of_week": "sunday", "year": 2015}, {"era": 4.43283582089552238810, "day_of_week": "monday", "year": 2016}, {"era": 5.62500000000000000000, "day_of_week": "tuesday", "year": 2016}, {"era": 0.31034482758620689653, "day_of_week": "wednesday", "year": 2016}, {"era": 7.20000000000000000000, "day_of_week": "thursday", "year": 2016}, {"era": 2.74576271186440677969, "day_of_week": "friday", "year": 2016}, {"era": 2.27368421052631578945, "day_of_week": "saturday", "year": 2016}, {"era": 2.43975903614457831324, "day_of_week": "sunday", "year": 2016}, {"era": 2.97247706422018348626, "day_of_week": "monday", "year": 2017}, {"era": 5.40000000000000000000, "day_of_week": "tuesday", "year": 2017}, {"era": 4.70930232558139534881, "day_of_week": "wednesday", "year": 2017}, {"era": 2.45454545454545454543, "day_of_week": "thursday", "year": 2017}, {"era": 1.01886792452830188675, "day_of_week": "friday", "year": 2017}, {"era": 4.76470588235294117646, "day_of_week": "saturday", "year": 2017}, {"era": 4.17857142857142857139, "day_of_week": "sunday", "year": 2017}, {"era": 5.19230769230769230772, "day_of_week": "monday", "year": 2018}, {"era": 5.40000000000000000000, "day_of_week": "tuesday", "year": 2018}, {"era": 3.19354838709677419356, "day_of_week": "wednesday", "year": 2018}, {"era": 3.13953488372093023260, "day_of_week": "thursday", "year": 2018}, {"era": 2.07692307692307692307, "day_of_week": "friday", "year": 2018}, {"era": 4.34482758620689655169, "day_of_week": "saturday", "year": 2018}, {"era": 4.66666666666666666668, "day_of_week": "sunday", "year": 2018}, {"era": 4.95000000000000000000, "day_of_week": "monday", "year": 2019}, {"era": 2.99999999999999999997, "day_of_week": "tuesday", "year": 2019}, {"era": 5.29411764705882352938, "day_of_week": "wednesday", "year": 2019}, {"era": 4.37837837837837837841, "day_of_week": "thursday", "year": 2019}, {"era": 2.25000000000000000000, "day_of_week": "friday", "year": 2019}, {"era": 4.87951807228915662648, "day_of_week": "saturday", "year": 2019}, {"era": 5.04395604395604395604, "day_of_week": "sunday", "year": 2019}]
    this.render(data);
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
