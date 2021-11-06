import { Menu } from "src/app/interfaces/menu.interface";

export const menuItems: Menu[] = [
    {
        label: 'Profile',
        route: 'player',
        type: 'default'
    },
    {
        label: 'Match',
        route: 'match',
        type: 'default'
    },
    {
        label: 'Logout',
        route: 'login',
        type: 'danger'
    }
]
