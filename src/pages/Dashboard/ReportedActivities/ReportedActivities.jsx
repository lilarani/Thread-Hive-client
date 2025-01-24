import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiAlarmWarningLine, RiDeleteBin2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

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
        console.log(res.data);
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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
                <th>{index + 1}</th>
                <td>{info.email}</td>
                <td className="text-sm">{info.commentText}</td>
                <td className="text-sm">{info.feedback}</td>
                <td>
                  <button
                    onClick={() => handleDeleteComment(info._id)}
                    className="px-4 py-1 bg-gray-200"
                  >
                    <RiDeleteBin2Line className="text-red-600 text-xl" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleWarning(info.email)}
                    className="px-4 py-1 bg-yellow-200 flex mr-2 items-center"
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
