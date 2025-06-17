import Link from "next/dist/client/link";


export default async function HelloPage({ params }: { params: { slug: string } }) {
  const name = (await params).slug;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold">Hello, { name }!</h1>
      <p className="mt-4 text-lg">Welcome to the sluggy example page.</p>
      <Link href="/">Home</Link>
    </div>
  );
}