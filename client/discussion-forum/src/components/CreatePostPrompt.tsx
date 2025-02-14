const CreatePostPrompt = () => {
  return (
    <div className="mt-16 md:mt-20 mx-auto max-w-full md:max-w-3xl bg-gray-800 p-3 md:p-4 rounded-lg text-white flex justify-between items-center">
      <input className="text-xs md:text-base w-[100%] mr-12 bg-transparent h-[4rem] focus:outline-none focus:ring-0 focus:border-transparent" placeholder="Let’s share what’s on your mind..."/>
      <button className="bg-purple-700 px-3 py-1 md:px-4 md:py-2 rounded-md text-white text-xs md:text-base md:whitespace-nowrap">
       Create Post
      </button>
    </div>
  );
};

export default CreatePostPrompt;