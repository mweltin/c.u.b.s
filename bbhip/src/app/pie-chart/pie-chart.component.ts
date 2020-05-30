import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pie, arc, scaleOrdinal, select, event } from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() pieData;
  @Input() identifier;
  @Input() title;
  @Input() centerData;

  private currentIndex: number;
  private maxIndex: number;
  private svg: any;
  private chart: any;
  private color = scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3']);
  private previousXTouch;

  constructor() { }

  ngOnInit(): void {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pieData.currentValue) {
      this.currentIndex = 0;
      this.pieData = changes.pieData.currentValue;
      this.maxIndex = this.pieData.length - 1;
      this.render(this.pieData[this.maxIndex]);
    }
  }

  scrollCallBack(e) {
    if (e.deltaY > 0 && this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    } else if (e.deltaY < 0 && this.currentIndex < this.maxIndex) {
      this.currentIndex = this.currentIndex + 1;
    } else {
      return;
    }
    this.render(this.pieData[this.currentIndex]);
  }

  touchCallBack(e) {
    if (!this.previousXTouch) {
      this.previousXTouch = e.changedTouches[0].clientX;
    }
    const direction = this.previousXTouch - e.changedTouches[0].clientX;
    // buffer to slow down how far you have to drag before taking action
    if ( Math.abs(direction) < 15 ){
      return;
    }
    if (direction > 0 && this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    } else if (direction < 0 && this.currentIndex < this.maxIndex) {
      this.currentIndex = this.currentIndex + 1;
    } else {
      return;
    }
    this.render(this.pieData[this.currentIndex]);
    this.previousXTouch = e.changedTouches[0].clientX;
    console.log(direction);
  }

  setup() {

    const height = 190;
    const width = 250;
    const margin = {top: 80, left: 70, bottom: 0, right: 0};

    this.svg = select('[identifier=' + this.identifier + '] svg');

    this.chart = this.svg.append('g')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.svg.on('wheel', () => {
      this.scrollCallBack(event);
    });
    this.svg.on('touchmove', () => {
      this.touchCallBack(event);
    });
  }


  render(input: any): void {

    const data = input.data;
    const meta = input.meta;

    const pieGenerator = pie()
      .value((d: any) => {
        return d.value;
      })
      /*
      .sort((a, b) => {
        return b.sortIndex < a.sortIndex ? -1 : b.sortIndex > a.sortIndex ? 1 : b.sortIndex >= a.sortIndex ? 0 : NaN;
      });
      */
      .sort(null);

    const arcs = pieGenerator(data);


    const arcDim = arc().innerRadius(50)
    .outerRadius(25);

    const titleText = this.svg.selectAll('text.po-title').data([meta.year]);

    titleText.exit().remove();

    titleText
      .enter()
      .append('text')
      .attr('transform', `translate(75, 20)`)
      .attr('class', 'po-title')
      .merge(titleText)
      .text(
        (d) => {
          return this.title + ' ' + d;
        });

    const pieChart = this.chart.selectAll('path')
    .data(arcs);

    pieChart
      .enter()
      .append('path')
      .merge(pieChart)
      .attr('d', arcDim)
      .style('fill', (d, i) => this.color(i));

    const labels = [];
    (data).forEach((item) => {
      const str = item.label;
      labels.push(str);
    });

    const legendG = this.svg.selectAll('.legend').data(labels);
    legendG.exit().remove();

    legendG.enter()
      .append('g')
      .attr('transform', (d, i) => {
        return 'translate(150 , ' + (i * 20 + 40) + ')';
      })
      .attr('class', 'legend')
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 9)
      .attr('fill',
      (d, i) => {
          return this.color(i);
        });

    const legendT = this.svg.selectAll('text.po-detail').data(labels);
    legendT.exit().remove();

    legendT
      .enter()
      .append('text')
      .attr('class', 'po-detail')
      .attr('transform', (d, i) => {
        return 'translate(150 , ' + (i * 20 + 40) + ')';
      })
      .style('font-size', 12)
      .attr('y', 10)
      .attr('x', 20)
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')
      .merge(legendT)
      .text( ( d ) => {
        return d;
      });

    if ( this.centerData ){
      const CenterData = this.svg.selectAll('text.center-data').data([meta[this.centerData]]);
      CenterData.exit().remove();

      CenterData
        .enter()
        .append('text')
        .attr('class', 'center-data')
        .attr('transform', (d, i) => {
          return 'translate(34 , 70)';
        })
        .style('font-size', 14)
        .style('font-face', 'bold')
        .attr('y', 10)
        .attr('x', 20)
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
        .merge(CenterData)
        .text((d) => {
          return d;
        });
    }
  }
}
