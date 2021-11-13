export interface Rating {
    _id: string,
    overall: number,
    peace: number,
    shooting: number,
    passing: number,
    dribbling: number,
    defense: number,
    physical: number,
    player: string
}

export interface RatingUpdate {
    ok: boolean;
    ratingDB: Rating;
}

export interface RatingReq {
    overall: number,
    peace: number,
    shooting: number,
    passing: number,
    dribbling: number,
    defense: number,
    physical: number,
}
