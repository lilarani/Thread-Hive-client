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

    // Fetch the total post, comment, and user counts from your server
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
    <div>
      <Helmet>
        <title>Thread Hive | Admin Profile</title>
      </Helmet>
      <div className="md:w-3/6 h-auto  mx-auto shadow-md p-8">
        <div className="flex flex-col justify-center items-center space-y-2">
          <img
            src={myInfo.userPhoto}
            alt="User Photo"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-2xl font-bold">{myInfo.name}</h2>
          <p className="text-xl font-semibold">{myInfo.email}</p>
          <div className="flex">
            <p className="font-semibold text-xl mr-2">Badge:</p>
            <img
              className="w-8 h-8 rounded-full"
              src={myInfo.badge}
              alt="Badge"
            />
          </div>
        </div>
      </div>
      {/* add tags*/}
      <div className="my-16 mx-auto flex flex-col justify-center items-center space-y-4">
        <h2 className="font-bold text-xl text-center">Add New Tag</h2>
        <form
          className="w-3/6  p-4 rounded-lg shadow-md"
          onSubmit={handleAddTag} // Use onSubmit for the form
        >
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
              className="w-full p-2 border border-pink-300 focus:border-pink-300 rounded-lg outline-none"
              placeholder="Enter tag name"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit" // Submit the form when the button is clicked
              className="bg-bgButton text-white py-2 px-6 rounded-lg hover:bg-pink-600 font-semibold"
            >
              Add Tag
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 w-3/6 mx-auto">
        <h3 className="text-xl font-bold text-center mb-4">
          Site Stats Pie Chart
        </h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AdminProfile;
