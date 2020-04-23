import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamComponent } from './team.component';
import { TeamService } from '../team.service';
import { Team } from '../team';
import {  of } from 'rxjs';
import { TeamFilter, TeamFilterInterface } from './team.pipe';


describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    const testData: Team[] = [
      {
        team_id: 10,
        name: 'Cubs',
        logo_url: 'http://cubs.com',
        logo_text: 'cubs logo',
        league: 'National league',
        division: 'central'
      },
      {
        team_id: 11,
        name: 'Red Sox',
        logo_url: 'http://redsox.com',
        logo_text: 'red sox logo',
        league: 'American league',
        division: 'east'
      }
    ];
    const teamSrv = jasmine.createSpyObj('TeamService', ['getTeams']);
    teamSrv.getTeams.and.returnValue( of(testData) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ TeamComponent, TeamFilter ],
      providers:    [
        { provide: TeamService, useValue: teamSrv }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set filterBy property to null by default', () => {
    expect(component.filterBy).toEqual(null);
  });

  describe('setFilter method', () => {
    it('should set the filterBy property', () => {
      const temp: TeamFilterInterface = {
        league: 'Test league',
        division: 'testDivision'
      };

      component.setFilter(temp);

      expect(component.filterBy).toEqual(temp);
    });
  });


  describe('getTeams method', () => {
    it('shoudl be defined', () => {
      expect(component.getTeams).toBeDefined();
    });

    it('should get an array of Teams', () => {
      const testData: Team[] = [
        {
          team_id: 10,
          name: 'Cubs',
          logo_url: 'http://cubs.com',
          logo_text: 'cubs logo',
          league: 'National league',
          division: 'central'
        },
        {
          team_id: 11,
          name: 'Red Sox',
          logo_url: 'http://redsox.com',
          logo_text: 'red sox logo',
          league: 'American league',
          division: 'east'
        }
      ];
      const teamSrv = jasmine.createSpyObj('TeamService', ['getTeams']);
      teamSrv.getTeams.and.returnValue( of(testData) )

      component.teams = [];
      component.getTeams();
      expect(component.teams).toEqual(testData);
    });

  });

});
