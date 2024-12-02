import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import OwnerVehicleCard from './OwnerVehicleCard';

const OwnerVehicleGrid = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const fetchVehicles = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`owner/listedVehicles?page=${page}&limit=${limit}`);
      setVehicles(response.data.data.results);
      setTotalPages(Math.ceil(response.data.data.total / limit)); // Assuming `totalPages` is calculated from total count
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = () => {
    fetchVehicles(currentPage);
  };

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-700">Loading vehicles...</span>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-lg mt-4">
        No vehicles available. Why don't you list some?
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <OwnerVehicleCard key={vehicle.id} vehicle={vehicle} onUpdate={onUpdate} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-4 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OwnerVehicleGrid;
