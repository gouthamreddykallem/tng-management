'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ClaimData {
  sno: number;
  claimNumber: string;
  patientName: string;
  insuranceNumber: string;
  date: string;
  assignedTo: string;
}

const AssignPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('');

  // Dummy data for the table
  const dummyData: ClaimData[] = [
    { sno: 1, claimNumber: 'CLM001', patientName: 'John Doe', insuranceNumber: 'INS123', date: '2024-03-15', assignedTo: 'User1' },
    { sno: 2, claimNumber: 'CLM002', patientName: 'Jane Smith', insuranceNumber: 'INS456', date: '2024-03-16', assignedTo: 'User2' },
    { sno: 3, claimNumber: 'CLM003', patientName: 'Bob Johnson', insuranceNumber: 'INS789', date: '2024-03-17', assignedTo: 'User3' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log('File uploaded:', selectedFile);
  };

  const handleAssign = () => {
    // Handle assignment logic here
    console.log('Assigned to:', selectedUser);
  };

  return (
    <div className="container  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assign Claims</h1>
      
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="file-upload" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="mr-2 h-5 w-5" />
            <span>Upload Excel</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
          </label>
        </div>
        <button onClick={handleUpload} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Upload
        </button>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select User</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
          <option value="user3">User 3</option>
        </select>
        <button onClick={handleAssign} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Assign
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['S.No', 'Claim Number', 'Patient Name', 'Insurance Number', 'Date', 'Assigned To'].map((header) => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData.map((row) => (
              <tr key={row.sno}>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignPage;