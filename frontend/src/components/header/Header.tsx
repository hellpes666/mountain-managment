import { CableCar } from 'lucide-react';
import { NAV_ITEMS } from './navItems';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="separate-bottom flex w-full items-center justify-between">
            <Link to="/" aria-label="На главную страницу" className="focus-element">
                <CableCar color="#FFFFFF" size={32} />
            </Link>

            <nav className="flex items-center gap-3">
                {NAV_ITEMS.map(item => (
                    <Link
                        to={`/${item.link}`}
                        className="focus-element font-bold tracking-wide text-white uppercase"
                    >
                        {item.navItem}
                    </Link>
                ))}
            </nav>
        </header>
    );
};
