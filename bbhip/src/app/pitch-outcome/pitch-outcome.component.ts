import { Component, OnInit } from '@angular/core';
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
              { label: 'Strikes ' + (d.strikes / d.total * 100 ).toFixed(2) + ' %', value: d.strikes , sortIndex: 0 },
              { label: 'Balls ' + (d.balls / d.total * 100 ).toFixed(2) + ' %', value: d.balls , sortIndex: 1 },
              { label: 'In Play ' + ( d.in_play / d.total * 100 ).toFixed(2) + ' %', value: d.in_play , sortIndex: 2 },
              { label: 'No Affect ' + (d.no_affect / d.total * 100 ).toFixed(2) + ' %', value: d.no_affect, sortIndex: 3 }
            ]
          };
        });
        this.poData = refactor;
      }
    );
  }

}
