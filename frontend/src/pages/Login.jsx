import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Factory, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
    // Load remembered identifier
    const saved = localStorage.getItem('rememberedIdentifier');
    if (saved) {
      setIdentifier(saved);
      setRememberMe(true);
    }
  }, [navigate]);

  const validate = () => {
    const errors = {};
    if (!identifier.trim()) errors.identifier = 'Username or email is required.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { identifier, password });
      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role
      }));

      if (rememberMe) {
        localStorage.setItem('rememberedIdentifier', identifier);
      } else {
        localStorage.removeItem('rememberedIdentifier');
      }

      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error 
        || (err.code === 'ERR_NETWORK' ? 'Cannot reach backend server at http://localhost:8080. Please ensure Spring Boot is running.' : null)
        || err.message 
        || 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Background overlay */}
      <div style={styles.bgOverlay}></div>

      <div style={styles.container}>
        {/* Left branding panel */}
        <div style={styles.brandPanel}>
          <div style={styles.brandContent}>
            <div style={styles.brandIconWrap}>
              <Factory size={48} color="#fff" />
            </div>
            <h1 style={styles.brandTitle}>Factory Management System</h1>
            <p style={styles.brandSubtitle}>Smart Factory Operations & Monitoring</p>
            <div style={styles.brandFeatures}>
              <div style={styles.featureItem}>✓ Real-time Machine Monitoring</div>
              <div style={styles.featureItem}>✓ Production Tracking & Analytics</div>
              <div style={styles.featureItem}>✓ Worker & Inventory Management</div>
              <div style={styles.featureItem}>✓ AI-Powered Alerts & Insights</div>
            </div>
          </div>
          <div style={styles.brandFooter}>
            <small style={{ color: 'rgba(255,255,255,0.6)' }}>© 2024 Factory Management System</small>
          </div>
        </div>

        {/* Right login form */}
        <div style={styles.formPanel}>
          <div style={styles.formContent}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={styles.formTitle}>Welcome Back</h2>
              <p style={styles.formSubtitle}>Sign in to your account to continue</p>
            </div>

            {error && (
              <div style={styles.errorBanner}>
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Identifier field (email or username) */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email or Username</label>
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    ...(fieldErrors.identifier ? styles.inputError : {})
                  }}
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setFieldErrors(prev => ({...prev, identifier: ''})); }}
                />
                {fieldErrors.identifier && <small style={styles.fieldError}>{fieldErrors.identifier}</small>}
              </div>

              {/* Password field with show/hide */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrap}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    style={{
                      ...styles.input,
                      paddingRight: '48px',
                      ...(fieldErrors.password ? styles.inputError : {})
                    }}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({...prev, password: ''})); }}
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                  </button>
                </div>
                {fieldErrors.password && <small style={styles.fieldError}>{fieldErrors.password}</small>}
              </div>

              {/* Remember me & Forgot Password */}
              <div style={styles.optionsRow}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ marginRight: '6px', accentColor: '#1e3a5f' }}
                  />
                  Remember me
                </label>
                <a href="#" style={styles.forgotLink} onClick={(e) => { e.preventDefault(); alert('To enable Forgot Password, configure an SMTP email service in the Spring Boot backend (e.g., spring.mail.* properties in application.properties).'); }}>
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                style={{
                  ...styles.loginBtn,
                  ...(isLoading ? styles.loginBtnDisabled : {})
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Loader2 size={20} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                    Signing in...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <LogIn size={20} />
                    Sign In
                  </span>
                )}
              </button>
            </form>

            {/* Register link */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#1e3a5f', fontWeight: '600', textDecoration: 'none' }}>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .login-container { flex-direction: column !important; }
          .brand-panel { display: none !important; }
          .form-panel { border-radius: 16px !important; }
        }
      `}</style>
    </div>
  );
};

/* ========================================
   INLINE STYLES — Factory Industrial Theme
   ======================================== */
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    padding: '20px',
    position: 'relative',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(30, 58, 95, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
    `,
    zIndex: 0,
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '960px',
    minHeight: '580px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
    position: 'relative',
    zIndex: 1,
  },
  brandPanel: {
    flex: '1 1 45%',
    background: 'linear-gradient(180deg, #1e3a5f 0%, #0f2847 100%)',
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fff',
  },
  brandContent: {},
  brandIconWrap: {
    width: '72px',
    height: '72px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '28px',
    backdropFilter: 'blur(10px)',
  },
  brandTitle: {
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: 1.2,
    margin: '0 0 8px',
    color: '#fff',
  },
  brandSubtitle: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 36px',
  },
  brandFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  featureItem: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.85)',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '8px',
    borderLeft: '3px solid #38bdf8',
  },
  brandFooter: {
    marginTop: '32px',
  },
  formPanel: {
    flex: '1 1 55%',
    background: '#fff',
    padding: '48px 44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContent: {
    width: '100%',
    maxWidth: '380px',
  },
  formTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px',
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  errorBanner: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    background: '#f9fafb',
    color: '#111827',
  },
  inputError: {
    borderColor: '#ef4444',
    background: '#fef2f2',
  },
  fieldError: {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block',
  },
  passwordWrap: {
    position: 'relative',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#4b5563',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#1e3a5f',
    fontWeight: '500',
    textDecoration: 'none',
  },
  loginBtn: {
    width: '100%',
    padding: '13px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
  },
  loginBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
};

export default Login;
