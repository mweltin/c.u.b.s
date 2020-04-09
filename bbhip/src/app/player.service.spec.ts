import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import { PlayerService } from './player.service';
import { Player } from './player';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
	imports: [HttpClientModule],
	providers: [PlayerService]
    });
    service = TestBed.inject(PlayerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve a list of all mlb players', () => {
    const test_players: Player[] = [{
  	 player_id: 10,
  	 id: 'alberta103',
  	 last: 'Almora',
  	 first: 'Albert',
  	 play_debut: new Date(3-1-2016), 
  	 mgr_debut: null,
  	 coach_debut: null,
  	 ump_debut: null
     }];
      service.getPlayerList().subscribe(posts => {
    	expect(posts.length).toBe(1);
    	expect(posts).toEqual(test_players);
      });
     const request = httpMock.expectOne( '/cgi/get_player_list.py' );
     expect(request.request.method).toBe('GET');
     request.flush(test_players);
  });
});
