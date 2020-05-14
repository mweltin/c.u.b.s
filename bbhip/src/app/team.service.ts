import { Injectable } from '@angular/core';
import { Team } from './team';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

    public selectedTeam: Team;
    private teamUrl = 'cgi/get_teams.py';

    // Observable Team sources
    private selectedTeamSource = new Subject<Team>();
    // Observable team streams (this is what consumers of the service subscribe to)
    teamChangeAccouncement = this.selectedTeamSource.asObservable();
    // Publish the fact that the selected team has changed.
    announceTeamChange(pTeam: Team) {
      this.selectedTeamSource.next(pTeam);
    }

    setActiveTeam(inTeam: Team): void {
      this.selectedTeam = inTeam;
      this.announceTeamChange(inTeam);
    }

    constructor(private http: HttpClient) {}

    getTeams(): Observable < Team[] > {
      return this.http.get<Team[]>(this.teamUrl);
    }
}
