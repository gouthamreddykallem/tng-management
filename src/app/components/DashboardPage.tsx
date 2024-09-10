'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Dummy data for the graph
const graphData = [
    { name: 'Jan', claims: 400 },
    { name: 'Feb', claims: 300 },
    { name: 'Mar', claims: 200 },
    { name: 'Apr', claims: 278 },
    { name: 'May', claims: 189 },
];

// Dummy data for the claims table
const dummyClaimsData = Array(50).fill(null).map((_, index) => ({
    id: index + 1,
    claimNumber: `CLM${1000 + index}`,
    patientName: `Patient ${index + 1}`,
    insuranceNumber: `INS${5000 + index}`,
    date: new Date(2024, 0, 1 + index).toISOString().split('T')[0],
    assignedTo: `User ${(index % 5) + 1}`,
    status: ['Pending', 'Approved', 'Rejected'][index % 3],
    action: ['Review', 'Process', 'Escalate'][index % 3],
}));

const DashboardPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const router = useRouter();

    const handleRowClick = (claimId: number) => {
        router.push(`/claim/${claimId}`);
    };

    // Filter logic (you can expand this based on your needs)
    const filteredClaims = dummyClaimsData.filter(claim =>
        (selectedUser ? claim.assignedTo === selectedUser : true) &&
        (selectedStatus ? claim.status === selectedStatus : true) &&
        (selectedAction ? claim.action === selectedAction : true)
    );

    const pageCount = Math.ceil(filteredClaims.length / itemsPerPage);
    const displayedClaims = filteredClaims.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedClaims = [...displayedClaims].sort((a, b) => {
        if (sortColumn) {
            const aValue = a[sortColumn as keyof typeof a];
            const bValue = b[sortColumn as keyof typeof b];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-6 grid grid-cols-3 gap-4">
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select User</option>
                    {['User 1', 'User 2', 'User 3', 'User 4', 'User 5'].map(user => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                </select>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select Status</option>
                    {['Pending', 'Approved', 'Rejected'].map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Select Action</option>
                    {['Review', 'Process', 'Escalate'].map(action => (
                        <option key={action} value={action}>{action}</option>
                    ))}
                </select>
            </div>

            {/* Graph */}
            <div className="mb-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="claims" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Claims Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            {['S.No', 'Claim Number', 'Patient Name', 'Insurance Number', 'Date', 'Assigned To', 'Status', 'Action'].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort(header.toLowerCase().replace(/\s+/g, ''))}
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
                        {sortedClaims.map((claim) => (
                            <tr
                                key={claim.id}
                                className="border-b hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleRowClick(claim.id)}
                            >
                                <td className="px-4 py-2">{claim.id}</td>
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

            {/* Pagination */}
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
        </div>
    );
};

export default DashboardPage;