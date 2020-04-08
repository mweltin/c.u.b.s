import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})

@Injectable({
  providedIn: 'root'
})

export class PlayerComponent implements OnInit {

  player_id: number;

  constructor(private actRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.player_id = this.actRoute.snapshot.params.player_id;
    // components are only initialized once. This event listener allows us to stay on
    // the player view but refresh data each time we select a new player
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.fetchData();
    });
  }

  fetchData(): void {
    this.player_id = this.actRoute.snapshot.params.player_id;
  }

}
