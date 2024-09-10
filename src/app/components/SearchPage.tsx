// File: src/app/components/SearchPage.tsx
'use client';

import React, { useState } from 'react';
// import Link from 'next/link';
import { ArrowUp, ArrowDown, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define the structure of a claim
interface Claim {
    id: number;
    claimNumber: string;
    patientName: string;
    insuranceNumber: string;
    date: string;
    assignedTo: string;
    status: string;
    action: string;
}

// Dummy data for demonstration
// const dummyData: Claim[] = Array(100).fill(null).map((_, index) => ({
//     id: index + 1,
//     claimNumber: `CLM${1000 + index}`,
//     patientName: `Patient ${index + 1}`,
//     insuranceNumber: `INS${5000 + index}`,
//     date: new Date(2024, 0, 1 + index).toISOString().split('T')[0],
//     assignedTo: `User ${(index % 5) + 1}`,
//     status: ['Pending', 'Approved', 'Rejected'][index % 3],
//     action: ['Review', 'Process', 'Escalate'][index % 3],
// }));

const SearchPage: React.FC = () => {
    const [claimNumber, setClaimNumber] = useState('');
    const [insuranceNumber, setInsuranceNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [status, setStatus] = useState('');
    const [action, setAction] = useState('');

    const [searchResults, setSearchResults] = useState<Claim[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const itemsPerPage = 10;

    const router = useRouter();

    const handleSearch = () => {
        // Simulate an API call with dummy data
        const dummyResults: Claim[] = Array(50).fill(null).map((_, index) => ({
            id: index + 1,
            claimNumber: `CLM${1000 + index}`,
            patientName: `Patient ${index + 1}`,
            insuranceNumber: `INS${5000 + index}`,
            date: new Date(2024, 0, 1 + index).toISOString().split('T')[0],
            assignedTo: `User ${(index % 5) + 1}`,
            status: ['Pending', 'Approved', 'Rejected'][index % 3],
            action: ['Review', 'Process', 'Escalate'][index % 3],
        }));

        setSearchResults(dummyResults);
        setCurrentPage(1);
    };

    const handleSort = (column: keyof Claim) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleRowClick = (claimId: number) => {
        router.push(`/claim/${claimId}`);
    };

    const sortedResults = [...searchResults].sort((a, b) => {
        if (sortColumn) {
            const aValue = a[sortColumn as keyof Claim];
            const bValue = b[sortColumn as keyof Claim];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const pageCount = Math.ceil(sortedResults.length / itemsPerPage);
    const displayedResults = sortedResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleExport = () => {
        // In a real application, you would generate an Excel file here
        // For this example, we'll just log the data to be exported
        console.log('Exporting data:', searchResults);
        alert('Export functionality would be implemented here.');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Search Claims</h1>

            {/* Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Claim Number"
                    value={claimNumber}
                    onChange={(e) => setClaimNumber(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Insurance Number"
                    value={insuranceNumber}
                    onChange={(e) => setInsuranceNumber(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded"
                />
                <select
                    value={assignedUser}
                    onChange={(e) => setAssignedUser(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select Assigned User</option>
                    <option value="User 1">User 1</option>
                    <option value="User 2">User 2</option>
                    <option value="User 3">User 3</option>
                    <option value="User 4">User 4</option>
                    <option value="User 5">User 5</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select Action</option>
                    <option value="Review">Review</option>
                    <option value="Process">Process</option>
                    <option value="Escalate">Escalate</option>
                </select>
            </div>

            <div className="flex justify-between mb-6">
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Search
                </button>
                <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                >
                    <Download size={18} className="mr-2" />
                    Export to Excel
                </button>
            </div>

            {/* Search Results Table */}
            {searchResults.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                {['Claim Number', 'Patient Name', 'Insurance Number', 'Date', 'Assigned To', 'Status', 'Action'].map((header) => (
                                    <th
                                        key={header}
                                        className="px-4 py-2 text-left cursor-pointer"
                                        onClick={() => handleSort(header.toLowerCase().replace(/\s+/g, '') as keyof Claim)}
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            {sortColumn === header.toLowerCase().replace(/\s+/g, '') && (
                                                sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {displayedResults.map((claim) => (
                                <tr
                                    key={claim.id}
                                    className="border-b hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleRowClick(claim.id)}
                                >
                                    <td className="px-4 py-2">{claim.claimNumber}</td>
                                    <td className="px-4 py-2">{claim.patientName}</td>
                                    <td className="px-4 py-2">{claim.insuranceNumber}</td>
                                    <td className="px-4 py-2">{claim.date}</td>
                                    <td className="px-4 py-2">{claim.assignedTo}</td>
                                    <td className="px-4 py-2">{claim.status}</td>
                                    <td className="px-4 py-2">{claim.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {searchResults.length > 0 && (
                <div className="mt-4 flex justify-center">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;