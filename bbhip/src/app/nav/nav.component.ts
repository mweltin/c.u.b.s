import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service.ts';
import { TeamService } from '../team.service.ts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  constructor(
    public playerSrv: PlayerServcie,
    public teamSrv: TeamService
  ) { }

  ngOnInit(): void {
    
  }

}
