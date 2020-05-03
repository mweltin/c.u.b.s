import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { TeamService } from '../team.service';
import { Player } from '../player';
import { Team } from '../team';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  public selectedTeam: Team;
  public selectedPlayer: Player;

  constructor(
    public playerSrv: PlayerService,
    public teamSrv: TeamService
  ) { }

  ngOnInit(): void {
    this.selectedPlayer = this.playerSrv.selectedPlayer;
    this.selectedTeam = this.teamSrv.selectedTeam;
  }

  unsetPlayer(): void{
    this.playerSrv.setSelectePlayer(null);
  }
}
