import { Outlet } from 'react-router';
import Navbar from './Navbar/Navbar';
import Footer from './Layout/Footer';

function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className='pt-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
