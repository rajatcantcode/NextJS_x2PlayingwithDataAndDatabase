// Must be a client components
"use client";

interface ErrorPageProps {
  error: Error;
  //Reset will allow us to refresh the page
  reset: () => void;
}
export default function showError({ error }: ErrorPageProps) {
  return (
    <>
      <div className="h-sceen items-center justify-center text-red-700">
        {error.message}
      </div>
    </>
  );
}
