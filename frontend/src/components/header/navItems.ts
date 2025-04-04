export type NavigationItem = 'Leaderboard' | 'Mountains';

interface INavigationItem {
    navItem: NavigationItem;
    link: Lowercase<NavigationItem>;
}

export const NAV_ITEMS: INavigationItem[] = [
    { navItem: 'Leaderboard', link: 'leaderboard' },
    { navItem: 'Mountains', link: 'mountains' },
];
