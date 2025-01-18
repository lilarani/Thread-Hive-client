import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { MdReportProblem } from 'react-icons/md';

const AllComment = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/comments/${id}`).then(res => {
      console.log(res.data);
      setAllComments(res.data);
    });
  }, [id]);

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
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{comment.email}</td>
                <td>{comment.commentText}</td>
                <td>
                  <details className="dropdown">
                    <summary className="px-4 py-1 bg-[#0f172a] text-white m-1">
                      feedback
                    </summary>
                    <ul className="menu dropdown-content text-black bg-pink-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li>
                        <a>Positive Feedback</a>
                      </li>
                      <li>
                        <a>Neutral Feedback</a>
                      </li>
                      <li>
                        <a>Negative Feedback</a>
                      </li>
                    </ul>
                  </details>
                </td>
                <td>
                  <button className="px-4 py-1 bg-bgButton text-white">
                    <MdReportProblem />
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

export default AllComment;
