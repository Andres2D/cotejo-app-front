import { Menu } from "src/app/interfaces/menu.interface";

export const menuItems: Menu[] = [
    {
        label: 'Profile',
        route: 'cotejo/player',
        type: 'default'
    },
    {
        label: 'Match',
        route: 'cotejo/match',
        type: 'default'
    },
    {
        label: 'Logout',
        route: 'login',
        type: 'danger'
    }
]
