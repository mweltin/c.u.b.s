import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { TeamService } from '../team.service';
import { Player } from '../player';
import { Team } from '../team';
import { TeamFilterInterface } from '../teamFilter';
import { NavService } from '../nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  public selectedTeam: Team;
  public selectedPlayer: Player;
  public dropDownText: string;
  public currentFilter: TeamFilterInterface;

  constructor(
    public playerSrv: PlayerService,
    public teamSrv: TeamService,
    public navSrv: NavService,
    public router: Router
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
    this.dropDownText = 'Filter Teams';
  }

  unsetPlayer(): void{
    this.playerSrv.setSelectePlayer(null);
  }

  unsetTeam(): void{
    this.teamSrv.setActiveTeam(null);
    this.router.navigate(['/teams'] );
    this.setFilter( this.currentFilter );
  }

  setFilter( filter: TeamFilterInterface ): void {
    if ( !filter) {
      this.dropDownText = 'Filter Teams';
    } else {
      this.currentFilter = filter;
      this.dropDownText = filter.league;
      this.dropDownText  = filter.division ? this.dropDownText + ' - ' + filter.division : this.dropDownText;
    }
    this.navSrv.announceFilterChange(filter);
  }
}
