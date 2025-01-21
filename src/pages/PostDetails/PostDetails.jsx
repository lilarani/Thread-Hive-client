import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { MdOutlineInsertComment } from 'react-icons/md';
import { WhatsappShareButton } from 'react-share';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { FaShareAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useComments from '../../hooks/useComments';

const PostDetails = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState('');
  const [showComentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const { comments, refetch } = useComments(id);

  useEffect(() => {
    axiosPublic.get(`/post-details/${id}`).then(res => {
      setPost(res.data);
    });
  }, [id]);

  const redirectToLogin = () => {
    if (!user) {
      navigate('/login');
      return true;
    }
    return false;
  };

  // handle comment
  const handleCommentButton = async () => {
    if (redirectToLogin()) return;

    if (!commentText) return;

    const newComment = {
      postId: post._id,
      email: user.email,
      commentText,
      feedback: null,
      isReported: false,
      date: new Date(),
    };

    axiosSecure.post('/comments', newComment).then(res => {
      console.log(res.data);
    });

    try {
      const response = { success: true };

      if (response.success) {
        setCommentText('');
        refetch();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // handle upVote button function
  const handleUpVote = async () => {
    if (redirectToLogin()) return; // Check login before upvoting

    try {
      const response = await axiosSecure.patch(`/posts/upVote/${post._id}`, {
        voteType: 'upVote',
      });

      if (response.data.modifiedCount > 0) {
        setUpVotes(upVotes + 1);
        post.upVote = (post.upVote || 0) + 1;
      }
    } catch (error) {
      console.error('Error incrementing upVote:', error);
    }
  };

  // handle down vote button function
  const handleDownVote = async () => {
    if (redirectToLogin()) return; // Check login before downvoting

    try {
      const response = await axiosSecure.patch(`/posts/downVote/${post._id}`, {
        voteType: 'downVote',
      });

      if (response.data.modifiedCount > 0) {
        setDownVotes(downVotes + 1);
        post.downVote = (post.downVote || 0) + 1;
      }
    } catch (error) {
      console.error('Error decrementing downVote:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-100 shadow-lg rounded-lg my-10">
      <div className="flex items-center space-x-4">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500">by {post.authorName}</p>
          <p className="text-sm text-gray-400">{post.date}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>{post.description}</p>
        <span className=" text-blue-800 px-2 py-1 text-xs "># {post.tag}</span>
      </div>

      {/* Like, Comment, Share */}
      <div className="flex justify-between items-center mt-4 ">
        {/* Up Vote */}
        <button
          onClick={handleUpVote}
          className="flex items-center space-x-1 hover:text-pink-600"
        >
          <BiUpvote className="md:w-7 h-7" />
          <span className="text-xs md:text-xl">Up Vote</span>
          <span className="text-xs md:text-xl">{post.upVote} </span>
        </button>
        {/* Down Vote */}
        <button
          onClick={handleDownVote}
          className="flex items-center space-x-1 hover:text-pink-600"
        >
          <BiDownvote className="md:w-7 h-7" />
          <span className="text-xs md:text-xl">Down Vote</span>
          <span className="text-xs md:text-xl">{post.downVote}</span>
        </button>
        {/* comment button */}
        <button
          onClick={() => {
            if (!redirectToLogin()) setShowCommentInput(!showComentInput);
          }}
          className="flex items-center space-x-1 hover:text-pink-600"
        >
          <MdOutlineInsertComment className="md:w-7 h-7" />
          <span className="text-xs md:text-xl">Comment</span>
          <span className="text-xs md:text-xl">{comments.length}</span>
        </button>
        {user ? (
          <WhatsappShareButton
            url={`http://localhost:5173/${post._id}`}
            className="flex items-center space-x-1 hover:text-pink-600"
          >
            <FaShareAlt className="md:w-7 h-7" />
            <span className="text-xs md:text-xl">Share</span>
          </WhatsappShareButton>
        ) : (
          <button onClick={redirectToLogin} className="flex ">
            <FaShareAlt className="md:w-7 h-7 mr-1" />
            <span className="text-xs md:text-xl">Share</span>
          </button>
        )}
      </div>

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
            className="flex-1 p-2 border text-xs md:text-base border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-black"
          />
          <button
            onClick={handleCommentButton}
            className="bg-bgButton px-2 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-base hover:bg-pink-600 hover:text-white transition-all duration-500 ease-in"
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};
export default PostDetails;
