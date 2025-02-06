import Image from 'next/image'


const Header = () => {
    return (
        <div className="flex justify-between items-center bg-black h-20 w-[100%]">
            <Image
                src="/logo_white.svg"
                alt="Next Unicorn Logo"
                width={300}
                height={400}
            />
            <div className='pr-2 h-20 flex items-center gap-4'>
                <button className="bg-[#f2f2f2] dark:bg-[transparent] text-sm dark:text-white px-4 py-1 rounded-2xl border-solid border border-white/[.5]">Join as Startup</button>
                <button className="bg-[#f2f2f2] dark:bg-[transparent] text-sm dark:text-white px-4 py-1 rounded-2xl border-solid border border-white/[.5]">Join as Investor</button>
            </div>
        </div>
    );
}

export default Header;
