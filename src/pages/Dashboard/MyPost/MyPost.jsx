import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { FaCommentDots } from 'react-icons/fa';

const MyPost = () => {
  const axiosPublic = useAxiosPublic();
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosPublic.get(`/posts`).then(res => {
      setMyPosts(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h2>my post: {myPosts.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Number of votes</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>{post.title}</td>
                <td>{post.upVote}</td>
                <td>
                  <FaCommentDots className="text-2xl cursor-pointer" />
                </td>
                <td>
                  {
                    <RiDeleteBin2Line className="text-red-500 text-2xl cursor-pointer" />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPost;
