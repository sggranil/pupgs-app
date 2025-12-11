import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuDropdown from "@/components/organisms/MenuDropdown";

interface NavbarLinksProps {
  userId: number;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ userId }) => {
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

      <MenuDropdown userId={userId} />
    </div>
  );
};

export default NavbarLinks;
