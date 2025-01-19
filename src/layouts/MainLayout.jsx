import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Toaster />
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
