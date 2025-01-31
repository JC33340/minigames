import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header className="text-center text-xl md:text-2xl lg:text-4xl font-bold py-8">
        <Link to="/" className="bg-[#528AAE] p-4 rounded-lg text-white ">
          Minigames
        </Link>
      </header>
      <div className="flex items-center justify-center px-20 lg:px-40 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
