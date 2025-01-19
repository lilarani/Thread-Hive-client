import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { MdReportProblem } from 'react-icons/md';

const AllComment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [allComments, setAllComments] = useState([]);
  const [feadback, setFeadback] = useState('');

  useEffect(() => {
    axiosSecure.get(`/comments/${id}`).then(res => {
      setAllComments(res.data);
    });
  }, [id]);

  // This function will handle the feedback selection logic.
  const handleFeadBack = value => {
    setFeadback(value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">All Comments</h1>

      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="border-b-2 border-b-gray-300">
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
                <td className="text-ellipsis overflow-hidden max-w-xs ">
                  {comment.commentText.length > 20 ? (
                    <>
                      {comment.commentText.slice(0, 20)}...
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
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
                              {/* if there is a button in form, it will close the modal */}
                              <button className="px-4 py-1 bg-bgButton ">
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
                {/* report dropdown */}
                <td>
                  <select
                    onChange={e => handleFeadBack(e.target.value)}
                    className="p-2 bg-pink-100"
                  >
                    <option value="" className="hover:bg-pink-500">
                      Select Feedback
                    </option>
                    <option value="Spam" className="hover:bg-pink-500">
                      Spam
                    </option>
                    <option
                      value="Abusive Language"
                      className="hover:bg-pink-500"
                    >
                      Abusive Language
                    </option>
                    <option
                      value="Irrelevant Content"
                      className="hover:bg-pink-500"
                    >
                      Irrelevant Content
                    </option>
                  </select>
                </td>

                <td>
                  <button className="px-4 py-1 bg-[#0f172a] text-white">
                    <MdReportProblem className="text-2xl" />
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
