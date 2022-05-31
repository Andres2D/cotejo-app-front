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

export interface CreateTeamRequest {
    name: string;
    formation: string;
    color: string;
}

export interface ReplacePlayerReq {
  player_to_replace: string;
  new_player: string;
  team_id: string;
}
