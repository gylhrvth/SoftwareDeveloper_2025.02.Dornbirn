import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

interface Params {
    params: {
        slug: string;
    };
}

export default async function CountryDetailPage({ params }: Params) {
    const country = await prisma.country.findUnique({
        where: { Code: params.slug }, // Beachte: falls dein Feld anders heißt, anpassen
    });

    const rivers = await prisma.geo_river.findMany({
        where: {
            Country: params.slug,
        },

        include: {
            river: true
        },
    });

   

    if (!country) {
        return <div>Land nicht gefunden</div>;
    }

    return (
        <div>
            <h2 className="text-4xl mb-4">{country.Name}</h2>
            <div className="outline p-2 gap-4">
                <div>Code: {country.Code}</div>
                <div>Capital: {country.Capital}</div>
                <div>Province: {country.Province}</div>
                <div>Area: {country.Area}</div>
                <div>Population: {country.Population}</div>
            </div>
            {/* Hier weitere Infos anzeigen */}

            <h2 className="text-2xl pt-5 pb-2">Rivers through {country.Name}</h2>
            {rivers.length > 0 ? (
                <div className="outline p-2 m-5">
                    {rivers.map((river, index) => (
                        <div className="outline grid grid-cols-2 gap-10 p-2.5 m-2.5" key={index}>
                           <div> {river.River}</div>  
                           <div>Located in {river.Province}</div>
                           <div key={index}> length:{river.river?.Length ?? "?"}km</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No rivers recorded for this country.</p>
            )}
        </div>

    );
}
