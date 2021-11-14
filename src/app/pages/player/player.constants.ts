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
        content: [
            {
                query: 'NoHair',
                label: 'Zidane'
            },
            {
                query: 'LongHairCurly',
                label: 'Maradona'
            },
            {
                query: 'LongHairDreads',
                label: 'Rastas'
            },
            {
                query: 'LongHairFro',
                label: 'Fellaini'
            },
            {
                query: 'LongHairFroBand',
                label: 'Sané'
            },
            {
                query: 'ShortHairDreads01',
                label: 'Vinicius JR'
            },
            {
                query: 'ShortHairDreads02',
                label: 'Arnold'
            },
            {
                query: 'ShortHairFrizzle',
                label: 'Falcao'
            },
            {
                query: 'ShortHairShortCurly',
                label: 'Pulisic'
            },
            {
                query: 'ShortHairShortFlat',
                label: 'Lampard'
            },
            {
                query: 'ShortHairShortRound',
                label: 'Son'
            },
            {
                query: 'ShortHairShortWaved',
                label: 'Aguero'
            },
            {
                query: 'ShortHairSides',
                label: 'Legend'
            },
            {
                query: 'ShortHairTheCaesar',
                label: 'Mbappé'
            },
            {
                query: 'ShortHairTheCaesarSidePart',
                label: 'Hazard'
            }
        ]
    },
    {
        title: 'Accessories',
        content: []
    },
    {
        title: 'Hair color',
        content: []
    },
    {
        title: 'Facial hair',
        content: []
    },
    {
        title: 'Oufit',
        content: []
    },
    {
        title: 'Oufit color',
        content: []
    },
    {
        title: 'Eyes',
        content: []
    },
    {
        title: 'Eyesbrow',
        content: []
    },
    {
        title: 'Mouth',
        content: []
    },
    {
        title: 'Skin',
        content: []
    }
];
