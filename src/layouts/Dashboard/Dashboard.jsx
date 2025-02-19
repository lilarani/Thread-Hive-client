import { GrUserAdmin, GrUserManager } from 'react-icons/gr';
import {
  MdOutlineReportProblem,
  MdSignpost,
  MdOutlinePostAdd,
} from 'react-icons/md';
import { TfiAnnouncement } from 'react-icons/tfi';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth';
import { FaHome } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { theme } = useAuth();

  return (
    <div className="flex flex-col md:flex-row  ">
      {/* Dashboard Side Bar */}

      <div className="w-full md:w-64 min-h-screen bg-[#0f172a]  ">
        <ul className="menu text-xs md:text-base font-semibold text-gray-200">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to={'/dashboard/adminProfile'}
                  className={({ isActive }) =>
                    isActive ? 'bg-bgButton text-black' : ''
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
                    isActive ? 'bg-bgButton text-black' : ''
                  }
                >
                  <GrUserManager />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/reportedActivities'}
                  className={({ isActive }) =>
                    isActive ? 'bg-bgButton text-black' : ''
                  }
                >
                  <MdOutlineReportProblem />
                  Reported Comments/Activities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/announcement'}
                  className={({ isActive }) =>
                    isActive ? 'bg-bgButton text-black' : ''
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
                    isActive ? 'bg-bgButton text-black' : ''
                  }
                >
                  <ImProfile />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/addPost'}
                  className={({ isActive }) =>
                    isActive ? 'bg-bgButton text-black' : ''
                  }
                >
                  <MdOutlinePostAdd />
                  Add Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/myPost'}
                  className={({ isActive }) =>
                    isActive ? 'bg-bgButton text-black' : ''
                  }
                >
                  <MdSignpost />
                  My Posts
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Shared Nav Links */}
        <div className="w-full h-[1px] bg-gray-300 mt-7"></div>
        <ul className="menu p-4 text-base font-semibold text-gray-200">
          <li>
            <NavLink to={'/'} className={'text-white'}>
              <FaHome />
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div
        className={`flex-1 p-4 ${
          theme === 'dark' ? 'bg-white text-black' : ''
        }`}
      >
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
