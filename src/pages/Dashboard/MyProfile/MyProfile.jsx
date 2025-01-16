import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MyProfile = () => {
  const { user } = useAuth();
  const axiospublic = useAxiosPublic();
  const [myInfo, setMyInfo] = useState('');

  useEffect(() => {
    axiospublic.get(`/users/${user.email}`).then(res => {
      console.log(res.data);
      setMyInfo(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="w-3/6 h-96 bg-pink-100 mx-auto shadow-md">
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
    </div>
  );
};

export default MyProfile;
