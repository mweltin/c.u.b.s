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
  ) { 
    teamSrv.teamChangeAccouncement.subscribe(
      res => {
        this.selectedTeam  = res;
    });
    playerSrv.palyerChangeAccouncement.subscribe(
      res => {
        this.selectedPlayer = res;
    });
  }

  ngOnInit(): void {
  }

  unsetPlayer(): void{
    this.playerSrv.setSelectePlayer(null);
  }

  unsetTeam(): void{
    this.teamSrv.setActiveTeam(null);
  }

}
