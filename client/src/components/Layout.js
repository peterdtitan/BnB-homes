import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiHomeModern } from 'react-icons/hi2';
import { HiDocumentRemove } from 'react-icons/hi';
import { RiReservedFill, RiFileList3Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { clearUser } from '../redux/user/userSlice';
import './Layout.css';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    setIsSidebarOpen(false);
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <button
          type="button"
          onClick={closeSidebar}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-1.414a6 6 0 110-8.485L9.9 9.899 6.414 6.414a1 1 0 011.414-1.414L11 8.172l3.486-3.486a1 1 0 111.414 1.414L12.414 9.9l3.486 3.486a1 1 0 01-1.414 1.414L11 11.628l-3.486 3.486z"
            />
          </svg>
        </button>

        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-evenly">
          <div className="h-16 p-2 bg-red-400">
            <h1 className="text-4xl font-bold tracking-widest">BnB</h1>
          </div>

          <ul className="space-y-2 font-medium mt-12">
            <li>
              <Link
                to="/Home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => toggleSidebar()}
              >
                <HiHomeModern className="text-gray-300" size={25} />
                <span className="ml-3">Homes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Reservations"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => toggleSidebar()}
              >
                <RiReservedFill className="text-gray-300" size={25} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  My Reservations
                </span>
              </Link>
            </li>

            {/* Removed the '/Reserve path' not sure of the use case. */}

            <li>
              <Link
                to="/AddHome"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => toggleSidebar()}
              >
                <RiFileList3Fill className="text-gray-300" size={25} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  List Your Home
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="RemoveHome"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => toggleSidebar()}
              >
                <HiDocumentRemove className="text-gray-300" size={25} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Remove Home
                </span>
              </Link>
            </li>

            <li>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 -ml-12 whitespace-nowrap"
                >
                  Sign Out
                </button>
              </p>
            </li>
          </ul>

          <div className="flex items-center justify-between gap-4 mt-auto">
            <p className="h-8 w-8 bg-red-200 rounded-full" />
            <p className="h-8 w-8 bg-red-200 rounded-full" />
            <p className="h-8 w-8 bg-red-200 rounded-full" />
          </div>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
