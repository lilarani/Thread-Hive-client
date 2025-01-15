import useAuth from '../../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto p-8">
      <div className="w-3/6 h-96 bg-pink-100 mx-auto shadow-md">
        <div className="flex flex-col justify-center items-center p-8 space-y-2">
          {user ? (
            <img
              src={user && user?.photoURL}
              alt=""
              className="w-24 h-24 rounded-full "
            />
          ) : (
            ''
          )}
          <h2 className="text-xl font-semibold">{user?.displayName}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
