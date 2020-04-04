import { Component } from '@angular/core';
import { Player } from './player';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {

  title = 'bbhip';
  players: Player[];

  constructor(
    private PlayerService: PlayerService,
  ) {
  }


  ngOnInit(): void {
    this.PlayerService.getPlayerList().subscribe(res => {
      this.players = res;
    });
  }

}
