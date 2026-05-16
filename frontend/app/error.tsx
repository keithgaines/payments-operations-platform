"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />

          <h1 className="text-xl font-semibold text-slate-900">
            Dashboard Error
          </h1>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          Failed to load operational dashboard data.
        </p>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Error Details
          </p>

          <p className="mt-2 break-words text-sm text-slate-700">
            {error.message || "Unknown application error"}
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Retry Dashboard Load
        </button>
      </div>
    </main>
  );
}
