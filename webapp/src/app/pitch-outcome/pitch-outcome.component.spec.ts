import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PitchOutcomeComponent } from './pitch-outcome.component';
import { PlayerService } from '../player.service';
import {  of } from 'rxjs';


describe('PitchOutcomeComponent', () => {
  let component: PitchOutcomeComponent;
  let fixture: ComponentFixture<PitchOutcomeComponent>;
  const testPlayerData = {
    player_id: 10758,
    id: 'cairm001',
    last: 'Cairo',
    first: 'Miguel',
    play_debut: new Date('1996-04-17'),
    mgr_debut: null,
    coach_debut: null,
    ump_debut: null
  };
  const pitchOutcomeData = [
    {
      player_id: 'bryak001',
      year: 2015.0,
      balls: 1081,
      strikes: 1123,
      in_play: 365,
      no_affect: 156,
      total: 2725
    }];

  const playerSrv = jasmine.createSpyObj('PlayerService', ['getPitchOutcomeByPlayer', 'selectedPlayer']);
  playerSrv.getPitchOutcomeByPlayer.and.returnValue(of(pitchOutcomeData));
  playerSrv.selectedPlayer.and.returnValue(of(testPlayerData));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PitchOutcomeComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers:    [
        { provide: PlayerService, useValue: playerSrv }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
