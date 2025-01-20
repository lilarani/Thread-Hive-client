import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { MdReportProblem } from 'react-icons/md';
import Swal from 'sweetalert2';

const AllComment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [allComments, setAllComments] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [reportButtonDisabled, setReportButtonDisabled] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/comments/${id}`).then(res => {
      setAllComments(res.data);
    });
  }, [id]);

  // Handle feedback selection
  const handleFeedback = value => {
    setFeedback(value);
    if (value) {
      setReportButtonDisabled(false);
    } else {
      setReportButtonDisabled(true);
    }
  };

  // Handle report button click
  const handleReport = id => {
    if (!feedback) {
      alert('Please select feedback before reporting.');
      return;
    }

    // Update the reported status in the database
    axiosSecure
      .patch(`/reportedComment/${id}`, { feedback })
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
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">All Comments</h1>

      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          <thead>
            <tr className="border-b-2 border-b-gray-300">
              <th></th>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report Button</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{comment.email}</td>
                <td className="text-ellipsis overflow-hidden max-w-xs">
                  {comment.commentText.length > 20 ? (
                    <>
                      {comment.commentText.slice(0, 20)}...
                      <button
                        className="btn"
                        onClick={() =>
                          document.getElementById('my_modal_1').showModal()
                        }
                      >
                        Read More
                      </button>
                      <dialog id="my_modal_1" className="modal">
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
                    onChange={e => handleFeedback(e.target.value)}
                    className="p-2 bg-pink-100"
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
                  {comment.reported ? (
                    <button
                      className="px-4 py-1 bg-[#0f172a] text-white "
                      // Disable the button if no feedback

                      onClick={() => handleReport(comment._id)}
                    >
                      <MdReportProblem className="text-2xl" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-1 bg-[#0f172a] text-white "
                      // Disable the button if no feedback
                    >
                      <MdReportProblem className="text-2xl" />
                    </button>
                  )}
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
