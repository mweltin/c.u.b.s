import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-batting-averge',
  templateUrl: './batting-averge.component.html',
  styleUrls: ['./batting-averge.component.less']
})
export class BattingAvergeComponent implements OnInit {

  poData: any;
  baDisplayYear: number;

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
              total: d.ba.toFixed(3)
            },
            data: [
              { label: 'Hits ' + d.hit, value: d.hit, sortIndex: 0 },
              { label: 'At bats ' + d.at_bat, value: d.at_bat, sortIndex: 1 }
            ]
          };
        });
        this.poData = refactor;
      }
    );

    this.playerSrv.displayYearAccouncement.subscribe(
      res => {
      this.baDisplayYear = res;
    });

  }

}
