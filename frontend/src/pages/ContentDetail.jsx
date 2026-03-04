import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import {
    Clock,
    ChevronLeft,
    ExternalLink,
    Star,
    CheckCircle,
    Loader2,
    BookOpen,
    Play,
    FileText,
    Code
} from 'lucide-react';

const ContentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await API.get(`/content/${id}`);
                setContent(data);
                // Log view interaction
                await API.post('/interactions', { contentId: id, type: 'view' });
            } catch (err) {
                console.error('Error fetching content detail:', err);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [id, navigate]);

    const handleMarkComplete = async () => {
        try {
            await API.post('/interactions', { contentId: id, type: 'complete' });
            setCompleted(true);
            alert('Congratulations! Content marked as completed.');
        } catch (err) {
            console.error('Error logging completion:', err);
        }
    };

    if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin" /></div>;
    if (!content) return <div className="text-center py-20"><h1>Content Not Found</h1><button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ width: 'auto' }}>Go Back</button></div>;

    const Icon = content.type === 'video' ? Play : content.type === 'pdf' ? FileText : content.type === 'coding' ? Code : BookOpen;

    return (
        <div className="content-detail-container">
            <button className="icon-btn mb-6" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} />
            </button>

            <div className="content-detail-layout profile-grid">
                <div className="content-main">
                    <div className="glass p-8 overflow-hidden">
                        <div className="card-image-placeholder mb-6" style={{ height: '300px', borderRadius: '1rem' }}>
                            <div className="flex items-center justify-center h-full">
                                <Icon size={64} color="var(--primary)" />
                            </div>
                        </div>

                        <div className="card-meta mb-4">
                            <span className="subject-tag">{content.subject}</span>
                            <span className={`difficulty-badge diff-${content.difficulty.toLowerCase()}`}>
                                {content.difficulty}
                            </span>
                        </div>

                        <h1 className="text-3xl mb-4 font-bold">{content.title}</h1>
                        <p className="text-muted leading-relaxed mb-8 text-lg">
                            {content.description || 'No description provided for this resource.'}
                        </p>

                        <div className="flex gap-4">
                            <a
                                href={content.contentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <ExternalLink size={18} />
                                Visit Resource
                            </a>
                            <button
                                className={`btn-primary ${completed ? 'opacity-50 pointer-events-none' : ''}`}
                                style={{ width: 'auto', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b981' }}
                                onClick={handleMarkComplete}
                                disabled={completed}
                            >
                                <CheckCircle size={18} />
                                {completed ? 'Completed' : 'Mark as Complete'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="content-sidebar">
                    <div className="glass p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4">Resource Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted">Type</span>
                                <span className="capitalize">{content.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted">Rating</span>
                                <span className="flex items-center gap-1">
                                    <Star size={14} className="star-icon fill-current" />
                                    {content.rating} / 5
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted">Views</span>
                                <span>{content.viewCount}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-sm font-semibold mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {content.tags.map(tag => (
                                    <span key={tag} className="glass px-3 py-1 text-xs rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentDetail;
