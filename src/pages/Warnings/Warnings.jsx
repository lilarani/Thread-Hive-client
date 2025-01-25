import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Warnings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: warnings = [], refetch } = useQuery({
    queryKey: ['warnings'],
    queryFn: async () => {
      const response = await axiosSecure.get('/warnings');
      return response.data;
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Warnings</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {warnings.length === 0 ? (
          <p className="text-center text-gray-500">No warnings available.</p>
        ) : (
          <ul>
            {warnings.map((warning, index) => (
              <li
                key={index}
                className="mb-4 p-4 border-b last:border-b-0 flex flex-col bg-pink-50 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {moment(post.date).fromNow()}
                  </span>
                </div>
                <p className="text-gray-700">{warning.warning}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Warnings;
