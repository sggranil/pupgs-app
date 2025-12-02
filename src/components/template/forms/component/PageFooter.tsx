import React from "react";

const PageFooter: React.FC = () => {
    return (
        <div className="pb-10">
            <div className="flex items-center justify-between px-24">
                <div className="text-start flex-1 py-4">
                    <div className="mb-4">  
                        <p className="m-0 py-[0px] text-xs">PUP A. Mabini Campus, Anonas Street, Sta. Mesa, Manila 1016</p>
                        <p className="m-0 py-[0px] text-xs">Direct Line: 335-1730 | Trunk Line: 335-1787 or 335-1777 local 239</p>
                        <p className="m-0 py-[0px] text-xs">Website: www.pup.edu.ph | Email: cs@pup.edu.ph</p>
                    </div>
                    <h1 className="font-serif text-xl">THE COUNTRY’S 1st <span className="text-[24px]">P</span>OLYTECHNIC<span className="text-[24px]">U</span></h1>
                </div>

                <img src="/pup-footer.jpg" className="w-[245px] h-auto object-contain" alt="Footer Logo" />
            </div>
        </div>
    )
}

export default PageFooter;