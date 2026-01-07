import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-2xl overflow-x-auto">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Companies
      </h2>

      <Table className="min-w-[700px] w-full border-collapse">
        <TableCaption className="text-gray-500 text-xs sm:text-sm">
          A list of your recent registered companies
        </TableCaption>

        <TableHeader className="bg-gray-200 text-gray-700">
          <TableRow>
            <TableHead className="p-3 sm:p-4 text-left">Logo</TableHead>
            <TableHead className="p-3 sm:p-4 text-left">Name</TableHead>
            <TableHead className="p-3 sm:p-4 text-left">Date</TableHead>
            <TableHead className="p-3 sm:p-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.map((company, index) => (
            <TableRow
              key={company._id}   
              className={`border-b ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100 transition`}
            >
              <TableCell className="p-3 sm:p-4">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 shadow-md">
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>

              <TableCell className="p-3 sm:p-4 text-sm sm:text-base font-medium text-gray-900">
                {company.name}
              </TableCell>

              <TableCell className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600">
                {company.createdAt.split('T')[0]}
              </TableCell>

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

                  <PopoverContent className="w-36 sm:w-40 p-2 bg-white shadow-xl rounded-lg">
                    <div onClick={() => navigate(`/admin/companies/${company._id}`)}>
                      <Button
                        variant="default"
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </Button>
                    </div>
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

export default CompaniesTable;
