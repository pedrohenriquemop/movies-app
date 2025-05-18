import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <Link className="hover:underline" href="/movies">
        Go to Movies
      </Link>
    </div>
  );
}
