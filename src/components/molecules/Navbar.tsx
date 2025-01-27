
interface NavbarProps {
    setIsOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsOpen }) => {
    return (
        <div className="bg-bgPrimary text-white h-16 flex items-center px-4 md:hidden">
            <button
                className="text-white focus:outline-none"
                onClick={() => setIsOpen(true)}
            >
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            <span className="ml-4 text-lg font-semibold">Dashboard</span>
        </div>
    )
}

export default Navbar