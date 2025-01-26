import moment from 'moment/moment';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const { theme } = useAuth();

  return (
    <>
      <div className="">
        <Link to={`/post-details/${post._id}`}>
          <div
            className={`card ${
              theme === 'dark' ? 'bg-[#0f172a] text-white' : 'bg-pink-100'
            }  shadow-md text-black rounded-lg p-6`}
          >
            {/* Author Section */}
            <div className="flex items-center mb-4">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{post.authorName}</h2>

                <p className="text-sm ">{moment(post.date).fromNow()}</p>
              </div>
            </div>
            {/* Post Description */}
            <div className="space-y-2 ">
              <h2 className="text-2xl font-semibold">{post.title}</h2>

              <p className=" text-base mb-7">
                {post.description.slice(0, 200)}...
              </p>
              <p className=" text-base mb-7 text-blue-500">#{post.tag}</p>
            </div>
          </div>
        </Link>
      </div>
      ;
    </>
  );
};

export default Post;

{
  /* details button */
}
