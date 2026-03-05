import React, { useState, useEffect } from 'react';
import API from '../api';
import {
    Users,
    BookOpen,
    Activity,
    Plus,
    Trash2,
    Shield,
    Bot,
    Search,
    UserCheck,
    UserMinus,
    ExternalLink,
    Loader2,
    Edit,
    X
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    // AI Agent State
    const [agentInput, setAgentInput] = useState({ domain: 'Computer Science', topic: '' });
    const [agentResult, setAgentResult] = useState(null);
    const [agentLoading, setAgentLoading] = useState(false);

    // New content form
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', subject: 'Computer Science', type: 'video',
        difficulty: 'Beginner', tags: '', contentUrl: '', coverImage: '', description: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, contentRes, usersRes] = await Promise.all([
                API.get('/admin/stats'),
                API.get('/content'),
                API.get('/admin/users/list')
            ]);
            setStats(statsRes.data);
            setContent(contentRes.data);
            setUsers(usersRes.data);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            await API.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            alert('Error updating role');
        }
    };

    const handleRunAgent = async (e) => {
        e.preventDefault();
        setAgentLoading(true);
        try {
            const { data } = await API.post('/admin/agent/collect', agentInput);
            setAgentResult(data);
        } catch (err) {
            console.error('Agent error:', err);
        } finally {
            setAgentLoading(false);
        }
    };

    const handleAddContent = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim());
            const { data } = await API.post('/content', { ...formData, tags: tagsArray });
            setContent([data, ...content]);
            setIsAdding(false);
            setFormData({ title: '', subject: 'Computer Science', type: 'video', difficulty: 'Beginner', tags: '', contentUrl: '', coverImage: '', description: '' });
            fetchData(); // Refresh stats
        } catch (err) {
            console.error('Error adding content:', err);
        }
    };

    const handleEditContent = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim());
            const { data } = await API.put(`/content/${editingId}`, { ...formData, tags: tagsArray });
            setContent(content.map(c => c._id === editingId ? data : c));
            setIsEditing(false);
            setEditingId(null);
            setFormData({ title: '', subject: 'Computer Science', type: 'video', difficulty: 'Beginner', tags: '', contentUrl: '', coverImage: '', description: '' });
        } catch (err) {
            console.error('Error updating content:', err);
        }
    };

    const openEditModal = (item) => {
        setFormData({
            title: item.title,
            subject: item.subject,
            type: item.type,
            difficulty: item.difficulty,
            tags: item.tags.join(', '),
            contentUrl: item.contentUrl,
            coverImage: item.coverImage || '',
            description: item.description || ''
        });
        setEditingId(item._id);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ title: '', subject: 'Computer Science', type: 'video', difficulty: 'Beginner', tags: '', contentUrl: '', coverImage: '', description: '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this content?')) return;
        try {
            await API.delete(`/content/${id}`);
            setContent(content.filter(c => c._id !== id));
            fetchData();
        } catch (err) {
            console.error('Error deleting content:', err);
        }
    };

    if (loading) return <div className="text-center py-20 flex flex-col items-center gap-4"><Loader2 className="animate-spin" size={40} /> <p>Loading Admin Command Center...</p></div>;

    return (
        <div className="admin-container">
            <header className="dashboard-header">
                <h1>Admin Command Center</h1>
                <p className="text-muted">Welcome back, Kumaran. Management & AI Agent Studio.</p>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    Overview
                </button>
                <button
                    className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    User Management
                </button>
                <button
                    className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
                    onClick={() => setActiveTab('content')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    Content Studio
                </button>
                <button
                    className={`nav-link ${activeTab === 'agent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('agent')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    AI Agent
                </button>
            </div>

            {activeTab === 'overview' && (
                <div className="stats-row mb-10">
                    <div className="stat-card glass">
                        <Users size={24} color="var(--primary)" />
                        <p className="stat-value">{stats?.totalUsers}</p>
                        <p className="stat-label">Total Registrants</p>
                    </div>
                    <div className="stat-card glass">
                        <UserCheck size={24} color="#10b981" />
                        <p className="stat-value">{stats?.activeUsers}</p>
                        <p className="stat-label">Active (30d)</p>
                    </div>
                    <div className="stat-card glass">
                        <UserMinus size={24} color="#ef4444" />
                        <p className="stat-value">{stats?.inactiveUsers}</p>
                        <p className="stat-label">Inactive Users</p>
                    </div>
                    <div className="stat-card glass">
                        <Activity size={24} color="#f59e0b" />
                        <p className="stat-value">{stats?.totalCompletions}</p>
                        <p className="stat-label">Content Completions</p>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <section className="glass p-6">
                    <h2 className="section-title mb-6 flex items-center gap-2"><Users size={20} /> User Directory</h2>
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Activity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className={`badge ${u.role}`} style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                background: u.role === 'admin' ? 'rgba(99,102,241,0.2)' : u.role === 'moderator' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                                                color: u.role === 'admin' ? 'var(--primary)' : u.role === 'moderator' ? '#10b981' : 'white'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ color: u.isInactive ? '#ef4444' : '#10b981', fontSize: '0.8rem' }}>
                                                {u.completionCount} completions
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                value={u.role}
                                                className="glass text-xs p-1"
                                                onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                            >
                                                <option value="student">Student</option>
                                                <option value="moderator">Moderator</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {activeTab === 'content' && (
                <section className="glass p-6">
                    <div className="section-header justify-between">
                        <h2 className="section-title flex items-center gap-2"><Plus size={20} /> Content Inventory</h2>
                        <button className="btn-primary" style={{ width: 'auto', marginTop: 0 }} onClick={() => setIsAdding(!isAdding)}>
                            {isAdding ? 'Close Form' : 'Add New Content'}
                        </button>
                    </div>

                    {isAdding && (
                        <form className="add-content-form glass mt-6 p-6" onSubmit={handleAddContent}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Subject / Domain</label>
                                    <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                                        <option>Computer Science</option>
                                        <option>Web Development</option>
                                        <option>AI/ML</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Cyber Security</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="video">Video</option>
                                        <option value="pdf">PDF</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="article">Article</option>
                                        <option value="coding">Coding Problem</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Difficulty</label>
                                    <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })}>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Content URL</label>
                                <input required placeholder="https://..." value={formData.contentUrl} onChange={e => setFormData({ ...formData, contentUrl: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Cover Image URL (optional)</label>
                                <input placeholder="https://example.com/image.jpg" value={formData.coverImage} onChange={e => setFormData({ ...formData, coverImage: e.target.value })} />
                                {formData.coverImage && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <img src={formData.coverImage} alt="Preview" style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input placeholder="react, hooks, frontend" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="3" className="glass w-full p-3 text-white" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <button type="submit" className="btn-primary">Publish to Platform</button>
                        </form>
                    )}

                    <div className="admin-table-container mt-6">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>Type</th>
                                    <th>Difficulty</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.subject}</td>
                                        <td style={{ textTransform: 'capitalize' }}>{item.type}</td>
                                        <td>
                                            <span className={`difficulty-badge diff-${item.difficulty.toLowerCase()}`}>
                                                {item.difficulty}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="icon-btn" onClick={() => openEditModal(item)} title="Edit">
                                                    <Edit size={16} color="#3b82f6" />
                                                </button>
                                                <button className="icon-btn" onClick={() => handleDelete(item._id)} title="Delete">
                                                    <Trash2 size={16} color="#ef4444" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Edit Modal */}
            {isEditing && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div className="glass" style={{
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '2rem',
                        position: 'relative'
                    }}>
                        <button
                            onClick={closeEditModal}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6">Edit Content</h2>
                        
                        <form onSubmit={handleEditContent}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Subject / Domain</label>
                                    <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                                        <option>Computer Science</option>
                                        <option>Web Development</option>
                                        <option>AI/ML</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Cyber Security</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="video">Video</option>
                                        <option value="pdf">PDF</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="article">Article</option>
                                        <option value="coding">Coding Problem</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Difficulty</label>
                                    <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })}>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Content URL</label>
                                <input required placeholder="https://..." value={formData.contentUrl} onChange={e => setFormData({ ...formData, contentUrl: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Cover Image URL (optional)</label>
                                <input placeholder="https://example.com/image.jpg" value={formData.coverImage} onChange={e => setFormData({ ...formData, coverImage: e.target.value })} />
                                {formData.coverImage && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <img src={formData.coverImage} alt="Preview" style={{ maxWidth: '200px', maxHeight: '120px', borderRadius: '8px', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input placeholder="react, hooks, frontend" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="3" className="glass w-full p-3 text-white" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Update Content</button>
                                <button type="button" onClick={closeEditModal} className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'agent' && (
                <section className="glass p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary rounded-lg">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">AI Resource Collector Agent</h2>
                            <p className="text-muted">Generate high-quality academic modules automatically.</p>
                        </div>
                    </div>

                    <form className="glass p-6 mb-8" onSubmit={handleRunAgent}>
                        <div className="form-grid">
                            <div className="form-group mb-0">
                                <label>Target Domain</label>
                                <input
                                    value={agentInput.domain}
                                    onChange={e => setAgentInput({ ...agentInput, domain: e.target.value })}
                                    placeholder="e.g. Cyber Security"
                                />
                            </div>
                            <div className="form-group mb-0">
                                <label>Specific Topic</label>
                                <input
                                    required
                                    value={agentInput.topic}
                                    onChange={e => setAgentInput({ ...agentInput, topic: e.target.value })}
                                    placeholder="e.g. Zero Trust Architecture"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary mt-6 flex items-center justify-center gap-2" disabled={agentLoading}>
                            {agentLoading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
                            {agentLoading ? 'Agent Searching...' : 'Run Search Agent'}
                        </button>
                    </form>

                    {agentResult && (
                        <div className="agent-results animate-in fade-in duration-500">
                            <div className="flex items-center gap-2 text-green-400 mb-4 bg-green-400/10 p-3 rounded-lg">
                                <Shield size={18} />
                                <span>{agentResult.agentMessage}</span>
                            </div>

                            <div className="content-grid">
                                {agentResult.suggestions.map((s, idx) => (
                                    <div key={idx} className="glass p-5 border-l-4 border-indigo-500">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm">{s.title}</h4>
                                            <span className="text-xs glass px-2 py-1 rounded capitalize">{s.type}</span>
                                        </div>
                                        <p className="text-xs text-muted mb-3">{s.description}</p>
                                        {s.metadata && (
                                            <div className="flex gap-2 mb-3 text-xs">
                                                {s.metadata.stars && (
                                                    <span className="glass px-2 py-1 rounded">⭐ {s.metadata.stars.toLocaleString()}</span>
                                                )}
                                                {s.metadata.language && (
                                                    <span className="glass px-2 py-1 rounded">{s.metadata.language}</span>
                                                )}
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center gap-2">
                                            <span className={`difficulty-badge diff-${s.difficulty.toLowerCase()}`}>{s.difficulty}</span>
                                            <div className="flex gap-2">
                                                <a 
                                                    href={s.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="icon-btn text-xs flex items-center gap-1"
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <ExternalLink size={14} /> View
                                                </a>
                                                <button
                                                    className="icon-btn text-xs flex items-center gap-1"
                                                    onClick={() => {
                                                        setFormData({
                                                            title: s.title,
                                                            subject: agentInput.domain,
                                                            type: s.type,
                                                            difficulty: s.difficulty,
                                                            tags: s.tags.join(','),
                                                            contentUrl: s.url,
                                                            description: s.description
                                                        });
                                                        setActiveTab('content');
                                                        setIsAdding(true);
                                                    }}
                                                >
                                                    <Plus size={14} /> Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default AdminDashboard;
