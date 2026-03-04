import React from 'react';
import { Link } from 'react-router-dom';
import {
    Video,
    FileText,
    HelpCircle,
    Code,
    Star,
    Clock,
    Bookmark,
    CheckCircle
} from 'lucide-react';

const ContentCard = ({ content, onToggleBookmark, isBookmarked }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return <Video size={16} />;
            case 'pdf': return <FileText size={16} />;
            case 'quiz': return <HelpCircle size={16} />;
            case 'coding': return <Code size={16} />;
            default: return <FileText size={16} />;
        }
    };

    const getDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'diff-beginner';
            case 'Intermediate': return 'diff-intermediate';
            case 'Advanced': return 'diff-advanced';
            default: return '';
        }
    };

    return (
        <div className="content-card glass">
            <Link to={`/content/${content._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-image-placeholder">
                    <div className="type-badge">
                        {getTypeIcon(content.type)}
                        <span>{content.type}</span>
                    </div>
                    <button
                        className={`bookmark-toggle ${isBookmarked ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleBookmark(content._id);
                        }}
                    >
                        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </Link>

            <div className="card-body">
                <div className="card-meta">
                    <span className="subject-tag">{content.subject}</span>
                    <span className={`difficulty-badge ${getDifficultyClass(content.difficulty)}`}>
                        {content.difficulty}
                    </span>
                </div>

                <Link to={`/content/${content._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="card-title">{content.title}</h3>
                </Link>
                <p className="card-desc">{content.description?.substring(0, 80)}...</p>

                <div className="card-footer">
                    <div className="footer-stats">
                        <div className="stat">
                            <Star size={14} className="star-icon" />
                            <span>{content.rating}</span>
                        </div>
                        <div className="stat">
                            <Clock size={14} />
                            <span>12 min</span>
                        </div>
                    </div>
                    <Link to={`/content/${content._id}`} className="view-btn text-center" style={{ textDecoration: 'none' }}>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
