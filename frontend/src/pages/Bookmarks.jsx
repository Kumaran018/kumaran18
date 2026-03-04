import React, { useState, useEffect } from 'react';
import API from '../api';
import ContentCard from '../components/ContentCard';
import { Bookmark, Loader2 } from 'lucide-react';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const { data } = await API.get('/bookmarks');
                setBookmarks(data);
            } catch (err) {
                console.error('Error fetching bookmarks:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, []);

    const handleRemoveBookmark = async (contentId) => {
        try {
            await API.delete(`/bookmarks/${contentId}`);
            setBookmarks(prev => prev.filter(b => b.contentId._id !== contentId));
        } catch (err) {
            console.error('Error removing bookmark:', err);
        }
    };

    return (
        <div className="bookmarks-container">
            <header className="dashboard-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Bookmark size={32} color="var(--primary)" />
                    <div>
                        <h1>My Bookmarks</h1>
                        <p className="text-muted">Quick access to your saved learning materials.</p>
                    </div>
                </div>
            </header>

            {loading ? (
                <div className="text-center py-20"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="content-grid">
                    {bookmarks.map(b => (
                        <ContentCard
                            key={b._id}
                            content={b.contentId}
                            isBookmarked={true}
                            onToggleBookmark={handleRemoveBookmark}
                        />
                    ))}
                    {bookmarks.length === 0 && (
                        <div className="glass p-10 text-center col-span-full">
                            <p className="text-muted mb-4">You haven't bookmarked any resources yet.</p>
                            <a href="/explore" className="text-primary font-semibold">Browse Resources</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
