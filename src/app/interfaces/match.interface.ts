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

export interface MatchForm {
    title: string;
    buttonLabel: string;
    control?: string;
}
 
export interface FormCreateMatch {
    home_formation: string;
    home_name:      string;
    home_color:     string;
    away_formation: string;
    away_name:      string;
    away_color:     string;
    home_players:   PlayerId[];
    away_players:   PlayerId[];
}
export interface PlayerId {
    id: string;
}

export interface CreateMatch {
    date: string;
    location: string;
    home_team: string;
    away_team: string;
}
