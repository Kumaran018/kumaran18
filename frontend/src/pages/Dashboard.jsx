import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import ContentCard from '../components/ContentCard';
import { Loader2, TrendingUp, Sparkles, Clock } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [recsRes, contentRes, bookmarksRes] = await Promise.all([
                    API.get('/recommendations'),
                    API.get('/content?limit=4'), // Trending placeholder
                    API.get('/bookmarks')
                ]);
                setRecommendations(recsRes.data);
                setTrending(contentRes.data.slice(0, 4));
                setBookmarks(bookmarksRes.data.map(b => b.contentId._id));
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={40} color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, {user?.name.split(' ')[0]}!</h1>
                    <p className="text-muted">Here's what we recommend for your {user?.skillLevel} level.</p>
                </div>
            </header>

            <section className="dashboard-section">
                <div className="section-header">
                    <Sparkles size={20} color="var(--primary)" />
                    <h2 className="section-title">Recommended For You</h2>
                </div>
                <div className="content-grid">
                    {recommendations.length > 0 ? (
                        recommendations.map(content => (
                            <ContentCard
                                key={content._id}
                                content={content}
                                isBookmarked={bookmarks.includes(content._id)}
                                onToggleBookmark={handleToggleBookmark}
                            />
                        ))
                    ) : (
                        <p className="text-muted">No recommendations found. Try updating your interests!</p>
                    )}
                </div>
            </section>

            <section className="dashboard-section" style={{ marginTop: '3rem' }}>
                <div className="section-header">
                    <TrendingUp size={20} color="#f59e0b" />
                    <h2 className="section-title">Trending Content</h2>
                </div>
                <div className="content-grid">
                    {trending.map(content => (
                        <ContentCard
                            key={content._id}
                            content={content}
                            isBookmarked={bookmarks.includes(content._id)}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
