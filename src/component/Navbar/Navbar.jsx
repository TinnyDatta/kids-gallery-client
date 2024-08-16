import { Link } from "react-router-dom";

const Navbar = () => {
    return (
          <div className="navbar bg-orange-100 my-6 rounded-xl">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to='/'>Products</Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-2xl font-bold text-orange-500">Kids Gallery</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to='/' className="font-bold text-orange-400">Products</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to='/login' className="btn mr-3 font-bold text-white bg-orange-300">Login</Link>
    <Link to='/register' className="btn font-bold text-white bg-orange-300">Register</Link>
  </div>
</div>  
    );
};

export default Navbar;