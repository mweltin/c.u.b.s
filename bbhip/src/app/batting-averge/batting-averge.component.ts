import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-batting-averge',
  templateUrl: './batting-averge.component.html',
  styleUrls: ['./batting-averge.component.less']
})
export class BattingAvergeComponent implements OnInit {

  poData: any;

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {

    this.playerSrv.getBattingAverageByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        const refactor = res.map( (d) => {
          return {
            meta: {
              year: d.year,
              total: d.ba
            },
            data: [
              { label: 'hits', value: d.hit, sortIndex: 0 },
              { label: 'at bats', value: d.at_bat, sortIndex: 1 }
            ]
          };
        });
        this.poData = refactor;
      }
    );
  }

}
