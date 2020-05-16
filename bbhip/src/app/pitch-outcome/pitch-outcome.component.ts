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

  poData: any;

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
        this.poData = refactor;
      }
    );
  }

}
