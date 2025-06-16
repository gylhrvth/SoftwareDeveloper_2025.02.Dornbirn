import React from 'react'; 

type AnnouncementProps = {
    label: string; 
    children: string; 
};

export default function AnnouncementBar({label, children}: AnnouncementProps){
    return(
        <div>
            <h1>{label}</h1>
            <span>{children}</span>
        </div>
    );
}