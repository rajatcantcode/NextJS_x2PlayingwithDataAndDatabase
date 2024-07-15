import { db } from "@/db/index";
import { redirect } from "next/navigation";

export default function NewSnippetPage() {
  // FormData is an interface to easily construct a set of key/value pairs representing form fields and their values.
  async function createSnippet(formData: FormData) {
    // We explicitally write because it helps us to clarify the context in which a piece of code runs.
    // Server Actions
    "use server";

    // Check the user's input is valid
    // We assign the id - title in form element while designing
    // in form we may submmit a file that's why 'const title: FormDataEntryValue | null'
    // but we need a 'string' for now so we used 'as'

    const title = formData.get("title") as string | null;
    const code = formData.get("code") as string | null;

    // Validate the title and code are not null or empty
    if (!title) {
      throw new Error("Title must not be null or empty");
    }

    if (!code) {
      throw new Error("Code must not be null or empty");
    }

    // Create a new Record in the db
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });

    // console.log(snippet);

    // Redirect to home route
    redirect("/");
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-900 text-white">
      <form className="bg-zinc-100 p-4 rounded-lg" action={createSnippet}>
        {/* Title */}
        <h3 className="text-lg font-semibold mb-4 text-zinc-800 font-mono italic">
          Create a Snippet
        </h3>
        {/* Input Area */}
        <div className="flex flex-col gap-4 p-2">
          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="title" className="p-2 text-zinc-800 font-mono">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="p-2 rounded-lg border border-gray-300 text-black"
            />
          </div>
          <div className="flex gap-2 items-center justify-between">
            <label htmlFor="code" className="p-2 text-zinc-800 font-mono">
              Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              className="p-2 rounded-lg border border-gray-300 text-black"
            />
          </div>
        </div>
        {/* Button */}
        <div className="w-full flex items-center justify-center ">
          <button type="submit" className="p-2 bg-green-500 rounded-lg">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
