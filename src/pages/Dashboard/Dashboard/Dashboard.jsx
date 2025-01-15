import { GrUserAdmin, GrUserManager } from 'react-icons/gr';
import { MdOutlineReportProblem } from 'react-icons/md';
import { TfiAnnouncement } from 'react-icons/tfi';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex ">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-[#0f172a] ">
        <ul className="menu  text-base font-semibold text-gray-200">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to={'/dashboard/adminProfile'}
                  className={({ isActive }) =>
                    isActive ? 'bg-pink-500 text-black' : ''
                  }
                >
                  <GrUserAdmin />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/manageUsers'}
                  className={({ isActive }) =>
                    isActive ? 'bg-pink-500 text-black' : ''
                  }
                >
                  <GrUserManager />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/myPost'}
                  className={({ isActive }) =>
                    isActive ? 'bg-pink-500 text-black' : ''
                  }
                >
                  <MdOutlineReportProblem />
                  Reported Comments/Activities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/myPost'}
                  className={({ isActive }) =>
                    isActive ? 'bg-pink-500 text-black' : ''
                  }
                >
                  <TfiAnnouncement />
                  Make Announcement
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>

        {/* shared nav links */}
        <div className="w-full h-[1px] bg-gray-300 mt-7"></div>
        <ul className=" menu p-4 text-base font-semibold text-gray-200">
          <li>
            <NavLink to={'/'} className={'text-white '}>
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1 p-4 bg-pink-50">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
