import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippetEditForm";

interface showPagePropsInterface {
  params: {
    snippetId: string;
  };
}

export default async function SnippetEditPage(props: showPagePropsInterface) {
  const currentSnippetID = parseInt(props.params.snippetId);

  if (!currentSnippetID) {
    return notFound();
  }

  const currentSnippet = await db.snippet.findFirst({
    where: { id: currentSnippetID },
  });

  if (!currentSnippet) {
    return notFound();
  }

  return (
    <>
      <div className="text-white">
        <SnippetEditForm snippet={currentSnippet} />
      </div>
    </>
  );
}
