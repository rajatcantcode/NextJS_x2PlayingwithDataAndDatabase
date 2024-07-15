"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function updateSnippetOnDb(id: number, code: string) {
  await db.snippet.update({
    where: { id: id },
    data: { code },
  });

  redirect("/");
}

export async function deleteSnippetOnDb(id: number) {
  await db.snippet.delete({
    where: { id: id },
  });

  redirect("/");
}
