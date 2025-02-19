import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Post from './Post';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

const AllPost = ({ allPosts, setAllPosts }) => {
  const axiosPublic = useAxiosPublic();

  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);
  const postsPerPage = 5;

  // Fetch all posts
  useEffect(() => {
    axiosPublic.get('/posts').then(res => {
      setAllPosts(res.data);
    });
  }, []);

  // Calculate indexes for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = isSorted
    ? allPosts.slice(indexOfFirstPost, indexOfLastPost).sort((a, b) => {
        const aPopularity = a.upVote - b.downVote;
        const bPopularity = b.upVote - a.downVote;
        return bPopularity - aPopularity;
      })
    : allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Handle page change
  const paginate = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Sorting function for when the button is clicked
  const handleSort = () => {
    setIsSorted(!isSorted);

    // If sorted, sort posts by popularity (upvote - downvote)
    if (!isSorted) {
      setAllPosts(prevPosts =>
        [...prevPosts].sort((a, b) => {
          const aPopularity = a.upVote - a.downVote;
          const bPopularity = b.upVote - b.downVote;
          return bPopularity - aPopularity;
        })
      );
    } else {
      setAllPosts(prevPosts => [...prevPosts].sort((a, b) => a._id - b._id));
    }
  };
  // fetch the tags
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axiosPublic.get('/tags');
      return response.data || [];
    },
  });

  // filtered by tagName
  const searchByTag = tagName => {
    axiosPublic.get('/posts').then(res => {
      let posts = res.data;
      const filtered = posts.filter(post => post.tag === tagName);
      setAllPosts(filtered);
    });
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      {/* tag buttons */}
      <div className="space-y-3">
        <h1 className="text-center font-bold text-3xl">
          Browse Popular Tags to Explore Posts
        </h1>
        <div className="flex flex-wrap gap-4 justify-center ">
          {tags?.map(tag => (
            <div key={tag._id}>
              <button
                onClick={() => searchByTag(tag.tagName)}
                className="px-4 py-2 bg-bgButton text-black rounded-full hover:bg-pink-600 transition-all shadow-md text-lg"
              >
                {tag.tagName}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="my-5 flex justify-end mt-24">
        <button
          onClick={handleSort}
          className="px-4 py-1 bg-gray-800 text-white hover:bg-bgButton transition-all duration-300 ease-in font-semibold"
        >
          {isSorted ? 'Sorted Posts' : 'Sort by Popularity'}{' '}
          {/* Button Text Based on Sort State */}
        </button>
      </div>
      {/* Display posts for the current page */}
      {currentPosts.map(post => (
        <Post key={post._id} post={post}></Post>
      ))}

      {/* Pagination Info */}
      <div className="flex justify-between items-center mt-4">
        {/* Showing the range and total */}
        <span className=" hidden sm:block">
          Showing {indexOfFirstPost + 1}–
          {Math.min(indexOfLastPost, allPosts.length)} of {allPosts.length}
        </span>

        {/* Pagination */}
        <nav>
          <ul className="flex space-x-2 items-center">
            {/* Prev Button */}
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`flex items-center px-3 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                disabled={currentPage === 1}
              >
                <FaChevronLeft className="mr-2" /> Prev
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded ${
                    currentPage === number
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`flex items-center px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                disabled={currentPage === totalPages}
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllPost;
