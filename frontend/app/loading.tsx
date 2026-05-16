export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <section>
          <div className="h-4 w-56 rounded bg-slate-200" />
          <div className="mt-3 h-9 w-80 rounded bg-slate-200" />
          <div className="mt-3 h-5 w-full max-w-2xl rounded bg-slate-200" />
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="mt-4 h-8 w-32 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-40 rounded bg-slate-200" />
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="h-96 rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2" />
          <div className="h-96 rounded-xl border border-slate-200 bg-white shadow-sm" />
        </section>
      </div>
    </main>
  );
}
