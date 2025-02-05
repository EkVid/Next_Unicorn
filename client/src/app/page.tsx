
import Image from 'next/image'
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-4xl font-bold">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Unicorns are not just a myth, the next one can be in your portfolio
        <div className='text-sm font-normmal text-center w-[100%]'>
          Empowering startups to soar and investors to explore<br/>
          your gateway to innovation and opportunity<br/>
          Discover, invest, and grow together.
        </div>
      </main>

      <div className="absolute inset-0 flex justify-between items-center bg-black h-20">
        <Image
          src="/logo_white.svg"
          alt="Next Unicorn Logo"
          width={300}
          height={400}

        />
        <div className='pr-2 h-20 flex items-center gap-4'>
          <button className="bg-[#f2f2f2] dark:bg-[transparent] text-sm dark:text-white px-4 py-1 rounded-2xl border-solid border border-[var(--foreground]">Join as Startup</button>
          <button className="bg-[#f2f2f2] dark:bg-[transparent] text-sm dark:text-white px-4 py-1 rounded-2xl border-solid border border-[var(--foreground]">Join as Investor</button>
        </div>
      </div>
      <div className="absolute inset-20 flex justify-center">
        <div className="w-[800px] h-[250px] bg-[radial-gradient(ellipse_at_top,_rgba(128,0,128,0.5)_0%,_rgba(0,0,0,0)_80%)] blur-lg z-10"></div>

      </div>
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
