"use client";

import * as actions from "@/actions";
import { useFormState } from "react-dom";

export default function NewSnippetPage() {
  // 1st Arg - Server Action Fxn we want to call whenever the form gets submitted
  // 2nd Arg - Initial FormState
  const [formState, updatedServerAction] = useFormState(actions.createSnippet, {
    messege: "",
  });

  return (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-900 ">
      <form className="bg-zinc-100 p-4 rounded-lg" action={updatedServerAction}>
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

        {formState.messege ? (
          <div className="text-red-600">{formState.messege}*</div>
        ) : null}

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
