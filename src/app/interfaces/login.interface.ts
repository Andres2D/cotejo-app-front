import { Player } from "./player.interface";

export interface LoginResponse {
    ok: boolean;
    player: Player;
    token: string;
    msg: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
