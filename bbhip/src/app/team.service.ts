import { Injectable } from '@angular/core';
import { Team } from './team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamUrl = 'cgi/get_teams.py';
  public activeTeam: Team;

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamUrl);
  }

  setActiveTeam( aTeam: Team){
    this.activeTeam = aTeam;
  }

}
