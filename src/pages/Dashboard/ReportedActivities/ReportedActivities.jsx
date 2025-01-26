import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiAlarmWarningLine, RiDeleteBin2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const ReportedActivities = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: comments = [], refetch } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axiosSecure.get('/comments');
      return response.data;
    },
  });

  // delete the  comment
  const handleDeleteComment = id => {
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
        axiosSecure.delete(`/comments/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'The Comment has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };

  // handle warning function
  const handleWarning = email => {
    axiosSecure
      .post(`/warnings`, {
        userEmail: email,
        warning: `We kindly request you to adhere to our privacy policy and guidelines. Please ensure compliance to maintain a safe and respectful environment for everyone.`,
        date: new Date(),
      })
      .then(res => {
        Swal.fire({
          title: 'Warning Sent!',
          text: `A warning has been successfully`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      })
      .catch(err => {
        console.log(err.message);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue sending the warning.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      });
  };

  return (
    <div className="bg-pink-50">
      <Helmet>
        <title>Thread Hive | Reported Activities</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="border-b-2">
            <tr>
              <th></th>
              <th>Email</th>
              <th>Comments</th>
              <th>Feadback</th>
              <th>Delete Comments</th>
              <th>Warning</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((info, index) => (
              <tr key={info._id}>
                <th className=" text-xs lg:text-base">{index + 1}</th>
                <td className="text-xs lg:text-base">{info.email}</td>
                <td className="text-ellipsis overflow-hidden max-w-xs">
                  {info.commentText.length > 20 ? (
                    <>
                      {info.commentText.slice(0, 20)}...
                      <button
                        className="btn text-sm"
                        onClick={() =>
                          document
                            .getElementById(`modal_${info._id}`)
                            .showModal()
                        }
                      >
                        Read More
                      </button>
                      <dialog id={`modal_${info._id}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            {info.commentText}
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
                    info.commentText
                  )}
                </td>
                <td className="text-xs lg:text-base">{info.feedback}</td>

                <td>
                  <button
                    onClick={() => handleDeleteComment(info._id)}
                    className="px-4 py-1 bg-gray-200"
                  >
                    <RiDeleteBin2Line className="text-red-600 text-xs lg:text-base" />
                  </button>
                </td>

                {/* warning btn */}
                <td>
                  <button
                    onClick={() => handleWarning(info.email)}
                    className="px-4 py-1 bg-yellow-200 flex mr-2 items-center text-xs lg:text-base"
                  >
                    <RiAlarmWarningLine />
                    Warning
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

export default ReportedActivities;
