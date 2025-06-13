import React from 'react';


type NavItemProps = {
    label: string;
    children: React.ReactNode; //für svg
};


type SimpleNavItem = {
    label: string;
    icon?: React.ReactNode; // optionales Icon für einzelne Items
};

type simpleNavProps = {
    items: SimpleNavItem[];
    className?: string;


};


function NavItem({ label, children }: NavItemProps) {
    return (
        <li className="flex item-center gap-2 text-green-500 fill-green-500 ">
            {children}
            <span>{label}</span>
        </li>
    );
}

function SimpleNav({ items, className = "" }: simpleNavProps) {
    return (
        <>
            <nav className={`bg-white shadow-sm p-10  ${className}`}>
                <ul className="flex items-center  gap-3.5 mr-6 ml-10">
                    {items.map((items, index) => (
                        <li
                            key={index}
                            className="uppercase flex items-center gap-2 h-11">

                           <span>{items.label}</span> 
                           {items.icon && <span className="flex items-center w-full h-full pl-2 ml-2 border-l border-dashed border-green-500" >{items.icon}</span>}
                            



                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}



export default function Navbar() {
    return (
        <>
            <div className="absolute right-10 top-0 bg-white p-7 rounded shadow-md">
                <img src='src/assets/logo-osmo.png' className="h-31 w-auto bg-white" />
            </div>


            <nav className="bg-[#f3f3f3] shadow-md p-4 flex items-center">

                <ul className="flex items-center ml-15 mr-40 size-1.5">
                    <NavItem label="DE/DE">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-earth-icon lucide-earth">
                            <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" /><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                            <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" /><circle cx="12" cy="12" r="10" />
                        </svg>
                    </NavItem>
                </ul>

                <ul className="flex items-center gap-5 max-w-[60%]">
                    <NavItem label="Konfiguratoren">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" />
                        </svg>
                    </NavItem>

                    <NavItem label="Farbmusterbestellung">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-palette-icon lucide-palette">
                            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /> </svg>
                    </NavItem>

                    <NavItem label="Verbrauchsrechner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calculator-icon lucide-calculator">
                            <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" />
                            <path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />
                        </svg>
                    </NavItem>

                    <NavItem label="Mediathek">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-files-icon lucide-files"><path d="M20 7h-3a2 2 0 0 1-2-2V2" /><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" /><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" /></svg>

                    </NavItem>
                </ul>


            </nav>


            <SimpleNav
                items={[
                    { label: "Holz" },
                    { label: "Farbe" },
                    { label: "Neue Werkstoffe" },
                    { label: "Referenzen" },
                    { label: "Ideengeber" },
                    { label: "Service" },
                    { label: "Händlersuche" },
                    { label: "Osmo",

                        icon: (

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                className="lucide lucide-search-icon lucide-search">
                                <path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />
                            </svg>
                        )

                    }

                ]}
            />


        </>

    );
}


{/*
 () {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">

            <ul className="flex justify-content items-center space-x-40">
                <div className="flex">
                    <li className="flex item-center gap-2 text-green-500 fill-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth">
                            <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" /><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                            <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" /><circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>DE/DE</span>
                    </li>
                </div>
                <div className="flex">
                    <li className="flex item-center gap-2 text-green-500 fill-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" /></svg>
                        <span>Konfiguratoren</span></li>

                    <li className="flex item-center gap-2 text-green-500 fill-green-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette-icon lucide-palette">
                            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /> </svg>
                        <span>Farbmusterbestellung</span>
                    </li>

                    <li className="flex item-center gap-2 text-green-500 fill-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calculator-icon lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>
                        <span>Verbrauchsrechner</span>
                    </li>
                    <li className="flex item-center gap-2 text-green-500 fill-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-files-icon lucide-files"><path d="M20 7h-3a2 2 0 0 1-2-2V2" /><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" /><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" /></svg>
                        <span>Mediathek</span>
                    </li>
                </div>
            </ul>

        </nav>





    );
}

*/}