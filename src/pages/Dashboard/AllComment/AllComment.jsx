import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

import { useState } from 'react';
import { MdReportProblem } from 'react-icons/md';
import Swal from 'sweetalert2';
import useComments from '../../../hooks/useComments';
import toast from 'react-hot-toast';

const AllComment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [feedbacks, setFeedbacks] = useState({});
  const { comments } = useComments(id);

  // Handle feedback selection for a specific comment
  const handleFeedback = (value, commentId) => {
    setFeedbacks(prevFeedbacks => ({
      ...prevFeedbacks,
      [commentId]: value,
    }));
  };

  // Handle report button click for a specific comment
  const handleReport = commentId => {
    const feedback = feedbacks[commentId];

    if (!feedback) {
      toast.error('Please select feedback before reporting.');
      return;
    }

    // Update the reported status in the database
    axiosSecure
      .patch(`/reportedComment/${commentId}`, { feedback })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          console.log(res.data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Reported successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(err => {
        console.error('Error reporting comment:', err);
      });
    setFeedbacks('');
  };

  return (
    <div className="bg-pink-50">
      <h1 className="text-3xl font-bold text-center">All Comments</h1>

      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          <thead>
            <tr className="border-b-2 border-b-gray-300">
              <th></th>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <th>{index + 1}</th>
                <td>{comment.email}</td>
                <td className="text-ellipsis overflow-hidden max-w-xs">
                  {comment.commentText.length > 20 ? (
                    <>
                      {comment.commentText.slice(0, 20)}...
                      <button
                        className="btn"
                        onClick={() =>
                          document
                            .getElementById(`modal_${comment._id}`)
                            .showModal()
                        }
                      >
                        Read More
                      </button>
                      <dialog id={`modal_${comment._id}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            {comment.commentText}
                          </h3>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="px-4 py-1 bg-bgButton">
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </>
                  ) : (
                    comment.commentText
                  )}
                </td>

                {/* Feedback Dropdown */}
                <td>
                  <select
                    onChange={e => handleFeedback(e.target.value, comment._id)}
                    className="p-2 bg-pink-100"
                    value={feedbacks[comment._id] || ''}
                  >
                    <option value="">Select Feedback</option>
                    <option value="Spam">Spam</option>
                    <option value="Abusive Language">Abusive Language</option>
                    <option value="Irrelevant Content">
                      Irrelevant Content
                    </option>
                  </select>
                </td>

                {/* Report Button */}
                <td>
                  <button
                    disabled={!feedbacks[comment._id]} // Disable if no feedback is selected
                    className={`px-4 py-1 flex items-center ${
                      !feedbacks[comment._id]
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-[#0f172a] text-white'
                    }`}
                    onClick={() => handleReport(comment._id)} // Pass the comment._id
                  >
                    <MdReportProblem className="text-base mr-1" />
                    Report
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
