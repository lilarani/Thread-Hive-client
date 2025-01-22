import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportedActivities = () => {
  const axiosSecure = useAxiosSecure();

  const { data: comments = [] } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axiosSecure.get('/comments');
      console.log(response.data);
      return response.data;
    },
  });

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedActivities;
