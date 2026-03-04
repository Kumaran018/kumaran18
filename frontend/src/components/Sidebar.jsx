import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    LayoutDashboard,
    BookOpen,
    Bookmark,
    User,
    LogOut,
    Settings,
    ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Explore', icon: <BookOpen size={20} />, path: '/explore' },
        { name: 'Bookmarks', icon: <Bookmark size={20} />, path: '/bookmarks' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    ];

    if (user?.role === 'admin' || user?.role === 'moderator') {
        navItems.push({ name: 'Admin Panel', icon: <ShieldCheck size={20} />, path: '/admin' });
    }

    return (
        <aside className="sidebar glass">
            <div className="sidebar-logo">
                <div className="logo-icon">A</div>
                <span>AcademiaAI</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar">{user?.name ? user.name[0] : 'U'}</div>
                    <div className="user-details">
                        <p className="user-name">{user?.name}</p>
                        <p className="user-role">{user?.role}</p>
                    </div>
                </div>
                <button onClick={logout} className="logout-btn">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
