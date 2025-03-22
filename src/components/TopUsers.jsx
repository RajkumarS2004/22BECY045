import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';

const TopUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data.slice(0, 5)); // Get top 5 users
            } catch (err) {
                setError('Failed to fetch users');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) return <div className="p-4 text-[#00ff9d]">Loading...</div>;
    if (error) return <div className="p-4 text-[#ff6b6b]">{error}</div>;

    return (
        <div className="card p-6 rounded-lg shadow-lg bg-[#2f4f4f] border border-[#4b5563]">
            <h2 className="text-xl font-bold mb-4 text-[#00ff9d]">Top Users</h2>
            <ul className="space-y-3">
                {users.map((user) => (
                    <li key={user.id} className="card p-4 rounded-lg hover:shadow-md transition-all duration-300 bg-[#353839] border border-[#4b5563]">
                        <div className="font-semibold text-[#00ff9d]">{user.name}</div>
                        <div className="text-sm text-[#00ccff]">{user.email}</div>
                        <div className="text-xs text-[#ff6b6b] mt-1">{user.company.name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;