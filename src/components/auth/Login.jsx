import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setloading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setloading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setloading(false));
    }
  };

  useEffect(() =>{
    if (user){
      navigate("/"); 
    }
  },[]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto p-4 sm:p-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg border border-gray-200 rounded-md p-4 sm:p-6 my-6 sm:my-10"
        >
          <h1 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-center">
            Login
          </h1>

          {/* Email */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:border-blue-500"
            />
          </div>

          {/* ✅ Role Dropdown */}
          <div className="my-4">
            <Label>Role</Label>
            <Select onValueChange={(value) => setInput({ ...input, role: value })}>
              <SelectTrigger className="mt-1 bg-white border border-gray-300 rounded-md">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="job-seeker">Job Seeker</SelectItem>
                <SelectItem value="Recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loader and Button */}
          {loading ? (
            <Button className="w-full my-4 py-2">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 py-2 text-white bg-black active:bg-gray-800"
            >
              Login
            </Button>
          )}

          {/* Signup Link */}
          <span className="text-xs sm:text-sm block text-center">
            Don't have an account?{" "}
            <Link to="/Singup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

