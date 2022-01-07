export interface Team {
    name: string;
    formation: string;
    color: string;
    _id: string;
}

export interface TeamPlayer {
    position: string;
    isCaptain: boolean;
    player: string;
    team: string;
}
