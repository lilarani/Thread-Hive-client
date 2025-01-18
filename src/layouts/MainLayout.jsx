import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Toaster />
    </div>
  );
};

export default MainLayout;
