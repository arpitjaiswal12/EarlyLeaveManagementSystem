import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging line to check the token
        
        const response = await api.get('/leave/student/leave-history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeaveHistory(response.data);
      } catch (error) {
        toast.error('Error fetching leave history');
      }
    };

    fetchLeaveHistory();
  }, []);

  const deleteLeave = async (id) => {
    try {
      console.log('Deleting leave with ID:', id); // Debugging line to check the ID
      const token = localStorage.getItem('token');
      const response = await api.delete(`/leave/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response); // Debugging line to check the response 
      
      toast.success('Leave deleted successfully');
      // Filter out the deleted leave from the UI
      setLeaveHistory(leaveHistory.filter(leave => leave._id !== id));
    } catch (error) {
      console.error('Error deleting leave:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Error deleting leave');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Leave History</h1>
      <ul className="space-y-4">
        {leaveHistory.map((leave) => (
          <li key={leave._id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex-1">
              <p className="font-bold text-lg text-gray-800 mb-2">{leave.reason}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">From:</span> {new Date(leave.startDate).toLocaleDateString()} <span className="font-semibold">To:</span> {new Date(leave.endDate).toLocaleDateString()}
              </p>
              
              {/* Conditional rendering for status display */}
              {leave.coordinatorApprovalStatus === 'rejected' ? (
                <p className="text-red-500 font-bold">Final Status: {leave.finalStatus}</p>
              ) : (
                <p className="text-gray-600">
                  Coordinator Status: <span className={`font-bold ${leave.coordinatorApprovalStatus === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {leave.coordinatorApprovalStatus}
                  </span> 
                  {leave.coordinatorApprovalStatus === 'approved' && (
                    <>
                      {' '} - HOD Status: <span className={`font-bold ${leave.hodApprovalStatus === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                        {leave.hodApprovalStatus}
                      </span>
                    </>
                  )}
                  {' '} - Final Status: <span className={`font-bold ${leave.finalStatus === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {leave.finalStatus}
                  </span>
                </p>
              )}
            </div>
            <button 
              onClick={() => deleteLeave(leave._id)} 
              className="ml-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-200 flex items-center"
            >
              <MdDelete className="mr-1" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveHistory;