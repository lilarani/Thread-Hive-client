import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { MdOutlineInsertComment } from 'react-icons/md';
import { FaShareAlt } from 'react-icons/fa';
import { WhatsappShareButton } from 'react-share';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showComentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [myInfo, setMyInfo] = useState('');

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then(res => {
      setMyInfo(res.data);
    });
  }, []);

  // recent post get req
  useEffect(() => {
    axiosSecure.get(`/posts/recent/${user.email}`).then(res => {
      setRecentPosts(res.data);
    });
  }, []);

  // handle comment
  const handleCommentButton = async postId => {
    if (!commentText) return;

    const newComment = {
      postId,
      email: user.email,
      commentText,
      feedback: null,
      isReported: false,
      date: new Date(),
    };

    axiosSecure.post('/comments', newComment).then(res => {
      console.log(res.data);
    });

    // Update the comments for the specific post
    setComments(prevComments => [...prevComments, newComment]);
    setCommentText('');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="md:w-3/6 h-96 bg-pink-100 mx-auto shadow-md">
        <div className="flex flex-col justify-center items-center p-8 space-y-2">
          <img
            src={myInfo.userPhoto}
            alt=""
            className="w-24 h-24 rounded-full "
          />
          <h2 className="text-2xl font-bold">{myInfo.name}</h2>
          <p className="text-xl font-semibold">{myInfo.email}</p>
          <div className="flex">
            <p className="font-semibold text-xl mr-2">Badge:</p>
            <img
              className="w-8 h-8 rounded-full"
              src={myInfo.badge}
              alt="Badge"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-3xl font-bold text-center">My Recent Posts</h3>
        <div>
          {recentPosts.map(post => (
            <div
              key={post._id}
              className="card bg-pink-100 shadow-md text-black rounded-lg p-6 mb-6 mt-10"
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
                  <p className="text-sm text-gray-500">{post.postedTime}</p>
                </div>
              </div>
              {/* Post Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-800 text-base mb-4 ">
                  {post.description}
                </p>
                {/* Tags (Optional) */}
                <p className="text-blue-500">#{post.tag}</p>
                <p>{post.date}</p>
              </div>
              {/* Like, Comment, Share */}
              <div className="flex justify-between items-center mt-4 text-gray-600">
                <button className="flex items-center space-x-1 hover:text-pink-600">
                  <BiUpvote className="md:w-7 h-7" />
                  <span className="text-xs md:text-xl">Up Vote</span>
                  <span className="text-xs md:text-xl">{post.upVote}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-pink-600">
                  <BiDownvote className="md:w-7 h-7" />
                  <span className="text-xs md:text-xl">Down Vote</span>
                  <span className="text-xs md:text-xl">{post.downVote}</span>
                </button>
                <button
                  onClick={() => setShowCommentInput(!showComentInput)}
                  className="flex items-center space-x-1 hover:text-pink-600"
                >
                  <MdOutlineInsertComment className="md:w-7 h-7" />
                  <span className="text-xs md:text-xl">Comment</span>
                </button>

                {/* share button */}
                <WhatsappShareButton
                  url={`http://localhost:5173`}
                  className="flex items-center space-x-1 hover:text-pink-600"
                >
                  <FaShareAlt className="md:w-7 h-7" />
                  <span className="text-xs md:text-xl">Share</span>
                </WhatsappShareButton>
              </div>

              {/* Comment input */}
              {showComentInput && (
                <div className="mt-4 flex items-start space-x-2">
                  <img
                    src={post.authorImage}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    name="comment"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    className="flex-1 p-2 border text-xs md:text-base border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={() => handleCommentButton(post._id)} // Pass post._id
                    className="bg-bgButton px-2 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-base hover:bg-pink-600 hover:text-white transition-all duration-500 ease-in"
                  >
                    Add Comment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
