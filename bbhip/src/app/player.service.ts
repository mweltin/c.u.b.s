import { Injectable } from '@angular/core';
import { Player } from './player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private playerListUrl = 'cgi/get_player_list.py';
  private playerUrl = 'cgi/get_player.py';
  private rosterUrl = 'cgi/get_players_by_team.py';

  constructor(private http: HttpClient) { }

  getPlayerList(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerListUrl);
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.playerUrl}?player_id=${id}`;
    return this.http.get<Player>(url);
  }

  getPlayersByTeam(team: Team): Observable<Player[]> {
    const url = `${this.rosterUrl}?team_id=${team.abbrev}`;
    return this.http.get<Player[]>(url);
  }
}
