import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../team';
import { TeamFilterInterface } from '../teamFilter';


@Pipe({
  name: 'teamFilter',
})

export class TeamFilter implements PipeTransform {
  transform(items: Team[], value: TeamFilterInterface): Team[] {
    if (!value ) { return items; }
    return items.filter(
      singleItem => {
        if (!value.division) {
          return value.league.toLowerCase() === singleItem.league.toLowerCase();
        } else {
          return (value.league.toLowerCase() === singleItem.league.toLowerCase())
            && (value.division.toLowerCase() === singleItem.division.toLowerCase());
        }
        return false;
      }
    );
  }
}
