import { IoMdNotifications } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOut = () => {
    signOutUser()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error.message);
      });
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
        <a className="btn btn-ghost text-xl">Thread Hive</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <h2>{}</h2>

        {user ? (
          <div className="flex flex-row gap-2">
            <img
              className="w-12 h-12 rounded-full"
              src={user && user?.photoURL}
              alt=""
            />

            <button
              onClick={handleSignOut}
              className="text-sm md:text-base font-bold"
            >
              Sign-Out
            </button>
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
