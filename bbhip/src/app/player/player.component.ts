import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})

@Injectable({
  providedIn: 'root'
})

export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
