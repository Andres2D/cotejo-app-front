import { Profile } from "src/app/interfaces/profile.interface";

export const playerMock: Profile = {
    ok: true,
    msg: "Get full player",
    player: {
        _id: "617eb8fb9e449d570558b18f",
        email: "salah@mail.com",
        nickname: "Salah",
        name: "Mohamed Salah",
        number: 8,
        status: "on fire"
    },
    rating: {
        _id: "617ec587ba8a2c4cfa730b3f",
        overall: 50,
        peace: 50,
        shooting: 50,
        passing: 50,
        dribbling: 50,
        defense: 50,
        physical: 50,
        player: "617eb8fb9e449d570558b18f"
    }
}
