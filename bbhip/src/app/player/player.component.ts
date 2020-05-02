import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private playerSrv: PlayerService,  private router: Router) {
  }

  ngOnInit(): void {
    this.player = this.playerSrv.selectedPlayer;
  }

}
