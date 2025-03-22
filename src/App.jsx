import React from 'react';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import ThemeToggle from './components/ThemeToggle';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS

const App = () => {
    return (
        <div className="min-h-screen bg-[#353839]">
            <header className="bg-[#2f4f4f] p-4 border-b border-[#4b5563]">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#00ff9d]">Social Media Dashboard</h1>
                    <ThemeToggle />
                </div>
            </header>
            <main className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <Feed />
                    </div>
                    <div className="space-y-4">
                        <TopUsers />
                        <TrendingPosts />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;