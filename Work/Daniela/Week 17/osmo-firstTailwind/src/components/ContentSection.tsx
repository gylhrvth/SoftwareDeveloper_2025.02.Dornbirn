import React from 'react';
import HeroSlider1 from '../assets/HeroSlider1.jpg';

type ContentSectionProps = {

    label: string;
    children: React.ReactNode;
    
}

function ContentPannel({ label, children }: ContentSectionProps) {
    return (
        <div className="w-250 h-235 mx-auto text-center flex flex-col items-center ">
            <h1>{label}</h1>
            <span>{children}</span>
        </div>
    );

}

export default function ContentSection() {
    return (
        <ContentPannel label="Holz trifft Farbe">
            Für eine Verbindung, die auf dauer hält und schützt. Auf Holz und Farbe von Osmo können Sie sich verlassen. 
            Dank tiefgreifender Fachkompetenz in beiden Bereichen wissen wir, worauf es bei Holzprodukten und -anstrichen ankommt.
            Profitieren Sie von unserer Erfahrung.   
            <div className="flex flex-row justify-center mx-1">
            <img src={HeroSlider1}></img>  
            <img src={HeroSlider1}></img> 
            </div>      
        </ContentPannel>
    );
}