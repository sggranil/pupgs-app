import NavbarLinks from "@/components/organisms/NavbarLinks";

const Navbar = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="w-full">
            <div className="flex md:justify-evenly justify-between items-center w-full shadow-md z-50 bg-white px-4">
                <div className="flex items-center">
                    <img
                        src="/pup.png"
                        alt="Logo"
                        className="w-10 h-10 mr-3"
                    />
                    <div className="flex flex-col space-y-0.05">
                        <span className="hidden md:block text-xl font-bold text-content-primary">PUP</span>
                        <span className="hidden md:block text-sm font-normal text-content-secondary whitespace-nowrap">Graduate Thesis Monitoring</span>
                    </div>
                </div>

                <NavbarLinks />
            </div>

            <main className="flex flex-col items-center w-full bg-app-background mt-2">
                {children}
            </main>
        </div>
    )
}

export default Navbar;