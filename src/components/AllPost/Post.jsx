import { FaShareAlt } from 'react-icons/fa';
import { MdOutlineInsertComment } from 'react-icons/md';
import { BiUpvote } from 'react-icons/bi';
import { BiDownvote } from 'react-icons/bi';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { WhatsappShareButton } from 'react-share';

const Post = ({ post }) => {
  const { tag = [] } = post;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showComentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const { theme } = useAuth();

  // handle comment
  const handleCommentButton = async () => {
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
        // Update the local comments state
        setComments([...comments, newComment]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // handle upVote button function
  const handleUpVote = async () => {
    try {
      const response = await axiosSecure.patch(`/posts/downVote/${post._id}`, {
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
    <div
      className={`card ${
        theme === 'dark' ? 'bg-[#0f172a] text-white' : 'bg-pink-100'
      }  shadow-md text-black rounded-lg p-6 mb-6`}
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
          <p className="text-sm ">{post.postedTime}</p>
        </div>
      </div>
      {/* Post Description */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <p className=" text-base mb-4 ">{post.description}</p>
        {/* Tags (Optional) */}
        <p className="text-blue-500">#{tag}</p>
        <p>{post.date}</p>
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
          onClick={() => setShowCommentInput(!showComentInput)}
          className="flex items-center space-x-1 hover:text-pink-600"
        >
          <MdOutlineInsertComment className="md:w-7 h-7" />
          <span className="text-xs md:text-xl">Comment</span>
          <span className="text-xs md:text-xl">{comments.length}</span>
        </button>
        <WhatsappShareButton
          url={`http://localhost:5173`}
          className="flex items-center space-x-1 hover:text-pink-600"
        >
          <FaShareAlt className="md:w-7 h-7" />
          <span className="text-xs md:text-xl">Share</span>
        </WhatsappShareButton>
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

export default Post;
