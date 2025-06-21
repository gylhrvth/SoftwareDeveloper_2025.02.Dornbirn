import React from 'react';


type sectionProps = {
 title: string;
 text?: string;
}

export default function Section({title, text} : sectionProps ) {
  return (
    <div className="sectionBackground flex flex-col w-full sm:w-[40%] min-h-[125px]  text-white border border-pink-950 rounded-2xl p-3.5 justify-center items-center m-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-justify">{text}</p>
      <p>{text}</p>
    </div>
  );
}