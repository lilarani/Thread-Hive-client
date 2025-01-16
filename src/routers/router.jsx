import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Membarship from '../pages/Membarship/Membarship';
import { BiNotification } from 'react-icons/bi';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivetRouter from './PrivetRouter';
import Dashboard from '../layouts/Dashboard/Dashboard';
import AddPost from '../pages/Dashboard/AddPost/AddPost';
import MyProfile from '../pages/Dashboard/MyProfile/MyProfile';
import MyPost from '../pages/Dashboard/MyPost/MyPost';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import AdminRouter from './AdminRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'membership',
        element: <Membarship></Membarship>,
      },
      {
        path: 'notification',
        element: <BiNotification></BiNotification>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'signUp',
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivetRouter>
        <Dashboard></Dashboard>
      </PrivetRouter>
    ),

    children: [
      // admin related routes
      {
        path: 'manageUsers',
        element: (
          <AdminRouter>
            <ManageUsers></ManageUsers>
          </AdminRouter>
        ),
      },

      // user related routes
      {
        path: 'addPost',
        element: (
          <PrivetRouter>
            <AddPost></AddPost>
          </PrivetRouter>
        ),
      },
      {
        path: 'myProfile',
        element: (
          <PrivetRouter>
            <MyProfile></MyProfile>
          </PrivetRouter>
        ),
      },
      {
        path: 'myPost',
        element: (
          <PrivetRouter>
            <MyPost></MyPost>
          </PrivetRouter>
        ),
      },
    ],
  },
]);

export default router;
