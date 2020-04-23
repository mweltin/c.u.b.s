import { TeamFilter, TeamFilterInterface } from './team.pipe';
import { Team } from '../team';


describe('TeamFilterPipe', () => {
    // This pipe is a pure, stateless function so no need for BeforeEach
    const pipe = new TeamFilter();
    const data: Team [] = [
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
            name: 'Mets',
            logo_url: 'http://mets.com',
            logo_text: 'mets logo',
            league: 'National league',
            division: 'east'
        },
        {
            team_id: 12,
            name: 'Royals',
            logo_url: 'http://royals.com',
            logo_text: 'royals logo',
            league: 'American league',
            division: 'central'
          },
        {
          team_id: 13,
          name: 'Red Sox',
          logo_url: 'http://redsox.com',
          logo_text: 'red sox logo',
          league: 'American league',
          division: 'east'
        }
      ];

    it('should be able to filter out only National league teams', () => {

        const testFiler: TeamFilterInterface = {
            league: 'National league'
        };

        const result = pipe.transform(data, testFiler);

        expect(result.length).toBe(2);
        expect(result[0].league).toBe('National league');
        expect(result[1].league).toBe('National league');
    });

    it('should be able to filter out only American league teams', () => {

        const testFiler: TeamFilterInterface = {
            league: 'American league'
        };

        const result = pipe.transform(data, testFiler);

        expect(result.length).toBe(2);
        expect(result[0].league).toBe('American league');
        expect(result[1].league).toBe('American league');
    });

    it('should be able to filter by league and divsion', () => {

        const testFiler: TeamFilterInterface = {
            league: 'American league',
            division: 'east'
        };

        const result = pipe.transform(data, testFiler);

        expect(result.length).toBe(1);
        expect(result[0]).toEqual(data[3]);
    });

    it('should be case insensitive', () => {

        const testFiler: TeamFilterInterface = {
            league: 'AMerIcan LeaGuE',
            division: 'EaSt'
        };

        const result = pipe.transform(data, testFiler);

        expect(result.length).toBe(1);
        expect(result[0]).toEqual(data[3]);
    });
  });
