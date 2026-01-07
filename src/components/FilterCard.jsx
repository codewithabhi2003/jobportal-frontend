import React, { useState } from 'react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

const locations = [
  "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai",
  "Chennai", "Kolkata", "Ahmedabad", "Gurgaon", "Noida",
  "Telangana", "Jaipur", "Chandigarh", "Lucknow", "Indore"
];

const FilterCard = ({ onApply, onClose }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);

  const toggleLocation = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const applyFilter = () => {
    onApply([...selectedLocations]); // ✅ fresh array
    onClose();
  };

  const clearAll = () => {
    setSelectedLocations([]);
    onApply([]); // ✅ remove filter in Jobs.jsx
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-bold mb-4">Filter by Location</h2>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {locations.map((location) => (
          <div key={location} className="flex items-center gap-3">
            <Checkbox
              checked={selectedLocations.includes(location)}
              onCheckedChange={() => toggleLocation(location)}
              className="data-[state=checked]:bg-[#6A38C2] data-[state=checked]:border-[#6A38C2]"
            />
            <Label className="text-sm cursor-pointer">
              {location}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={clearAll}
          className="text-sm text-gray-500"
        >
          Clear All
        </button>

        <button
          onClick={applyFilter}
          className="ml-auto px-4 py-2 bg-[#6A38C2] text-white rounded-md text-sm"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
