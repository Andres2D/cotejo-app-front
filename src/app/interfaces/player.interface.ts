export interface Player  {
    _id: string;
    nickname: string;
    name: string;
    number: number;
    status: string;
    email?: string;
    image?: string;
}

export interface PlayerUpdate {
    ok: boolean;
    playerDB: Player;
}

export interface MatchPlayer {
    _id: string;
    position: string;
    isCaptain: boolean;
    player: {
        _id: string;
        nickname: string;
        name: string;
        number: number;
        status: string;
        image: string;
    }
    team: string;
    overall: number;
}

export interface SearchPlayer {
    ok: boolean;
    players: Player[]
}

export interface PostTeamPlayer {
    position: string;
    isCaptain: string;
    player: string;
    team: string;
}

export interface UpdatePlayerTeamRequest {
    player1: string;
    player2: string;
    player1_team: string;
    player2_team: string;
}
