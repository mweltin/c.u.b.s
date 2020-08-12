import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { PitchOutcome } from '../pitchOutcome';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})

@Injectable({
  providedIn: 'root'
})

export class PlayerComponent implements OnInit {

  player: Player;
  poData: PitchOutcome[];

  constructor(
    private playerSrv: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.playerSrv.selectedPlayer) {
      this.playerSrv.getPlayer(this.route.snapshot.paramMap.get('player_id')).subscribe(
        (data) => {
          this.player = data[0];
          this.playerSrv.setSelectePlayer(this.player);
        }
      );
    } else {
      this.player = this.playerSrv.selectedPlayer;
    }
  }

}
