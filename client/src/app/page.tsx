

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-4xl font-bold">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      Unicorns are not just a myth, the next one can be in your portfolio
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-2xl font-bold"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          See where next unicorn can take you!
        </a>
      </footer>
    </div>
  );
}
