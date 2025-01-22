import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReportedActivities = () => {
  const axiosSecure = useAxiosSecure();

  const { data: comments = [] } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axiosSecure.get('/comments');
      console.log(response.data);
      return response.res.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Comments</th>
              <th>Feadback</th>
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
