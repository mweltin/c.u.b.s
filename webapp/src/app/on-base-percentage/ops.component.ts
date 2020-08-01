import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-ops',
  templateUrl: './ops.component.html',
  styleUrls: ['./ops.component.less']
})
export class OpsComponent implements OnInit {

  poData: any;

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {

    this.playerSrv.getOPSByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        const refactor = res.map( (d) => {
          return {
            meta: {
              year: d.year,
              total: d.ba.toFixed(3)
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
