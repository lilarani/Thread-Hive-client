import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlineInsertComment } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MyPost = () => {
  const axiosSecure = useAxiosSecure();
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/posts/${user.email}`).then(res => {
      setMyPosts(res.data);
    });
  }, []);

  const handleDeletePost = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/posts/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Post has been deleted.',
              icon: 'success',
            });
          }
          let info = myPosts.filter(item => item._id !== id);
          setMyPosts(info);
        });
      }
    });
  };

  return (
    <div className="container mx-auto bg-pink-50">
      <h2>my post: {myPosts.length}</h2>

      <div className={`overflow-x-auto`}>
        <table className="table table-zebra ">
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
                  <Link to={`/dashboard/allComment/${post._id}`}>
                    <MdOutlineInsertComment className="text-2xl cursor-pointer" />
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDeletePost(post._id)}>
                    <RiDeleteBin2Line className="text-red-500 text-2xl cursor-pointer" />
                  </button>
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
