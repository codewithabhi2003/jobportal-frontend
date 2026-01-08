import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setOpenMenu(false);
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleAboutClick = () => {
    if (location.pathname === "/") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "about" } });
    }
    setOpenMenu(false);
  };

  return (
    <header className="w-full bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">

        {/* LEFT - MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpenMenu(prev => !prev)}   // ✅ TOGGLE FIX
          aria-label="Toggle menu"
        >
          {openMenu ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* LOGO */}
        <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* ===== DESKTOP MENU ===== */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex gap-6 font-medium text-gray-700">
              {user?.role === "Recruiter" ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li onClick={handleAboutClick} className="cursor-pointer">About</li> {/* ✅ 2nd */}
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/bookmark">Bookmark</Link></li>
                </>
              )}
            </ul>

            {!user ? (
              <div className="flex gap-3">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] text-white">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-56 bg-white border shadow-lg rounded-lg">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User2 size={18} /> View Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* ===== MOBILE RIGHT AUTH ===== */}
          {!user ? (
            <div className="md:hidden flex gap-2">
              <Link to="/login">
                <Button size="sm" variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-[#6A38C2] text-white">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="md:hidden cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-44 bg-white border shadow-lg rounded-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  View Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-red-600 w-full text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {openMenu && (
        <div className="absolute top-16 left-0 w-72 bg-white shadow-xl border rounded-br-xl">
          <nav className="flex flex-col divide-y">
            <Link onClick={() => setOpenMenu(false)} to="/" className="px-4 py-3">
              Home
            </Link>
            <button onClick={handleAboutClick} className="px-4 py-3 text-left">
              About
            </button>
            <Link onClick={() => setOpenMenu(false)} to="/jobs" className="px-4 py-3">
              Jobs
            </Link>
            <Link onClick={() => setOpenMenu(false)} to="/bookmark" className="px-4 py-3">
              Bookmark
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
