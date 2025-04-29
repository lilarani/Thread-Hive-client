import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

// Registering Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [myInfo, setMyInfo] = useState('');
  const [chartData, setChartData] = useState({
    labels: ['Posts', 'Comments', 'Users'],
    datasets: [
      {
        label: 'Site Stats',
        data: [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then(res => {
      setMyInfo(res.data);
    });

    axiosSecure
      .get('/stats')
      .then(response => {
        setChartData(prevState => ({
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: [
                response.data.posts,
                response.data.comments,
                response.data.users,
              ],
            },
          ],
        }));
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }, [user.email, axiosSecure]);

  const handleAddTag = e => {
    e.preventDefault();
    const tagName = e.target.tagName.value;
    const tag = { tagName };
    axiosSecure
      .post('/tags', tag)
      .then(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tag Added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
      })
      .catch(err => {
        toast.error('Failed Tag Added!');
      });
  };

  return (
    <div className="p-4 sm:p-10">
      <Helmet>
        <title>Thread Hive | Admin Profile</title>
      </Helmet>

      {/* Profile Section */}
      <div className="max-w-full sm:max-w-5xl text-left mb-10">
        <img
          src={myInfo.userPhoto}
          alt="User Photo"
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full"
        />
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">{myInfo.name}</h2>
        <p className="text-base sm:text-lg text-gray-700">{myInfo.email}</p>
        <div className="flex items-center mt-2">
          <p className="font-semibold text-base sm:text-xl mr-2">Badge:</p>
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            src={myInfo.badge}
            alt="Badge"
          />
        </div>
      </div>

      {/* Add Tag Form */}
      <div className="max-w-full sm:max-w-2xl p-4 sm:p-6 bg-gray-100 rounded-lg mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Add New Tag</h2>
        <form onSubmit={handleAddTag}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="tagName"
            >
              Tag Name
            </label>
            <input
              type="text"
              id="tagName"
              name="tagName"
              className="w-full p-2 sm:p-3 border border-gray-400 rounded-lg outline-none"
              placeholder="Enter tag name"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-bgButton text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-pink-600 font-semibold"
          >
            Add Tag
          </button>
        </form>
      </div>

      {/* Chart Section */}
      <div className="max-w-full sm:max-w-3xl">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Site Stats</h3>
        <div className="w-full sm:w-80">
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
