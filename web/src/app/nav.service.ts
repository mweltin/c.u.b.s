import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TeamFilterInterface } from './teamFilter';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public currentFilter: TeamFilterInterface;
  constructor() { }

  // Observable
  private filterUpdate = new Subject<TeamFilterInterface>();

  // Observable team streams (this is what consumers of the service subscribe to)
  filterChangeAccouncement = this.filterUpdate.asObservable();

  // Publish the fact that the selected team has changed.
  announceFilterChange(filter: TeamFilterInterface) {
    this.filterUpdate.next(filter);
    this.currentFilter = filter;
  }

}
