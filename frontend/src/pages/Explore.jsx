import React, { useState, useEffect } from 'react';
import API from '../api';
import ContentCard from '../components/ContentCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const Explore = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);
    const [filters, setFilters] = useState({ search: '', subject: '', difficulty: '' });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams(filters).toString();
                const [contentRes, bookmarksRes] = await Promise.all([
                    API.get(`/content?${query}`),
                    API.get('/bookmarks')
                ]);
                setContent(contentRes.data);
                setBookmarks(bookmarksRes.data.map(b => b.contentId._id));
            } catch (err) {
                console.error('Error fetching explore data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    const handleToggleBookmark = async (contentId) => {
        try {
            if (bookmarks.includes(contentId)) {
                await API.delete(`/bookmarks/${contentId}`);
                setBookmarks(prev => prev.filter(id => id !== contentId));
            } else {
                await API.post(`/bookmarks/${contentId}`);
                setBookmarks(prev => [...prev, contentId]);
            }
        } catch (err) {
            console.error('Error toggling bookmark:', err);
        }
    };

    return (
        <div className="explore-container">
            <header className="dashboard-header">
                <h1>Explore Resources</h1>
                <p className="text-muted">Discover academic content across all subjects and levels.</p>
            </header>

            <div className="filter-bar glass p-4 mb-8">
                <div className="form-grid">
                    <div className="form-group mb-0">
                        <label>Search</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} className="search-icon" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="Algorithms, React, Math..."
                                value={filters.search}
                                onChange={e => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-0">
                        <label>Subject</label>
                        <select value={filters.subject} onChange={e => setFilters({ ...filters, subject: e.target.value })}>
                            <option value="">All Subjects</option>
                            <option>Computer Science</option>
                            <option>Web Development</option>
                            <option>AI/ML</option>
                            <option>Mathematics</option>
                        </select>
                    </div>
                    <div className="form-group mb-0">
                        <label>Difficulty</label>
                        <select value={filters.difficulty} onChange={e => setFilters({ ...filters, difficulty: e.target.value })}>
                            <option value="">All Levels</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="content-grid">
                    {content.map(item => (
                        <ContentCard
                            key={item._id}
                            content={item}
                            isBookmarked={bookmarks.includes(item._id)}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    ))}
                    {content.length === 0 && <p className="text-center py-10 text-muted">No resources matched your filters.</p>}
                </div>
            )}
        </div>
    );
};

export default Explore;
