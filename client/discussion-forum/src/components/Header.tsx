import { FaSearch, FaHome, FaBell, FaCommentDots } from "react-icons/fa";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white py-4 px-4 md:px-6 flex justify-between items-center shadow-md z-50">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full"></div>
        <h1 className="text-sm md:text-lg font-semibold">Unicom by Next Unicorn</h1>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <FaHome className="text-lg md:text-xl" />
        <FaSearch className="text-lg md:text-xl hidden md:block" />
        <FaCommentDots className="text-lg md:text-xl" />
        <FaBell className="text-lg md:text-xl" />
        User Name
      </div>
    </header>
  );
};

export default Header;