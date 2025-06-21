"use client";
import { useParams } from 'next/navigation';
import Footer from '@/components/footer';
import HeaderSmall from '@/components/headerSmall';


export default async function SlugPage() {
    const params = useParams();
    const slug = (await params).slug;  // Hier kommt "beispiel-slug" rein

    return (

        <>
            <HeaderSmall />
            <main className="h-screen">
                <h1>Slug-Seite: {slug}</h1>
                <p>Hier könnte ihre Werbung stehn.</p>
            </main>
            
            <Footer />
        </>


    );
}