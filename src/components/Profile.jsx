import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();

  const [openEdit, setOpenEdit] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen px-3 sm:px-4">
      <Navbar />

      {/* ================= PROFILE CARD ================= */}
      <div className="max-w-4xl mx-auto bg-white shadow-md sm:shadow-lg border border-gray-200 rounded-xl sm:rounded-2xl my-4 sm:my-5 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          
          {/* Avatar + Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Profile Image Dialog */}
            <Dialog open={openProfile} onOpenChange={setOpenProfile}>
              <DialogTrigger asChild>
                <Avatar
                  className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-purple-500 shadow-lg cursor-pointer hover:opacity-80 transition-all"
                  onClick={() => setOpenProfile(true)}
                >
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                  />
                </Avatar>
              </DialogTrigger>

              <DialogContent className="bg-white rounded-xl p-4 sm:p-6 flex items-center justify-center shadow-2xl">
                <DialogTitle className="sr-only">
                  Profile Photo
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Enlarged view of the user profile photo
                </DialogDescription>

                <img
                  src={
                    user?.profile?.profilePhoto ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-60 h-80 sm:w-72 sm:h-96 object-cover rounded-lg border-4 border-purple-500 shadow-lg"
                />
              </DialogContent>
            </Dialog>

            {/* User Info */}
            <div>
              <h1 className="font-bold text-lg sm:text-2xl text-gray-900">
                {user?.fullname}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {user?.profile?.bio || "No bio added yet"}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpenEdit(true)}
            variant="outline"
            className="border-gray-400 text-gray-600 hover:bg-gray-200 w-full sm:w-auto"
          >
            <Pen size={16} className="mr-2" /> Edit
          </Button>
        </div>

        {/* ================= CONTACT INFO ================= */}
        <div className="my-5 sm:my-6 border-t pt-4">
          <div className="flex items-center gap-3 my-2 text-gray-700 text-sm sm:text-base">
            <Mail className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            <span>{user?.email || "No email available"}</span>
          </div>

          <div className="flex items-center gap-3 my-2 text-gray-700 text-sm sm:text-base">
            <Contact className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              {user?.phoneNumber || "No phone number available"}
            </span>
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="my-5 sm:my-6">
          <h1 className="font-semibold text-base sm:text-lg text-gray-800">
            Skills
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item) => (
                <Badge
                  key={item}
                  className="bg-purple-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md shadow-md text-xs sm:text-sm"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600 text-sm">
                No Skills Added
              </span>
            )}
          </div>
        </div>

        {/* ================= RESUME ================= */}
        <div className="mt-5 sm:mt-6">
          <Label className="text-sm sm:text-md font-bold text-gray-800">
  Resume
</Label>

{user?.profile?.resume ? (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href={user?.profile?.resume}
    className="text-blue-600 hover:underline cursor-pointer block mt-1 text-sm sm:text-base"
  >
    View Resume
  </a>
) : (
  <span className="text-gray-600 text-sm">
    No Resume Uploaded
  </span>
)}

        </div>
      </div>

      {/* ================= APPLIED JOBS ================= */}
      <div className="max-w-4xl mx-auto bg-white shadow-md sm:shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-5 sm:mt-6">
        <h1 className="font-bold text-base sm:text-lg text-gray-800 mb-3 sm:mb-4">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>

      {/* ================= UPDATE PROFILE MODAL ================= */}
      <UpdateProfileDialog open={openEdit} setOpen={setOpenEdit} />
    </div>
  );
};

export default Profile;
