import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from 'recharts';
import { User, Award, BookOpen, Target, Shield } from 'lucide-react';

const Profile = () => {
    const { user, login } = useContext(AuthContext);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Form states
    const [interests, setInterests] = useState(user?.interests || []);
    const [skillLevel, setSkillLevel] = useState(user?.skillLevel || 'Beginner');

    const availableInterests = [
        'Computer Science', 'Web Development', 'AI/ML', 'Mathematics', 'Physics', 'Biology', 'History'
    ];

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await API.get('/analytics/me');
                setAnalytics(data);
            } catch (err) {
                console.error('Error fetching analytics:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const handleUpdateProfile = async () => {
        setUpdating(true);
        try {
            const { data } = await API.put('/users/profile', { interests, skillLevel });
            login({ ...user, ...data }); // Update context but keep token
            alert('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setUpdating(false);
        }
    };

    const toggleInterest = (interest) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const chartData = analytics ? Object.entries(analytics.subjectProgress).map(([name, value]) => ({
        name, value
    })) : [];

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    return (
        <div className="profile-container">
            <header className="dashboard-header">
                <h1>User Profile</h1>
                <p className="text-muted">Manage your preferences and track your learning progress.</p>
            </header>

            <div className="profile-grid">
                <div className="profile-main">
                    <section className="glass p-6 mb-6">
                        <div className="section-header">
                            <User size={20} color="var(--primary)" />
                            <h2 className="section-title">Personal Settings</h2>
                        </div>

                        <div className="form-group mt-4">
                            <label>Full Name</label>
                            <input type="text" value={user?.name} disabled className="opacity-50" />
                        </div>

                        <div className="form-group">
                            <label>Learning Difficulty</label>
                            <select
                                value={skillLevel}
                                onChange={(e) => setSkillLevel(e.target.value)}
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Your Interests</label>
                            <div className="interest-tags">
                                {availableInterests.map(interest => (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => toggleInterest(interest)}
                                        className={`interest-tag-btn ${interests.includes(interest) ? 'active' : ''}`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            disabled={updating}
                            onClick={handleUpdateProfile}
                        >
                            {updating ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </section>
                </div>

                <div className="profile-stats">
                    <section className="glass p-6 mb-6">
                        <div className="section-header">
                            <Award size={20} color="#f59e0b" />
                            <h2 className="section-title">Learning Progress</h2>
                        </div>

                        <div className="stats-row">
                            <div className="stat-card">
                                <p className="stat-value">{analytics?.completedCount || 0}</p>
                                <p className="stat-label">Completed</p>
                            </div>
                            <div className="stat-card">
                                <p className="stat-value">{analytics?.bookmarkCount || 0}</p>
                                <p className="stat-label">Bookmarks</p>
                            </div>
                        </div>

                        <div className="chart-container" style={{ height: 250, marginTop: '2rem' }}>
                            <h3 className="text-sm font-semibold mb-4">Activity by Subject</h3>
                            {chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="name" hide />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-muted text-center py-10">No data found</div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
