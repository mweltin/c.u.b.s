import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Team } from './team';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let httpClient: HttpClientModule;
  let httpTestingController: HttpTestingController;
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService]
    });

    httpClient = TestBed.inject(HttpClientModule);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method getTeams', () => {
    expect(service.getTeams).toBeDefined();
  });

/*   it('should define an api endpoint to get teams from', () =>{
    expect(service.teamUrl).toEqual('cgi/get_teams.py');
  });  */


  describe('getTeams method', () => {

      it('should return a list of Team', () => {
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

        service.getTeams().subscribe(post => {
          expect(post).toEqual(testData);
        });

        const req = httpTestingController.expectOne('cgi/get_teams.py');

        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);

        httpTestingController.verify();
    });
  });
});
