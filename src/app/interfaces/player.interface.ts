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
}

