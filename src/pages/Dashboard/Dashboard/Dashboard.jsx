import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex bg-pink-50">
      <div className="w-64 min-h-screen bg-[#0f172a] ">
        <ul className="menu p-4 text-xl font-semibold text-gray-200">
          <li>
            <NavLink
              to={'/dashboard/myProfile'}
              className={({ isActive }) =>
                isActive ? 'bg-pink-500 text-black' : ''
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/dashboard/addPost'}
              className={({ isActive }) =>
                isActive ? 'bg-pink-500 text-black' : ''
              }
            >
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/dashboard/myPost'}
              className={({ isActive }) =>
                isActive ? 'bg-pink-500 text-black' : ''
              }
            >
              My Posts
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
