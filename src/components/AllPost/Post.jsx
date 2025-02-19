import moment from 'moment/moment';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const { theme } = useAuth();

  return (
    <div className="pb-3">
      <Link to={`/post-details/${post._id}`}>
        <div
          className={`card shadow-sm border  ${
            theme === 'dark'
              ? 'bg-stone-900 text-gray-300 border-gray-800'
              : ' border-gray-300 '
          } rounded-2xl p-6 transition duration-300 ease-in`}
        >
          {/* Author Section */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">{post.authorName}</h2>
              <p className="text-sm ">{moment(post.date).fromNow()}</p>
            </div>
          </div>

          {/* Post Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-base ">{post.description.slice(0, 200)}...</p>
            <p className="text-base text-blue-500">#{post.tag}</p>

            {/* Details Button */}
            <div className="mt-4">
              <Link to={`/post-details/${post._id}`}>
                <button className="px-4 py-2 bg-bgButton text-black rounded-lg hover:bg-pink-600 transition">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
