import { MatchPlayer } from "./player.interface";

export interface Match {
    ok: boolean;
    matchs: MatchDetails[];
}

export interface MatchDetails {
    _id: string;
    date: string;
    location: string;
    home_team: TeamBasic;
    away_team: TeamBasic;
}

export interface MatchDB {
    _id: string;
    date: string;
    location: string;
    home_team: string;
    away_team: string;
}

export interface TeamBasic {
    _id: string;
    name: string;
    formation: string;
    color: string;
}

export interface FullMatch extends Match {
    home: MatchPlayer[];
    away: MatchPlayer[];
}
 