
import { Link, useLocation, useNavigate } from "react-router"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { logout } from "../slices/userSlice";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return null
  }

  const isAdmin = user.isAdmin === true
  const dashboardPath = isAdmin ? "/dashboard/admin" : "/dashboard/user"

  const handleLogout = async () => {
    navigate("/")
    dispatch(logout());
    await fetch(`${BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const navigation = [
    {
      name: "Dashboard",
      href: dashboardPath,
      icon: () => <MenuIcon />,
      current: location.pathname.includes("/dashboard"),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: () => <AccountCircleIcon />,
      current: location.pathname === "/profile",
    },
  ]

  return (
    <div className="bg-gray-50">
      <div className="fixed top-0 left-0">
        <button
          className="m-2 p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CloseIcon />
          ) : (
            <MenuIcon />
          )}
        </button>
      </div>


      {/* Sidebar */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-500 text-white rounded absolute top-2 left-2"
        >
            <MenuIcon />
        </button>

        <div
          className={`fixed inset-0 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } bg-gray-300  w-64 h-full`}
        >
          <div className="flex items-center justify-center h-16 border-b">
            <Link to="/">
              <span className="font-bold pl-5">TicketDesk</span>
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-500 text-white rounded absolute top-2 left-2"
          >
             <CloseIcon />
          </button>
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${item.current ? "bg-blue-600 text-white" : "text-black hover:bg-gray-100"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon />
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 mt-10 border-t">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user.name?.charAt(0) || "U"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-700">{user.email}</p>
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-end px-4">
          <h1 className="text-lg font-semibold">{isAdmin ? "Admin Dashboard" : "User Dashboard"}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

