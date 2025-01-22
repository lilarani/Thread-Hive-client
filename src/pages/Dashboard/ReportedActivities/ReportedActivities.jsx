import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiDeleteBin2Line } from 'react-icons/ri';
import useUsers from '../../../hooks/useUsers';
import Swal from 'sweetalert2';

const ReportedActivities = () => {
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useUsers();
  console.log(users);

  const { data: comments = [] } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axiosSecure.get('/comments');
      return response.data;
    },
  });

  // delete the users

  const handleDeleteUsers = id => {
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
        axiosSecure.delete(`/users/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        });
      }
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
              <th>Delete Users</th>
              <th>Post Remove</th>
              <th>Warning</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((info, index) => (
              <tr key={info._id}>
                <th>{index + 1}</th>
                <td>{info.email}</td>
                <td>{info.commentText}</td>
                <td>{info.feedback}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUsers(info._id)}
                    className="px-4 py-1 bg-gray-200"
                  >
                    <RiDeleteBin2Line className="text-red-600 text-2xl" />
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
