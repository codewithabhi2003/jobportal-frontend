import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import { PopoverContent } from '@radix-ui/react-popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatus = [
    { label: "Accepted", icon: <CheckCircle className="text-green-500 w-4 h-4 mr-2" /> },
    { label: "Rejected", icon: <XCircle className="text-red-500 w-4 h-4 mr-2" /> },
];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-x-auto">
            <Table className="min-w-[900px] w-full border border-gray-200 rounded-lg">
                <TableCaption className="text-gray-500 text-xs sm:text-sm mt-2">
                    A list of your recent applicants
                </TableCaption>

                {/* Table Header */}
                <TableHeader className="bg-gray-100">
                    <TableRow className="text-gray-700 font-semibold">
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4">
                            Profile Photo
                        </TableHead>
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4">
                            Full Name
                        </TableHead>
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4">
                            Email
                        </TableHead>
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4">
                            Contact
                        </TableHead>
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4">
                            Resume
                        </TableHead>
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4">
                            Date
                        </TableHead>
                        <TableHead className="py-2 sm:py-3 px-3 sm:px-4 text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow
                            key={item._id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            {/* Profile Photo Column */}
                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4">
                                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 shadow-md">
                                    <AvatarImage
                                        src={item?.applicant?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                                        alt={item?.applicant?.fullname || "User"}
                                    />
                                </Avatar>
                            </TableCell>

                            {/* Full Name Column */}
                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base">
                                {item?.applicant?.fullname || "N/A"}
                            </TableCell>

                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base">
                                {item?.applicant?.email || "N/A"}
                            </TableCell>

                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base">
                                {item?.applicant?.phoneNumber || "N/A"}
                            </TableCell>

                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4">
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 text-sm sm:text-base font-medium hover:underline"
                                        href={item.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View
                                    </a>
                                ) : (
                                    <span className="text-gray-400 text-sm">
                                        N/A
                                    </span>
                                )}
                            </TableCell>

                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                                {item?.createdAt?.split("T")[0]}
                            </TableCell>

                            <TableCell className="py-2 sm:py-3 px-3 sm:px-4 text-right">
                                <Popover>
                                    <PopoverTrigger className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition">
                                        <MoreHorizontal className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 sm:w-40 bg-white shadow-md rounded-lg p-2">
                                        {shortlistingStatus.map((status, indx) => (
                                            <div
                                                key={indx}
                                                onClick={() => statusHandler(status.label, item?._id)}
                                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition"
                                            >
                                                {status.icon}
                                                <span>{status.label}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
