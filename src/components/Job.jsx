import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysagoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 transition hover:shadow-xl">
            
            {/* Top Section */}
            <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-500">
                    {daysagoFunction(job?.createdAt) == 0
                        ? "Today"
                        : `${daysagoFunction(job?.createdAt)} days ago`}
                </p>

                <Button
                    className="rounded-full bg-transparent hover:bg-gray-100 active:bg-gray-300 transition duration-150"
                    size="icon"
                >
                    <Bookmark className="text-gray-600 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4">
                <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 shadow-sm">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>

                <div>
                    <h1 className="font-semibold text-base sm:text-lg text-gray-900">
                        {job?.company?.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        India
                    </p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className="my-3 sm:my-4">
                <h1 className="font-bold text-lg sm:text-xl text-gray-900">
                    {job?.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {job?.discription}
                </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
                <Badge className="bg-gray-100 text-blue-700 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                    {job?.position} position
                </Badge>

                <Badge className="bg-gray-100 text-[#F83002] font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                    {job.jobType}
                </Badge>

                <Badge className="bg-gray-100 text-[#7209b7] font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-300 px-4 sm:px-5 py-2 rounded-lg transition text-sm"
                >
                    Details
                </Button>

                <Button
                    className="bg-[#7209b7] text-white hover:bg-[#5e0894] active:bg-[#56088a] px-4 sm:px-5 py-2 rounded-lg transition text-sm"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
