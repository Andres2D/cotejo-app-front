import { PlayerForm } from "src/app/interfaces/rating-form.interface";

export const ratingForm: PlayerForm[] = [
    {
        label: 'Defense',
        control: 'defense'
    },
    {
        label: 'Passing',
        control: 'passing'
    },
    {
        label: 'Physical',
        control: 'physical'
    },
    {
        label: 'Dribbling',
        control: 'dribbling'
    },
    {
        label: 'Peace',
        control: 'peace'
    },
    {
        label: 'Shooting',
        control: 'shooting'
    }
];

export const infoForm: PlayerForm[] = [
    {
        label: 'Name',
        control: 'name'
    },
    {
        label: 'Nickname',
        control: 'nickname'
    },
    {
        label: 'Number',
        control: 'number'
    }
]
