import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PlayerService } from './player.service';
import { Player } from './player';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [PlayerService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlayerService);
  });

it('can test HttpClient.get', () => {
    const testData: Player[] = [{
  	 player_id: 10,
  	 id: 'alberta103',
  	 last: 'Almora',
  	 first: 'Albert',
  	 play_debut: new Date(3-1-2016), 
  	 mgr_debut: null,
  	 coach_debut: null,
  	 ump_debut: null
   }];

  service.getPlayerList().subscribe(post => {
  	expect(post.length).toBe(1);
  	expect(post).toEqual(testData);
  });

  const req = httpTestingController.expectOne('cgi/get_player_list.py');

  expect(req.request.method).toEqual('GET');

  // Respond with mock data, causing Observable to resolve.
  // Subscribe callback asserts that correct data was returned.
  req.flush(testData);

  httpTestingController.verify();
});

afterEach(() => {
  // After every test, assert that there are no more pending requests.
  httpTestingController.verify();
});

});
