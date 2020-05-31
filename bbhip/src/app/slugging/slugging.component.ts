import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-slugging',
  templateUrl: './slugging.component.html',
  styleUrls: ['./slugging.component.less']
})
export class SluggingComponent implements OnInit {

  poData: any;

  constructor(
    private playerSrv: PlayerService
  ) { }

  ngOnInit(): void {

    this.playerSrv.getSluggingByPlayer(this.playerSrv.selectedPlayer).subscribe(
      (res) => {
        const refactor = res.map( (d) => {
          return {
            meta: {
              year: d.year,
              total: d.slg.toFixed(3),
	      hits: d.hits,
	      at_bats: d.at_bats
            },
            data: [
              { label: 'Singles ' + d.singles, value: d.singles, sortIndex: 0 },
              { label: 'Doubles ' + d.doubles, value: d.doubles, sortIndex: 1 },
              { label: 'Triples ' + d.triples, value: d.triples, sortIndex: 1 },
              { label: 'Homers ' + d.homers, value: d.homers, sortIndex: 1 }
            ]
          };
        });
        this.poData = refactor;
      }
    );
  }

}
