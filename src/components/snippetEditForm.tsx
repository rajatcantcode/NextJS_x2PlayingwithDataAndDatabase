"use client";
import Editor from "@monaco-editor/react";
import * as actions from "@/actions";

// Importing the Snippet interface which we created in prisma long back
import type { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, newCode] = useState(snippet.code);

  const handleEditorChange = (value: string | undefined) => {
    newCode(value ?? ""); // Provide a default empty string if value is undefined
  };

  const editSnippetAction = actions.updateSnippetOnDb.bind(
    null,
    snippet.id,
    code
  );

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-zinc-900 gap-4 p-4 ">
        <h1 className="italic">
          You are editing{" "}
          <span className="capitalize text-3xl p-2 text-blue-300 bolder">
            {snippet.title}
          </span>{" "}
        </h1>
        <Editor
          className="border border-grey-300"
          height="13vh"
          width="30vw"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={snippet.code}
          options={{ minimap: { enabled: false } }}
          onChange={handleEditorChange}
        />

        <form action={editSnippetAction}>
          <button type="submit" className="p-2 bg-green-500 rounded-lg">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
