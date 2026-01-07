import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setloading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setloading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success("Signup successful!");
        navigate("/login");
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
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-md p-4 sm:p-6 my-6 sm:my-10"
        >
          <h1 className="font-bold text-lg sm:text-xl mb-4 sm:mb-5 text-center">
            Sign Up
          </h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input name="fullname" value={input.fullname} onChange={changeEventHandler} />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input name="email" type="email" value={input.email} onChange={changeEventHandler} />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input name="phone" value={input.phone} onChange={changeEventHandler} />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input name="password" type="password" value={input.password} onChange={changeEventHandler} />
          </div>

          {/* ✅ Role Dropdown */}
          <div className="my-4">
            <Label>Role</Label>
            <Select onValueChange={(value) => setInput({ ...input, role: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
             <SelectContent className="bg-white border border-gray-200 shadow-lg">
  <SelectItem value="job-seeker">Job Seeker</SelectItem>
  <SelectItem value="Recruiter">Recruiter</SelectItem>
</SelectContent>

            </Select>
          </div>

          <div className="my-4">
            <Label>Profile Photo</Label>
            <input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4 py-2">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 py-2 text-white bg-black">
              Signup
            </Button>
          )}

          <span className="text-xs sm:text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
