import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdAddBox,
  MdInventory,
  MdInventory2,      // for Products
  MdLocalShipping,   // for Suppliers
  MdNotifications,
  MdSettings,
  MdListAlt,
  MdLogout,
  MdPerson,
} from 'react-icons/md';
<div className="w-64 h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
  {/* ...rest of your sidebar code */}
</div>


export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-800">MediFlow</h1>
        </div>
        

        <nav className="mt-6 flex flex-col gap-2 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/add-inventory"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdAddBox size={20} />
            Add Inventory
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdInventory size={20} />
            Inventory
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdInventory2 size={20} />
            Products
          </NavLink>

          <NavLink
            to="/suppliers"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdLocalShipping size={20} />
            Suppliers
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdListAlt size={20} />
            Orders
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdNotifications size={20} />
            Notifications
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdListAlt size={20} />
            Reports
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-semibold ${
                isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600'
              }`
            }
          >
            <MdSettings size={20} />
            Settings
          </NavLink>
        </nav>
      </div>

      <div className="border-t border-gray-200 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-700 font-bold">
            A
          </div>
          <div>
            <p className="font-semibold text-gray-800">anushka.99250</p>
            <p className="text-xs text-gray-500">anushka.99250@gmail.com</p>
          </div>
        </div>

        <button className="text-left text-gray-700 hover:text-teal-600 font-semibold flex items-center gap-2">
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
