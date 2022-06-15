import { PlayerForm } from '../../interfaces/rating-form.interface';

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
];

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
            },
            {
                query: 'LongHairStraight2',
                label: 'Alex Morgan'
            },
            {
                query: 'LongHairBob',
                label: 'Saki Kumagai'
            },
            {
                query: 'LongHairFrida',
                label: 'Frida Kahlo'
            },
            {
                query: 'LongHairCurvy',
                label: 'Deyna Castellanos'
            }
        ]
    },
    {
        title: 'Accessories',
        content: [
            {
                query: 'Blank',
                label: 'None'
            },
            {
                query: 'Round',
                label: 'Potter'
            },
            {
                query: 'Wayfarers',
                label: 'Relax'
            }
        ]
    },
    {
        title: 'Hair color',
        content: [
            {
                query: 'Black',
                label: 'Black'
            },
            {
                query: 'BlondeGolden',
                label: 'Blonde'
            },
            {
                query: 'Brown',
                label: 'Brown'
            },
            {
                query: 'PastelPink',
                label: 'Pink'
            },
            {
                query: 'Blue',
                label: 'Blue'
            },
            {
                query: 'Red',
                label: 'Red'
            },
            {
                query: 'SilverGray',
                label: 'Gray'
            },
        ]
    },
    {
        title: 'Facial hair',
        content: [
            {
                query: 'Blank',
                label: 'Clean'
            },
            {
                query: 'BeardLight',
                label: 'Beard'
            },
            {
                query: 'BeardMedium',
                label: 'Beard medium'
            },
            {
                query: 'BeardMajestic',
                label: 'Beard long'
            },
            {
                query: 'MoustacheFancy',
                label: 'Moustache'
            },
            {
                query: 'MoustacheMagnum',
                label: 'Moustache short'
            },
        ]
    },
    {
        title: 'Oufit',
        content: [
            {
                query: 'CollarSweater',
                label: 'Sweater'
            },
            {
                query: 'GraphicShirt',
                label: 'Skeleton shirt'
            },
            {
                query: 'Hoodie',
                label: 'Hoodie'
            },
            {
                query: 'ShirtCrewNeck',
                label: 'Basic shirt'
            },
        ]
    },
    {
        title: 'Team',
        content: [
            {
                query: 'PastelBlue',
                label: 'Manchester city'
            },
            {
                query: 'Blue02',
                label: 'Chelsea'
            },
            {
                query: 'Gray01',
                label: 'Juventus'
            },
            {
                query: 'Gray02',
                label: 'New casttle'
            },
            {
                query: 'Red',
                label: 'Liverpool'
            },
            {
                query: 'White',
                label: 'ReaL Madrid'
            },
        ]
    },
    {
        title: 'Eyes',
        content: [
            {
                query: 'Close',
                label: 'Relax'
            },
            {
                query: 'Cry',
                label: 'Cry'
            },
            {
                query: 'Default',
                label: 'Normal'
            },
            {
                query: 'Dizzy',
                label: 'Death'
            },
            {
                query: 'EyeRoll',
                label: 'Eye Roll'
            },
            {
                query: 'Happy',
                label: 'Happy'
            },
            {
                query: 'Side',
                label: 'Side'
            },
            {
                query: 'Squint',
                label: 'Squint'
            },
            {
                query: 'Surprised',
                label: 'Big one'
            },
            {
                query: 'Wink',
                label: 'Wink'
            },
        ]
    },
    {
        title: 'Eyesbrow',
        content: [
            {
                query: 'AngryNatural',
                label: 'Evil'
            },
            {
                query: 'Default',
                label: 'Normal'
            },
            {
                query: 'FlatNatural',
                label: 'Big'
            },
            {
                query: 'RaisedExcited',
                label: 'Raised'
            },
            {
                query: 'SadConcernedNatural',
                label: 'Sad'
            },
            {
                query: 'UpDown',
                label: 'Up and down'
            },
            {
                query: 'UnibrowNatural',
                label: 'Unibrow'
            },
        ]
    },
    {
        title: 'Mouth',
        content: [
            {
                query: 'Default',
                label: 'Default'
            },
            {
                query: 'Concerned',
                label: 'Concerned'
            },
            {
                query: 'Disbelief',
                label: 'Disbelief'
            },
            {
                query: 'Eating',
                label: 'Eating'
            },
            {
                query: 'Grimace',
                label: 'Weird'
            },
            {
                query: 'Sad',
                label: 'Sad'
            },
            {
                query: 'ScreamOpen',
                label: 'Scream'
            },
            {
                query: 'Serious',
                label: 'Serious'
            },
            {
                query: 'Smile',
                label: 'Smile'
            },
            {
                query: 'Tongue',
                label: 'Tongue'
            },
            {
                query: 'Twinkle',
                label: 'Twinkle'
            },
            {
                query: 'Vomit',
                label: 'Vomit'
            },
        ]
    },
    {
        title: 'Skin',
        content: [
            {
                query: 'Pale',
                label: 'Pale'
            },
            {
                query: 'Light',
                label: 'Light'
            },
            {
                query: 'Brown',
                label: 'Brown'
            },
            {
                query: 'DarkBrown',
                label: 'Dark Brown'
            },
            {
                query: 'Black',
                label: 'Black'
            },
            {
                query: 'Yellow',
                label: 'Yellow'
            },
        ]
    }
];

export const paletteColors: string[] = [
    '#B71C1C',
    '#880E4F',
    '#4A148C',
    '#311B92',
    '#1A237E',
    '#0D47A1',
    '#01579B',
    '#006064',
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#EF9A9A',
    '#F48FB1',
    '#CE93D8',
    '#B39DDB',
    '#9FA8DA',
    '#90CAF9',
    '#81D4FA',
    '#80DEEA',
    '#004D40',
    '#1B5E20',
    '#33691E',
    '#827717',
    '#F57F17',
    '#FF6F00',
    '#E65100',
    '#BF360C',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#80CBC4',
    '#A5D6A7',
    '#C5E1A5',
    '#E6EE9C',
    '#FFF59D',
    '#FFE082',
    '#FFCC80',
    '#FFAB91',
    '#3E2723',
    '#212121',
    '#263238',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#BCAAA4',
    '#EEEEEE',
    '#B0BEC5'
];
