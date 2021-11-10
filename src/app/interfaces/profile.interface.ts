import { Player } from "./player.interface";
import { Rating } from "./rating.interface";

export interface Profile {
    ok: boolean,
    msg: string,
    player: Player,
    rating: Rating
}
