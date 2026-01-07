import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  /* ================= FILTER ================= */
  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  /* ================= DELETE ================= */
  const deleteJobHandler = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job deleted successfully");
        setFilterJobs((prev) =>
          prev.filter((job) => job._id !== jobId)
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete job"
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Posted Jobs
      </h2>

      <div className="w-full overflow-x-auto">
        <Table className="min-w-[700px] border-collapse">
          <TableCaption className="text-gray-500 text-xs sm:text-sm">
            A list of your recent posted jobs
          </TableCaption>

          <TableHeader className="bg-gray-200 text-gray-700">
            <TableRow>
              <TableHead className="p-3 sm:p-4 text-left">
                Logo
              </TableHead>
              <TableHead className="p-3 sm:p-4 text-left">
                Company Name
              </TableHead>
              <TableHead className="p-3 sm:p-4 text-left">
                Role
              </TableHead>
              <TableHead className="p-3 sm:p-4 text-left">
                Date
              </TableHead>
              <TableHead className="p-3 sm:p-4 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs?.map((job, index) => (
              <TableRow
                key={job._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                {/* LOGO */}
                <TableCell className="p-3 sm:p-4">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 shadow-md">
                    <AvatarImage
                      src={
                        job?.company?.logo || "/default-logo.png"
                      }
                    />
                  </Avatar>
                </TableCell>

                {/* COMPANY */}
                <TableCell className="p-3 sm:p-4 text-sm sm:text-base text-gray-900">
                  {job?.company?.name}
                </TableCell>

                {/* TITLE */}
                <TableCell className="p-3 sm:p-4 text-sm sm:text-base font-medium text-gray-800">
                  {job?.title}
                </TableCell>

                {/* DATE */}
                <TableCell className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="p-3 sm:p-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-200 p-1.5 sm:p-2 rounded-full transition"
                      >
                        <MoreHorizontal className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-40 sm:w-44 p-2 bg-white shadow-xl rounded-lg space-y-2">
                      {/* EDIT */}
                      <Button
                        onClick={() =>
                          navigate(`/admin/jobs/edit/${job._id}`)
                        }
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                      >
                        <Edit2 className="w-4" />
                        Edit
                      </Button>

                      {/* APPLICANTS */}
                      <Button
                        onClick={() =>
                          navigate(
                            `/admin/jobs/${job._id}/applicants`
                          )
                        }
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded-md"
                      >
                        <Eye className="w-4" />
                        Applicants
                      </Button>

                      {/* DELETE */}
                      <Button
                        onClick={() => deleteJobHandler(job._id)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded-md"
                      >
                        <Trash2 className="w-4" />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;
