import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private actRoute: ActivatedRoute) {
    this.player_id = this.actRoute.snapshot.params.player_id;
  }

  ngOnInit(): void {
  }

}
