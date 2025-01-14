import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="bg-pink-50">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Toaster />
    </div>
  );
};

export default MainLayout;
