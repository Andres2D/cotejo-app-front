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

export const avatarCustomize = [ 
    {
        title: 'Hair',
        content: 'Hair CONTENT'
    },
    {
        title: 'Accessories',
        content: 'Accessories CONTENT'
    },
    {
        title: 'Hair color',
        content: 'Hair color CONTENT'
    },
    {
        title: 'Facial hair',
        content: 'Facial hair CONTENT'
    },
    {
        title: 'Oufit',
        content: 'Oufit CONTENT'
    },
    {
        title: 'Eyes',
        content: 'Eyes CONTENT'
    },
    {
        title: 'Eyesbrow',
        content: 'Eyesbrow CONTENT'
    },
    {
        title: 'Mouth',
        content: 'Mouth CONTENT'
    },
    {
        title: 'Skin',
        content: 'Skin CONTENT'
    }
];
