import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Membarship from '../pages/Membarship/Membarship';
import { BiNotification } from 'react-icons/bi';
import Login from '../pages/Login/Login';

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
    ],
  },
]);

export default router;
