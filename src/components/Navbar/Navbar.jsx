import { IoMdNotifications } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import logo from '../../assets/Images/logo-thread-hive.jpg';
import useAnnouncement from '../../hooks/useAnnouncement';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { user, signOutUser, toggleTheme, theme } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [announcements] = useAnnouncement();

  const [isAdmin] = useAdmin();

  const handleSignOut = () => {
    signOutUser()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // get the warnings data
  const { data: warnings = [] } = useQuery({
    queryKey: ['warnings'],
    queryFn: async () => {
      const response = await axiosSecure.get('/warnings');
      return response.data;
    },
  });

  // dropdown toggle
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // nav options
  const navOptions = (
    <>
      <li>
        {theme === 'dark' ? (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-bgButton hover:bg-[#1c9cdc] text-white'
                : 'hover:text-purple-500'
            }
            to={'/'}
          >
            Home
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-black hover:bg-[#1b0404] text-white' : ''
            }
            to={'/'}
          >
            Home
          </NavLink>
        )}
      </li>
      <li>
        {theme === 'dark' ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-bgButton hover:bg-[#1c9cdc] text-white' : ''
            }
            to={'/my-posts'}
          >
            Posts
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-black hover:bg-[#1b0404] text-white' : ''
            }
            to={'/my-posts'}
          >
            Posts
          </NavLink>
        )}
      </li>
      <li>
        {theme === 'dark' ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-bgButton hover:bg-[#1c9cdc] text-white' : ''
            }
            to={'/membership'}
          >
            Membership
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-black hover:bg-[#1b0404] text-white' : ''
            }
            to={'/membership'}
          >
            Membership
          </NavLink>
        )}
      </li>
      <li>
        {theme === 'dark' ? (
          <NavLink
            to={'/notification'}
            className={({ isActive }) =>
              isActive ? 'bg-bgButton  hover:bg-[#1c9cdc] text-white' : ''
            }
          >
            <IoMdNotifications className="text-xl" />
            {announcements.length}
          </NavLink>
        ) : (
          <NavLink
            to={'/notification'}
            className={({ isActive }) =>
              isActive ? 'bg-black hover:bg-[#1b0404] text-white' : ''
            }
          >
            <IoMdNotifications className="text-xl" />
            {announcements.length}
          </NavLink>
        )}
      </li>
      <li>
        {theme === 'dark' ? (
          <NavLink
            to={'/policy'}
            className={({ isActive }) =>
              isActive ? 'bg-bgButton hover:bg-[#1c9cdc] text-white' : ''
            }
          >
            Terms & Policies
          </NavLink>
        ) : (
          <NavLink
            to={'/policy'}
            className={({ isActive }) =>
              isActive ? 'bg-black hover:bg-[#1b0404] text-white' : ''
            }
          >
            Terms & Policies
          </NavLink>
        )}
      </li>
      {warnings.length > 0 && (
        <li>
          {theme === 'dark ' ? (
            <NavLink
              to={'/warnings'}
              className={({ isActive }) =>
                isActive ? 'bg-bgButton hover:bg-[#1c9cdc]' : ''
              }
            >
              Warnings
            </NavLink>
          ) : (
            <NavLink
              to={'/warnings'}
              className={({ isActive }) =>
                isActive ? 'bg-black hover:bg-[#1b0404] text-white' : ''
              }
            >
              Warnings
            </NavLink>
          )}
        </li>
      )}
    </>
  );
  return (
    <div className="bg-white/50% sticky top-0 z-50 shadow-md backdrop-blur-md">
      <div className="navbar container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow font-semibold ${
                theme === 'dark'
                  ? 'text-white bg-black'
                  : ' bg-base-100 text-black'
              }`}
            >
              {navOptions}
            </ul>
          </div>
          <Link to={'/'}>
            <img className="w-10 h-10 rounded-full mr-2" src={logo} alt="" />
          </Link>
          <a className="text-sm md:text-xl font-bold">Thread Hive</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold ">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="pr-6 md:pr-14">
            <input
              onClick={toggleTheme}
              type="checkbox"
              className="toggle"
              defaultChecked
            />
          </div>

          {user ? (
            <div className="flex flex-row gap-2">
              <img
                className="w-12 h-12 rounded-full cursor-pointer"
                src={user && user?.photoURL}
                alt=""
                onClick={toggleDropdown}
              />
              {dropdown && (
                <ul
                  className={`absolute right-8 top-16 text-center ${
                    theme === 'dark'
                      ? 'bg-black text-white'
                      : 'bg-white text-black '
                  } rounded shadow-lg mt-2 w-52 p-4 z-50`}
                >
                  <div className=" flex flex-col justify-center items-center">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={user && user?.photoURL}
                      alt=""
                    />
                  </div>
                  <li className="px-4 py-2 border-b font-semibold">
                    {user?.displayName || 'User'}
                  </li>
                  <li>
                    {user && (
                      <NavLink
                        to={
                          isAdmin
                            ? '/dashboard/manageUsers'
                            : '/dashboard/myPost'
                        }
                        className="block px-4 py-1 hover:bg-bgButton font-semibold transition-all ease-in-out duration-300 hover:text-white"
                        onClick={() => setDropdown(false)}
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setDropdown(false);
                      }}
                      className="block w-full  px-4 py-1 hover:bg-bgButton font-semibold hover:text-white  transition-all ease-in-out duration-300"
                    >
                      Sign-Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to={'/login'}
              className="px-4 py-1 bg-pink-100 font-semibold text-black shadow-md"
            >
              Join US
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
