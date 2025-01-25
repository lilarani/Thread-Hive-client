import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Membarship from '../pages/Membarship/Membarship';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivetRouter from './PrivetRouter';
import Dashboard from '../layouts/Dashboard/Dashboard';
import AddPost from '../pages/Dashboard/AddPost/AddPost';
import MyProfile from '../pages/Dashboard/MyProfile/MyProfile';
import MyPost from '../pages/Dashboard/MyPost/MyPost';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import AdminRouter from './AdminRouter';
import Announcement from '../pages/Dashboard/Announcement/Announcement';
import ReportedActivities from '../pages/Dashboard/ReportedActivities/ReportedActivities';
import AllComment from '../pages/Dashboard/AllComment/AllComment';
import AdminProfile from '../pages/Dashboard/AdminProfile/AdminProfile';
import PostDetails from '../pages/PostDetails/PostDetails';
import Notification from '../pages/Notification/Notification';
import Warnings from '../pages/Warnings/Warnings';
import Errpage from './../pages/Errpage/Errpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <Errpage></Errpage>,
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
        element: <Notification></Notification>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'signUp',
        element: <SignUp></SignUp>,
      },
      {
        path: 'post-details/:id',
        element: <PostDetails></PostDetails>,
      },
      {
        path: 'warnings',
        element: <Warnings></Warnings>,
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

      {
        path: 'announcement',
        element: (
          <AdminRouter>
            <Announcement></Announcement>
          </AdminRouter>
        ),
      },
      {
        path: 'reportedActivities',
        element: (
          <AdminRouter>
            <ReportedActivities></ReportedActivities>
          </AdminRouter>
        ),
      },
      {
        path: 'adminProfile',
        element: (
          <AdminRouter>
            <AdminProfile></AdminProfile>
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
      {
        path: 'allComment/:id',
        element: (
          <PrivetRouter>
            <AllComment></AllComment>
          </PrivetRouter>
        ),
      },
    ],
  },
]);

export default router;
