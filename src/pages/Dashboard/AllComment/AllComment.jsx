import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';

const AllComment = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/comments/${postId}`).then(res => {
      console.log(res.data.comments);
      setAllComments(res.data);
    });
  }, [postId]);

  return (
    <div>
      <h1>All Comments</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>email</th>
              <th>comment</th>
              <th>feedback</th>
              <th>Report button</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{comment.email}</td>
                <td>{comment.commentText}</td>
                <td>{'Nice '}</td>
                <td>{'okay'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllComment;
