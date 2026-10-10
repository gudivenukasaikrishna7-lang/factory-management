import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Users,
  Package,
  ShoppingCart,
  Factory,
  Wrench,
  Bell,
  LogOut,
  User
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  // Get user info from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/machines', label: 'Machines', icon: Settings },
    { to: '/workers', label: 'Workers', icon: Users },
    { to: '/products', label: 'Products', icon: Package },
    { to: '/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/production', label: 'Production', icon: Factory },
    { to: '/maintenance', label: 'Maintenance', icon: Wrench },
    { to: '/alerts', label: 'AI Monitoring', icon: Bell },
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{
        width: '280px',
        height: '100vh',
        position: 'fixed',
        background: 'linear-gradient(180deg, #1e3a5f 0%, #0f2847 100%)',
        zIndex: 1000,
      }}>

      {/* Brand header */}
      <div className="d-flex align-items-center mb-3 px-2" style={{ gap: '10px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.12)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <Factory size={22} color="#38bdf8" />
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1.2 }}>FactoryOS</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Management System</div>
        </div>
      </div>

      <hr style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '8px 0 16px' }} />

      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto" style={{ gap: '2px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li className="nav-item" key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-link d-flex align-items-center ${isActive ? '' : ''}`}
                end={item.to === '/'}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.15s',
                  borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                })}
              >
                <Icon className="me-2" size={18} />
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* User info & Logout */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', marginTop: '12px' }}>
        {user && (
          <div className="d-flex align-items-center mb-3 px-2" style={{ gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <User size={18} color="#38bdf8" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.fullName || user.username}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                {user.role || 'USER'}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="btn w-100 d-flex align-items-center justify-content-center"
          style={{
            gap: '8px',
            padding: '10px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
