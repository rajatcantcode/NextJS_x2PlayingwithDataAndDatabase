import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions";

interface showPagePropsInterface {
  params: {
    snippetId: string;
  };
}

export default async function showSnippetPage(props: showPagePropsInterface) {
  try {
    // Intentionally delay the page to show the default loaders
    await new Promise((resolve) => setTimeout(resolve, 200));

    const currentSnippetID = parseInt(props.params.snippetId);

    if (isNaN(currentSnippetID)) {
      throw new Error("Invalid snippet ID");
    }

    const currentSnippet = await db.snippet.findFirst({
      where: { id: currentSnippetID },
    });

    if (!currentSnippet) {
      return notFound();
    }

    const deleteSnippet = actions.deleteSnippetOnDb.bind(
      null,
      currentSnippetID
    );

    return (
      <div className="h-screen bg-zinc-900 text-white p-4 flex flex-col gap-4">
        <Link href="/" className="italic text-3xl">
          Back To Home
        </Link>

        <div className="flex items-center justify-between w-fit gap-4">
          <Link
            href={`/snippets/${currentSnippetID}/edit`}
            className="text-blue-500 p-2 bg-blue-100 rounded-lg"
          >
            Edit
          </Link>

          <form action={deleteSnippet}>
            <button className="text-red-500 p-2 bg-red-100 rounded-lg">
              Delete
            </button>
          </form>
        </div>

        {/* Complete Div */}
        <div
          key={currentSnippet.id}
          className="flex flex-col justify-center gap-4"
        >
          <div className="text-4xl text-red-500 text-mono capitalize">
            {currentSnippet.title}
          </div>

          {/* pre - formatted text */}
          <pre className="bg-gray-600 text-md p-4 w-fit h-fit text-wrap rounded-sm">
            {/* Represents the code */}
            <code>{currentSnippet.code}</code>
          </pre>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering snippet page:", error);
    return notFound();
  }
}
