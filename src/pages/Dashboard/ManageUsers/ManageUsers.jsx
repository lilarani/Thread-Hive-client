import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });

      return res.data;
    },
  });

  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} is an admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Thread Hive | Manage Users</title>
      </Helmet>
      <div className="space-y-3 p-4">
        <h3 className="text-center text-xl sm:text-2xl font-semibold">
          Manage Users
        </h3>
        <h3 className="text-center text-lg sm:text-xl font-semibold">
          Total Users: {users.length}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-2 sm:px-4 py-2"></th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  User Name
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  User Email
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Role
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Subscription Status (Membership)
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    {index + 1}
                  </th>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {user.role === 'admin' ? (
                      'Admin'
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="bg-[#0f172a] px-2 sm:px-4 py-1"
                      >
                        <FaUsers className="text-white" />
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
