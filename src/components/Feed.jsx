import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchComments } from '../utils/api';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFeed = async () => {
            try {
                // Fetch posts from user ID 1 as an example
                const postsData = await fetchPosts(1);
                
                // Fetch comments for each post
                const postsWithComments = await Promise.all(
                    postsData.map(async (post) => {
                        const comments = await fetchComments(post.id);
                        return {
                            ...post,
                            comments: comments
                        };
                    })
                );
                
                setPosts(postsWithComments);
            } catch (err) {
                setError('Failed to fetch feed');
                console.error('Error fetching feed:', err);
            } finally {
                setLoading(false);
            }
        };

        getFeed();
    }, []);

    if (loading) return <div className="p-4 text-[#00ff9d]">Loading...</div>;
    if (error) return <div className="p-4 text-[#ff6b6b]">{error}</div>;

    return (
        <div className="card p-6 rounded-lg shadow-lg bg-[#2f4f4f] border border-[#4b5563]">
            <h2 className="text-xl font-bold mb-4 text-[#00ff9d]">Feed</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="card p-4 rounded-lg hover:shadow-md transition-all duration-300 bg-[#353839] border border-[#4b5563]">
                        <h3 className="font-semibold text-lg mb-2 text-[#00ff9d]">{post.title}</h3>
                        <p className="text-[#00ccff] mb-4">{post.body}</p>
                        <div className="text-sm text-[#ff6b6b]">
                            {post.comments.length} comments
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;