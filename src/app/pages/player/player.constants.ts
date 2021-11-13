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
        control: 'name',
        type: 'text'
    },
    {
        label: 'Nickname',
        control: 'nickname',
        type: 'text'
    },
    {
        label: 'Number',
        control: 'number',
        type: 'number'
    }
]
