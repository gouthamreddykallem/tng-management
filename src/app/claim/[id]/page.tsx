'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Comment {
    id: number;
    author: string;
    timestamp: string;
    content: string;
}

const ClaimDetailsPage: React.FC = () => {
    const router = useRouter();
    const [status, setStatus] = useState('');
    const [action, setAction] = useState('');
    const [snoozeDate, setSnoozeDate] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = () => {
        // Handle submission logic here
        router.push('/dashboard');
    };

    const handleSnooze = () => {
        // Handle snooze logic here
        router.push('/dashboard');
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: comments.length + 1,
                author: 'Current User', // Replace with actual user name
                timestamp: new Date().toISOString(),
                content: newComment.trim(),
            };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    return (
        <div className="container text-black mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Claim Details comes below</h1>

            {/* Claim details */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Add all claim details here */}
                <p><strong>Claim Number:</strong> CLM001</p>
                <p><strong>Patient Name:</strong> John Doe</p>
                {/* ... other claim details ... */}
            </div>

            {/* Status and Action */}
            <div className="flex space-x-4 mb-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="">Select Action</option>
                    <option value="review">Review</option>
                    <option value="process">Process</option>
                    <option value="escalate">Escalate</option>
                </select>
            </div>

            {/* Snooze Date */}
            <div className="mb-4">
                <label htmlFor="snoozeDate" className="block text-sm font-medium text-gray-700">Snooze Date</label>
                <input
                    type="date"
                    id="snoozeDate"
                    value={snoozeDate}
                    onChange={(e) => setSnoozeDate(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
            </div>

            {/* Comments Section */}
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Comments</h2>
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-100 p-4 rounded">
                            <p className="font-bold">{comment.author}</p>
                            <p className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                            <p className="mt-2">{comment.content}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Add a comment..."
                    ></textarea>
                    <button
                        onClick={handleAddComment}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Comment
                    </button>
                </div>
            </div>

            {/* Submit and Snooze Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Submit
                </button>
                <button
                    onClick={handleSnooze}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Snooze
                </button>
            </div>
        </div>
    );
};

export default ClaimDetailsPage;