import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-on-base-percentage',
  templateUrl: './on-base-percentage.component.html',
  styleUrls: ['./on-base-percentage.component.less']
})
export class OnBasePercentageComponent implements OnInit {

  poData: any;

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {

    this.playerSrv.getOnBasePercentageByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        const refactor = res.map( (d) => {
          return {
            meta: {
              year: d.year,
              total: d.obp.toFixed(3)
	    },
            data: [
              { label: 'Hits ' + d.hit, value: d.hit, sortIndex: 0 },
              { label: 'Walks ' + d.walk, value: d.walk, sortIndex: 0 },
              { label: 'Sac fly ' + d.sacrifice_fly, value: d.sacrifice_fly, sortIndex: 0 },
              { label: 'Hit by pitch ' + d.hit_by_pitch, value: d.hit_by_pitch, sortIndex: 1 }
            ]
          };
        });
        this.poData = refactor;
      }
    );
  }

}
