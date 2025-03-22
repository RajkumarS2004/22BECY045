import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/api';

const TrendingPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTrendingPosts = async () => {
            try {
                // Fetch posts from user ID 1 as an example
                const data = await fetchPosts(1);
                setPosts(data.slice(0, 5)); // Get top 5 posts
            } catch (err) {
                setError('Failed to fetch trending posts');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        getTrendingPosts();
    }, []);

    if (loading) return <div className="p-4 text-[#00ff9d]">Loading...</div>;
    if (error) return <div className="p-4 text-[#ff6b6b]">{error}</div>;

    return (
        <div className="card p-6 rounded-lg shadow-lg bg-[#2f4f4f] border border-[#4b5563]">
            <h2 className="text-xl font-bold mb-4 text-[#00ff9d]">Trending Posts</h2>
            <ul className="space-y-3">
                {posts.map((post) => (
                    <li key={post.id} className="card p-4 rounded-lg hover:shadow-md transition-all duration-300 bg-[#353839] border border-[#4b5563]">
                        <div className="font-semibold text-[#00ff9d]">{post.title}</div>
                        <div className="text-sm text-[#00ccff] mt-2">{post.body}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingPosts;