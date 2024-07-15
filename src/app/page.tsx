import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <>
      <div className="h-screen flex flex-col bg-zinc-900 text-white gap-4 p-4">
        <div className="flex items-center justify-between w-[450px] ">
          <h1 className="text-3xl">All Snippets List</h1>
          <Link href="/snippets/new">
            <button className="p-2 border-2 border-gray-600 bg-green-400  font-mono text-zinc-700">
              NEW SNIPPET
            </button>
          </Link>
        </div>

        {snippets.map((snippetInfo) => (
          // Complete Div
          <div
            key={snippetInfo.id}
            className="flex p-2 border gap-3 border-gray-500 items-center justify-between w-[450px]"
          >
            {/* Title */}
            <div className="p-2 text-red-500 capitalize">
              {snippetInfo.title}
            </div>
            {/* Code */}
            <Link
              href={`/snippets/${snippetInfo.id}`}
              className="p-2 text-green-500"
            >
              View Code
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
