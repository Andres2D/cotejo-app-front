
export const playerPositionSelect = [
    {
        key: 3,
        label: '3 vs 3'
    },
    {
        key: 4,
        label: '4 vs 4'
    },
    {
        key: 5,
        label: '5 vs 5'
    },
    {
        key: 6,
        label: '6 vs 6'
    },
    {
        key: 7,
        label: '7 vs 7'
    },
    {
        key: 8,
        label: '8 vs 8'
    },
    {
        key: 9,
        label: '9 vs 9'
    },
    {
        key: 10,
        label: '10 vs 10'
    },
    {
        key: 11,
        label: '11 vs 11'
    }
]

export const threeTeam: string[] = [
    'gk',
    'lm',
    'rm'
];

export const fourTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf'
];

export const fiveTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf'
];

export const sixTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf',
    'cam'
];

export const sevenTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf',
    'cam',
    'cm'
];

export const eightTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf',
    'cam',
    'cm',
    'cmd'
];

export const nineTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf',
    'cam',
    'cm',
    'cmd',
    'cf',
];

export const tenTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf',
    'cam',
    'cm',
    'cf',
    'lw',
    'rw'
];

export const elevenTeam: string[] = [
    'gk',
    'lb',
    'rb',
    'lf',
    'rf',
    'cam',
    'cm',
    'cf',
    'lw',
    'rw',
    'st'
];

export const playersPositionsMap: {[id: number]: {[id: string]: any}} = {
    3: {
        t: 'triangle-3',
        s: 'square-3',
        labels: {
            t: '1-1-1',
            s: '1-2'
        }
    },
    4: {
        t: 'triangle-4',
        s: 'square-4',
        f: 'forward-4',
        labels: {
            t: '1-1-2',
            s: '1-2-1',
            f: '1-3'
        }
    },
    5: {
        t: 'triangle-5',
        s: 'square-5',
        f: 'forward-5',
        labels: {
            t: '1-2-1',
            s: '2-2',
            f: '1-3'
        }
    },
    6: {
        t: 'triangle-6',
        s: 'square-6',
        f: 'forward-6',
        labels: {
            t: '2-2-1',
            s: '2-1-2',
            f: '3-1-1',
        }
    },
    7: {
        t: 'triangle-7',
        s: 'square-7',
        f: 'forward-7',
        labels: {
            t: '3-1-2',
            s: '3-2-1',
            f: '1-3-3',
        }
    },
    8: {
        t: 'triangle-8',
        s: 'square-8',
        f: 'forward-8',
        labels: {
            t: '3-1-3',
            s: '3-2-2',
            f: '3-3-1',
        }
    },
    9: {
        t: 'triangle-9',
        s: 'square-9',
        f: 'forward-9',
        labels: {
            t: '3-2-3',
            s: '3-3-2',
            f: '2-3-3',
        }
    },
    10: {
        t: 'triangle-10',
        s: 'square-10',
        f: 'forward-10',
        labels: {
            t: '4-4-1',
            s: '3-4-2',
            f: '4-3-2',
        }
    },
    11: {
        t: 'triangle-11',
        s: 'square-11',
        f: 'forward-11',
        labels: {
            t: '4-4-2',
            s: '4-3-3',
            f: '4-2-4',
        }
    }
}
