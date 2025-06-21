import Link from 'next/link';


export default function Footer() {
    return (
        <footer className="footer h-30 w-full absolute bottom-0">
            <div className="p-3.5 space-x-10 flex justify-center w-full">
                <Link href="">bliblablud</Link>
                <Link href="">rgb</Link>
            </div>
        </footer>
    );
}