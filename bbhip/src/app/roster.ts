import { Team } from './team';
import { Player } from './player';

export interface Roster {
    team: Team;
    players: Player[];
};