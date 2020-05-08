import { Component, OnInit } from '@angular/core';
// import player service to get pitch outcome data
import { pie, arc, scaleOrdinal, select, event } from 'd3';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-pitch-outcome',
  templateUrl: './pitch-outcome.component.html',
  styleUrls: ['./pitch-outcome.component.less']
})
export class PitchOutcomeComponent implements OnInit {

  private currentIndex: number;
  private dataLength: number;
  private pieData: any;
  private svg: any;
  private chart: any;
  private color = scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3']);

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {

    this.playerSrv.getPitchOutcomeByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        const refactor = res.map( (d) => {
          return {
            meta: {
              year: d.year,
              total: d.total
            },
            data: [
              { label: 'Strikes', value: d.strikes, sortIndex: 0 },
              { label: 'Balls', value: d.balls, sortIndex: 1 },
              { label: 'In Play', value: d.in_play, sortIndex: 2 },
              { label: 'No Affect', value: d.no_affect, sortIndex: 3 }
            ]
          };
        });
        this.pieData = refactor;
        this.setup();
        this.currentIndex = 0;
        this.dataLength = refactor.length - 1;
        this.render(this.pieData[this.currentIndex]);
      }
    );
  }

  arcs() {
    return arc().innerRadius(100)
      .outerRadius(240)
      .cornerRadius(15);
  }

  LoadMoreData(e) {
    if (e.deltaY < 0 && this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    } else if (e.deltaY > 0 && this.currentIndex < this.dataLength) {
      this.currentIndex = this.currentIndex + 1;
    } else {
      console.log(this.currentIndex);
      return;
    }
    this.render(this.pieData[this.currentIndex]);
  }

  setup() {

    const height = 190;
    const width = 250;
    const margin = {top: 80, left: 70, bottom: 0, right: 0};

    this.svg = select('svg');

    this.chart = this.svg.append('g')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.svg.on('wheel', () => {
      this.LoadMoreData(event);
    });
  }

  render(input): void {

    const data = input.data;
    const meta = input.meta;

    const pieGenerator = pie()
      .value((d) => {
        return d.value;
      })
      /*
      .sort((a, b) => {
        return b.sortIndex < a.sortIndex ? -1 : b.sortIndex > a.sortIndex ? 1 : b.sortIndex >= a.sortIndex ? 0 : NaN;
      });
      */
      .sort(null);

    const arcs = pieGenerator(input.data);


    const arcDim = arc().innerRadius(10)
    .outerRadius(50);

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
          return 'Pitch Outcome ' + d;
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
      const str = item.label + ' ' + (item.value / meta.total * 100 ).toFixed(2) + ' %';
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
      .text((d) => {
        return d;
      });
  }

}
