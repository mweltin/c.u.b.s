import { Injectable } from '@angular/core';
import { Player } from './player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private playerListUrl = 'cgi/get_player_list.py';
  private playerUrl = 'cgi/get_player.py';

  constructor(private http: HttpClient) { }

  getPlayerList(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerListUrl)
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.playerUrl}/?player_id=${id}`;
    return this.http.get<Player>(url);
  }
}
