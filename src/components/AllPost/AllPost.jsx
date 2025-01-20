import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Post from './Post';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AllPost = ({ allPosts, setAllPosts }) => {
  const axiosPublic = useAxiosPublic();
  // const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Handle page change
  const paginate = pageNumber => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Display posts for the current page */}
      {currentPosts.map(post => (
        <Post key={post._id} post={post}></Post>
      ))}

      {/* Pagination Info */}
      <div className="flex justify-between items-center mt-4">
        {/* Showing the range and total */}
        <span className="text-gray-700 hidden sm:block">
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
