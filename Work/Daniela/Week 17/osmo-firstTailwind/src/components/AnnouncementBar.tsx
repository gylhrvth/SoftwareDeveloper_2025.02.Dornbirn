import React from 'react';

type AnnouncementProps = {
    label: string;
    children: string;
};

function AnnouncementContent({ label, children }: AnnouncementProps) {
    return (
        <div className=" flex-col text-center w-auto justify-center items-center p-15">
            <h1 className="uppercase text-2xl pb-6 text-gray-500">{label}</h1>
            <span className="text-green-500 text-lg font-semibold">{children}</span>
        </div>
    );
}

export default function AnnouncementBar() {
    return (
        <div>
            <AnnouncementContent label="Unsere Aktuellen Kataloge im Bereich Holz:">
            NEU: Kanadische Hölzer für Fassaden | Thermoholz Fichte für Fassade und Terrassendielen | <br />
             Terrassen | Sichtblenden | Fassaden | Innenholz | Fussboden | Leisten | Leimholz
        </AnnouncementContent>
        </div >
    );
}