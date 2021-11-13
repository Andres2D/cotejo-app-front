export interface Player  {
    _id: string;
    email: string;
    nickname: string;
    name: string;
    number: number;
    status: string;
    image?: string;
}

export interface PlayerUpdate {
    ok: boolean;
    playerDB: Player;
}
