import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [myInfo, setMyInfo] = useState('');

  useEffect(() => {
    axiosSecure.get(`/users/${user.email}`).then(res => {
      setMyInfo(res.data);
    });
  }, []);

  return (
    <div className="md:w-3/6 h-96 bg-pink-100 mx-auto shadow-md">
      <div className="flex flex-col justify-center items-center p-8 space-y-2">
        <img
          src={myInfo.userPhoto}
          alt=""
          className="w-24 h-24 rounded-full "
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
  );
};

export default AdminProfile;
