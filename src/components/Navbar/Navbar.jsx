import { IoMdNotifications } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [dropdown, setDropdown] = useState(false);

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

  // dropdown toggle
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const navOptions = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/membership'}>Membership</NavLink>
      </li>
      <li>
        <NavLink to={'/notification'}>
          <IoMdNotifications className="text-xl" />
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar border-b-2 sticky top-0 z-50 container mx-auto backdrop:blur">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <a className="text-xl">Thread Hive</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <h2>{}</h2>

        {user ? (
          <div className="flex flex-row gap-2">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={user && user?.photoURL}
              alt=""
              onClick={toggleDropdown}
            />
            {dropdown && (
              <ul className="absolute right-8 top-16 text-center bg-pink-100 text-black rounded shadow-lg mt-2 w-52 p-4 z-50">
                <div className=" flex flex-col justify-center items-center">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={user && user?.photoURL}
                    alt=""
                  />
                </div>
                <li className="px-4 py-2 border-b text-gray-700 font-semibold">
                  {user?.displayName || 'User'}
                </li>
                <li>
                  {user && (
                    <NavLink
                      to={
                        isAdmin ? '/dashboard/manageUsers' : '/dashboard/myPost'
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
            className="px-4 py-1 bg-pink-100 font-semibold text-base shadow-md"
          >
            Join US
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
