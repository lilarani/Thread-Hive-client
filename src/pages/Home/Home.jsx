const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center py-6 gap-3">
        <input
          type="text"
          placeholder="search"
          className="input input-bordered w-full max-w-xs font-semibold"
        />
        <button className="bg-bgButton font-semibold text-white px-4 rounded-md ">
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
