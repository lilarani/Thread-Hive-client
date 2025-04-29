import './Banner.css';
import { FiSearch } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Banner = ({ setAllPosts }) => {
  const axiosPublic = useAxiosPublic();

  const handleSearch = e => {
    let searchValue = e.target.value;
    axiosPublic.get(`/post-search?tag=${searchValue}`).then(res => {
      setAllPosts(res.data);
    });
  };

  return (
    <div className="banner bg-fixed w-full">
      <div className="text-center flex flex-col justify-center items-center w-4/6 mx-auto">
        <h3 className="mb-6 text-lg mt-16 text-white font-bold">
          Discover new ideas, share your thoughts, and connect with the world.{' '}
          <br />
          Start your journey today with our platform.
        </h3>
        <div className="flex justify-center items-center relative w-full max-w-md">
          {/* Search Icon */}
          <span className="absolute left-3 top-2.5 text-gray-400">
            <FiSearch size={20} />
          </span>

          {/* Input Field */}
          <input
            onChange={handleSearch}
            type="text"
            className="pl-10 px-4 py-2 bg-pink-50 text-black rounded-full outline-none border-[1px] focus:border-border w-full"
            placeholder="Search here..."
          />

          {/* Button */}
          {/* <button
            onClick={handleSearch}
            className="bg-bgButton border-l px-4 py-2 rounded-r hover:text-white text-black font-semibold"
          >
            Search
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
