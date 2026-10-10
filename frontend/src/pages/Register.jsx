import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Factory, Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!formData.username.trim()) errors.username = 'Username is required.';
    else if (formData.username.length < 3) errors.username = 'Username must be at least 3 characters.';
    if (!formData.email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address.';
    if (!formData.password) errors.password = 'Password is required.';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters.';
    if (formData.password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      setSuccess(response.data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.error 
        || (err.code === 'ERR_NETWORK' ? 'Cannot reach backend server at http://localhost:8080. Please ensure Spring Boot is running.' : null)
        || err.message 
        || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.bgOverlay}></div>

      <div style={styles.container}>
        {/* Left branding */}
        <div style={styles.brandPanel} className="brand-panel">
          <div>
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
          <div style={{ marginTop: '32px' }}>
            <small style={{ color: 'rgba(255,255,255,0.6)' }}>© 2024 Factory Management System</small>
          </div>
        </div>

        {/* Right register form */}
        <div style={styles.formPanel} className="form-panel">
          <div style={styles.formContent}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={styles.formTitle}>Create Account</h2>
              <p style={styles.formSubtitle}>Register to access the factory dashboard</p>
            </div>

            {error && (
              <div style={styles.errorBanner}>
                <span>⚠</span> {error}
              </div>
            )}
            {success && (
              <div style={styles.successBanner}>
                <span>✓</span> {success}
              </div>
            )}

            <form onSubmit={handleRegister}>
              {/* Full Name */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  style={{ ...styles.input, ...(fieldErrors.fullName ? styles.inputError : {}) }}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {fieldErrors.fullName && <small style={styles.fieldError}>{fieldErrors.fullName}</small>}
              </div>

              {/* Username */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  style={{ ...styles.input, ...(fieldErrors.username ? styles.inputError : {}) }}
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {fieldErrors.username && <small style={styles.fieldError}>{fieldErrors.username}</small>}
              </div>

              {/* Email */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  style={{ ...styles.input, ...(fieldErrors.email ? styles.inputError : {}) }}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {fieldErrors.email && <small style={styles.fieldError}>{fieldErrors.email}</small>}
              </div>

              {/* Password */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    style={{ ...styles.input, paddingRight: '48px', ...(fieldErrors.password ? styles.inputError : {}) }}
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Confirm Password */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    style={{ ...styles.input, paddingRight: '48px', ...(fieldErrors.confirmPassword ? styles.inputError : {}) }}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors(prev => ({...prev, confirmPassword: ''})); }}
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <small style={styles.fieldError}>{fieldErrors.confirmPassword}</small>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                style={{ ...styles.loginBtn, ...(isLoading ? styles.loginBtnDisabled : {}) }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    Creating account...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <UserPlus size={20} />
                    Create Account
                  </span>
                )}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1e3a5f', fontWeight: '600', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .brand-panel { display: none !important; }
          .form-panel { border-radius: 16px !important; }
        }
      `}</style>
    </div>
  );
};

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
    minHeight: '620px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
    position: 'relative',
    zIndex: 1,
  },
  brandPanel: {
    flex: '1 1 42%',
    background: 'linear-gradient(180deg, #1e3a5f 0%, #0f2847 100%)',
    padding: '48px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fff',
  },
  brandIconWrap: {
    width: '72px',
    height: '72px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '28px',
  },
  brandTitle: {
    fontSize: '26px',
    fontWeight: '700',
    lineHeight: 1.2,
    margin: '0 0 8px',
    color: '#fff',
  },
  brandSubtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 32px',
  },
  brandFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  featureItem: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.85)',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '8px',
    borderLeft: '3px solid #38bdf8',
  },
  formPanel: {
    flex: '1 1 58%',
    background: '#fff',
    padding: '36px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
  },
  formContent: {
    width: '100%',
    maxWidth: '400px',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 4px',
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
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  successBanner: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
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
    marginTop: '3px',
    display: 'block',
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
  loginBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
    marginTop: '4px',
  },
  loginBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
};

export default Register;
