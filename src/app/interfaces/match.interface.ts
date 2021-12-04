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

export interface TeamBasic {
    _id: string;
    name: string;
    formation: string;
    color: string;
}
 