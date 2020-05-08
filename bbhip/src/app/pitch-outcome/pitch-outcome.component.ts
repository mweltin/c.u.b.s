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

  private currentIndex;
  private dataLength;
  private pieData;
  private svg;

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
            data: {
              strikes: d.strikes,
              balls: d.balls,
              inPlay: d.in_play,
              noAffect: d.no_affect
            }
          };
        });
        this.svg = this.setup(refactor[0]);
        this.currentIndex = 0;
        this.dataLength = refactor.length - 1;
        this.pieData = refactor;
        this.render(refactor[0]);
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

  setup(input) {
    const data = input.data;
    const meta = input.meta;
    const height = 190;
    const width = 250;
    const margin = {top: 80, left: 70, bottom: 0, right: 0};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const arcs = pie()(Object.values(data));
    const color = scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3']);
    const arcDim = arc().innerRadius(10)
      .outerRadius(50);

    const svg = select('svg');

    const g = svg.append('g')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.on('wheel', () => {
      this.LoadMoreData(event);
    });
    return svg;
  }

  render(input): void {

    const data = input.data;
    const meta = input.meta;

    /*
    this.svg.append('text')
      .text('Pitch Outcome ' + meta.year)
      .attr('transform', `translate(75, 20)`);
*/


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
        }
      );
/*
/*

    */
/*
    const chart = g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .style('fill', (d, i) => color(i) )
      .attr('d', arcDim);

    const labels = [];
    Object.keys(data).forEach( (item) => {
      const str = item + ' ' + (data[item] / meta.total * 100 ).toFixed(2) + ' %';
      labels.push(str);
    });

    const legendG = svg.selectAll('.legend')
      .data(labels)
      .enter().append('g')
      .attr('transform', (d, i) => {
        return 'translate(150 , ' + (i * 20 + 40) + ')'; // place each legend on the right and bump each one down 15 pixels
      })
      .attr('class', 'legend');

    legendG.append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 9)
      .attr('fill',
      (d, i) => {
        return color(i);
      });

    legendG.append('text')
    .text( (d) => {
      return d ;
    } )
      .style('font-size', 12)
      .attr('y', 10)
      .attr('x', 20)
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');
      */
  }

}
