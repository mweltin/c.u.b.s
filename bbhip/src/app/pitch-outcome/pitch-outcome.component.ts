import { Component, OnInit } from '@angular/core';
// import player service to get pitch outcome data
import { pie, arc, scaleOrdinal, select } from 'd3';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-pitch-outcome',
  templateUrl: './pitch-outcome.component.html',
  styleUrls: ['./pitch-outcome.component.less']
})
export class PitchOutcomeComponent implements OnInit {

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {

    this.playerSrv.getPitchOutcomeByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        this.render(res[0])
      }
    );
  }

  arcs() {
    return arc().innerRadius(100)
      .outerRadius(240)
      .cornerRadius(15);
  }

  render(data): void {

    const height = 190;
    const width = 250;
    const margin = {top: 80, left:70, bottom:0, right: 0}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom 

    const arcs = pie()([data.strikes, data.balls, data.in_play, data.no_affect]);
    const color = scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3']);
    const arcDim = arc().innerRadius(10)
      .outerRadius(50);
      
    const svg = select('svg');
    
    const g = svg.append('g')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
   
    const title = svg.append('text')
      .text('Pitch Outcome' + data.year)
      .attr('transform', `translate(75, 20)`)

    const chart = g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .style('fill', (d, i) => color(i) )
      .attr('d', arcDim);

   const lables = ['strikes', 'balls', 'in_play', 'no_affect'];
   const legendG = svg.selectAll('.legend')
      .data(lables)
      .enter().append('g')
      .attr('transform', (d,i) => {
        return 'translate(160 , ' + (i * 20 + 40) + ')'; // place each legend on the right and bump each one down 15 pixels
      })
      .attr('class', 'legend');

   legendG.append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 8)
      .attr('fill', 
      (d,i) => { 
        return color(i) 
      });
    
    legendG.append('text')
    .text( (d) =>{
      return d ;
    } )
      .style('font-size', 12)
      .attr('y', 10)
      .attr('x', 20)
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");   
      }
}
