import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinksProps {}

const NavbarLinks: React.FC<NavbarLinksProps> = ({}) => {
  const pathname = usePathname();

  const BASE_CLASS = "text-content-secondary";
  const ACTIVE_CLASS =
    "border-b-2 border-brand-primary text-brand-primary font-bold";

  const getLinkClassName = (href: string) => {
    const isActive = pathname.startsWith(href) && href !== "/";
    const classNames = isActive ? `${ACTIVE_CLASS}` : BASE_CLASS;

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
          className={`flex flex-col items-center justify-center hover:text-brand-primary-hover transition-colors px-4 md:py-2 py-3 ${getLinkClassName(
            item.href
          )}`}>
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="hidden md:block text-xs">{item.label}</span>
        </Link>
      ))}
      <button className="flex flex-row items-center justify-center text-content-primary border-l-2 border-gray-200 pl-4">
        <span className="material-symbols-outlined">account_circle</span>
        <span className="material-symbols-rounded text-content-secondary">
          arrow_drop_down
        </span>
      </button>
    </div>
  );
};

export default NavbarLinks;
