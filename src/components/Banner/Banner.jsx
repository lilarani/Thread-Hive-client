import { useState } from 'react';
import './Banner.css';
import { FiSearch } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Banner = () => {
  const [search, setSearch] = useState('');
  const axiosPublic = useAxiosPublic();

  const handleSearchButton = () => {
    axiosPublic.get(`/post-search`).then(res => {
      console.log(res.data);
    });
  };

  return (
    <div className="banner bg-fixed w-full">
      <div className="text-center flex flex-col justify-center items-center w-4/6 mx-auto">
        <h3 className="mb-6 text-lg mt-20 text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque natus
          tempora quod maiores ducimus sit placeat quos ut eius rem.
        </h3>
        <div className="flex justify-center items-center relative w-full max-w-md">
          {/* Search Icon */}
          <span className="absolute left-3 top-2.5 text-gray-400">
            <FiSearch size={20} />
          </span>

          {/* Input Field */}
          <input
            type="text"
            className="pl-10 px-4 py-2 text-black rounded-l outline-none border-[1px] focus:border-border w-full"
            placeholder="Search here..."
          />

          {/* Button */}
          <button
            onClick={handleSearchButton}
            className="bg-bgButton border-l px-4 py-2 rounded-r hover:text-white text-black font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
