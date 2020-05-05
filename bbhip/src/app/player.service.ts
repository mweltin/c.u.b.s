import { Injectable } from '@angular/core';
import { Player } from './player';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Team } from './team';
import { PitchOutcome } from './pitchOutcome';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private playerListUrl = 'cgi/get_player_list.py';
  private playerUrl = 'cgi/get_player.py';
  private rosterUrl = 'cgi/get_players_by_team.py';
  private pichOutcomeUrl =  'cgi/get_pitch_outcome_by_player.py';
  public selectedPlayer: Player;

  // Observable Team sources
  private selectedPlayerSource = new Subject<Player>();
  // Observable team streams (this is what consumers of the service subscribe to)
  palyerChangeAccouncement = this.selectedPlayerSource.asObservable();
  // Publish the fact that the selected team has changed.
  announcePlayerChange(dPlyaer: Player) {
    this.selectedPlayerSource.next(dPlyaer);
  }

  setSelectePlayer(inPlyaer: Player): void {
    this.selectedPlayer = inPlyaer;
    this.announcePlayerChange(inPlyaer);
  }

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

  getPitchOutcomeByPlayer(player: Player): Observable<any[]> {
    const url = `${this.pichOutcomeUrl}?player_id=${player.id}`;
    return this.http.get<any[]>(url);
  }
  
}
