import { PrismaClient } from '@/generated/prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient()


export default async function MondialPage() {
    const countries = await prisma.country.findMany()
    return (
        <div>
            <h1 className="pb-7 text-5xl">Mondial</h1>
            <ul className="grid grid-cols-8 gap-6 mb-17">
                {countries.map((country) => (
                    <li className="outline p-1.5 " key={country.Code}>
                        <Link href={`/mondial/${country.Code}`}>
                            {country.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
