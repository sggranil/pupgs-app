import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarLinksProps {

}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ }) => {
    const pathname = usePathname();

    const BASE_CLASS = "flex flex-col items-center justify-center text-content-secondary hover:text-brand-primary-hover transition-colors border-b-2 border-transparent px-4 md:py-2 py-3";
    const ACTIVE_CLASS = "text-red-900 font-bold border-brand-primary hover:text-brand-primary hover:border-brand-primary";

    const getLinkClassName = (href: string) => {
        const isActive = pathname.startsWith(href) && href !== '/';

        const classNames = isActive
            ? `${BASE_CLASS} ${ACTIVE_CLASS}`
            : BASE_CLASS;

        return classNames;
    };

    const navItems = [
        { href: "/thesis", label: "Thesis", icon: "library_books" },
        { href: "/notification", label: "Notification", icon: "notifications" },
    ];

    return (
        <div className="flex items-center">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={getLinkClassName(item.href)}
                >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        
                    <span className="hidden md:block text-xs font-normal">{item.label}</span>
                </Link>
            ))}
            <button className="flex flex-row items-center justify-center text-content-primary px-4 border-l-2 border-gray-200 md:pl-4">
                <span className="material-symbols-outlined">account_circle</span>
                <span className="material-symbols-rounded text-content-secondary">arrow_drop_down</span>
            </button>
        </div>
    );
}

export default NavbarLinks;