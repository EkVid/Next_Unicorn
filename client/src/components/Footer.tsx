

const Footer = () => <footer className="w-screen flex gap-6 flex-wrap items-center justify-center mt-5 md:mt-10 pt-10 md:pt-20 pb-5 md:pb-10 ">
    <div className='bg-[linear-gradient(to_top,_rgba(128,0,128,0.3)_0%,_rgba(0,0,0,0)_80%)] blur-lg md:h-[280] h-[200px] z-0 absolute blur-lg w-full z-0 absolute'>
    </div>
    <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.5] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-2xl font-bold z-10"
        href=""
        target="_blank"
        rel="noopener noreferrer"
    >
        See where next unicorn can take you!
    </a>
</footer>

export default Footer;