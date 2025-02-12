
/* eslint-disable react/no-unescaped-entities */
import Footer from "@/components/Footer";
import Gradient from "@/components/Gradient";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 w-full h-20">
        <Header />
      </div>
      <Gradient />
      <div className="flex flex-col h-screen md:pt-60 pt-36">
        <div className="flex-1 flex flex-col items-center md:px-40 px-10">
          <div className="md:text-4xl text-2xl font-bold text-center">
            Unicorns aren't just myths, the next one can be in your portfolio.
          </div>
          <div className="text-sm font-semibold text-center md:w-1/2 lg:w-1/3 w-3/4 pt-10">
            Empowering startups to soar and investors to explore
            your gateway to innovation and opportunity
            <div className="md:pt-2 pt-1">Discover, invest, and grow together.</div>
          </div>
          <div className="w-[100%] flex flex-col md:flex-row md:mt-20 mt-10 md:p-10 p-5 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl gap-10">
            <div className="flex-1 md:text-3xl text-xl font-bold">
              <div>Fuel your Vision:</div>
              <div>Access Funding, and Growth Opportunities</div>
            </div>
            <div className="flex-1 text-sm">
              <div>Turn your startup dreams into reality. </div>
              <div>
                Next Unicorn connects you with a network of passionate investors, experienced mentors, and the resources you need to scale.
              </div>
              <div>Whether you"re in the early stages or ready to grow, we’re here to help you succeed every step of the way.</div>
            </div>
          </div>
          <div className="md:mt-20 mt-10 md:text-3xl text-xl font-bold w-[100%]">
            <div>Discover Tomorrow’s Success Stories: </div>
            <div>Invest in Curated, High-Potential Startups</div>
          </div>
          <div className="w-full md:mt-20 mt-10">
            <div className="w-full md:w-1/2">
              <div>Find your next big opportunity with ease. </div>
              <div>Next Unicorn handpicks innovative startups with high growth potential, giving you transparent access to vetted ventures.</div>
              <div>Join a community of forward-thinking investors, and be part of the next wave of groundbreaking success stories.</div>
            </div>
          </div>
          <div className="md:text-3xl text-xl font-bold text-left w-[100%] mt-20">
            Interested but have questions?
          </div>
          <div className="w-full flex flex-col md:mt-20 mt-10 md:p-10 p-5 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl gap-10 items-center">
            <div className="w-[100%] flex gap-10 flex-col md:flex-row">
              <input type="text" placeholder="First Name" className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl bg-transparent flex-1" />
              <input type="text" placeholder="Last Name" className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl bg-transparent flex-1" />
            </div>
            <div className="w-[100%] flex gap-10 flex-col md:flex-row">
              <input type="text" placeholder="Email" className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl bg-transparent flex-1" />
              <input type="text" placeholder="Phone Number" className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl bg-transparent flex-1" />
            </div>
            <input type="text" placeholder="Subject(Investor/Startup)" className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl bg-transparent w-[100%]" />
            <textarea placeholder="Tell us something" className="p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-xl bg-transparent w-[100%]" />
            <button className="bg-[#f2f2f2] dark:bg-[transparent] text-md dark:text-white p-2 rounded-[40px] border-solid border border-white/[.5] w-64">Send to Next Unicorn</button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
