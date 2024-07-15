"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/");
  redirect("/");
}

// FormData is an interface to easily construct a set of key/value pairs representing form fields and their values.
export async function createSnippet(
  formState: { messege: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        messege: "Title must be string and longer then 3 letters",
      };
    }

    if (typeof code !== "string" || code.length < 5) {
      return {
        messege: "Put a valid code and at least one line",
      };
    }

    // Create a new Record in the db
    await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });

    // throw new Error("Checking Error");
  } catch (err) {
    if (err instanceof Error) {
      return {
        messege: err.message,
      };
    } else {
      return {
        messege: "Sorry for the Unconvienience But Something went wrong",
      };
    }
  }

  // On-Demand Caching
  revalidatePath("/");
  // Always put redirect statement outside the try-catch otherwise need to one same error everytime
  // NEXT_REDIRECT* - Error
  redirect("/");
}
