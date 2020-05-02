import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { Roster } from '../roster';
import { Player } from '../player';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.less']
})
export class RosterComponent implements OnInit {

  public roster: Roster;

  constructor(
    private playerSrv: PlayerService,
    private teamSrv: TeamService
  ) { }

  ngOnInit(): void {
    this.roster = {
      team: {
        team_id: 0,
        name: 'unknown',
        logo_url: 'http:example.com',
        logo_text: 'logo missing',
        league: 'nonee',
        division: 'none',
        abbrev: 'abrv',
      },
      players: []
    };

    this.roster.team = this.teamSrv.activeTeam;
    this.getRoster(this.roster.team);
  }

  getRoster( team: Team): void {
    this.playerSrv.getPlayersByTeam(team).subscribe(res => {
      res.sort((a, b) => a.last.localeCompare(b.last));
      this.roster.players = res;
    });
  }

  setPlayer(player: Player) {
    this.playerSrv.setSelectePlayer(player);
  }

}
