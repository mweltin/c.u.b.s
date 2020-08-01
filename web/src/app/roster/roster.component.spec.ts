import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamService } from '../team.service';
import { PlayerService } from '../player.service';
import {  of } from 'rxjs';
import { RosterComponent } from './roster.component';
import { TeamComponent } from '../team/team.component';
import { Team } from '../team';
import { Player } from '../player';

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;
  const testData: Team[] = [
    {
      team_id: 10,
      name: 'Cubs',
      logo_url: 'http://cubs.com',
      logo_text: 'cubs logo',
      league: 'National league',
      division: 'central',
      abbrev: 'CHA'
    }
  ];

  const testPlayerData: Player[] = [
    {
      player_id: 10758,
      id: 'cairm001',
      last: 'Cairo',
      first: 'Miguel',
      play_debut: new Date('1996-04-17'),
      mgr_debut: null,
      coach_debut: null,
      ump_debut: null
    } ];

  const teamSrv = jasmine.createSpyObj('TeamService', ['selectedTeam']);
  teamSrv.selectedTeam.and.returnValue(of(testData[0]));

  const playerSrv = jasmine.createSpyObj('PlayerService', ['getPlayersByTeam']);
  playerSrv.getPlayersByTeam.and.returnValue(of(testPlayerData));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers:    [
        { provide: TeamService, useValue: teamSrv },
        { provide: PlayerService, useValue: playerSrv }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
