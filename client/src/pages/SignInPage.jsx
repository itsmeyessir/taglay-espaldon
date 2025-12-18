import React, { useState } from 'react';
import '../styles/SignInPage.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/UserService';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // navigate('/dashboard');
        e.preventDefault();
        try {
            // Call the login API
            const { data } = await loginUser({ email, password });
            console.log('Login successful:', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('type', data.type); // user this for dynamic rendering

            // Navigate to the dashboard with the user's email and type
            navigate('/dashboard/dash-articles', { state: { firstName: data.firstName, type: data.type } });
        } catch (err) {
            console.error('Login failed:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-hero">
                <div className="auth-hero-badge">Taglay</div>
                <h1>Welcome back</h1>
                <p className="muted">Sign in to manage users and articles.</p>
            </div>

            <div className="auth-card">
                <div className="auth-card-header">
                    <h2>Sign in</h2>
                    <p className="muted">Use your email and password to continue.</p>
                </div>
                <form className="auth-form" onSubmit={handleLogin}>
                    <label className="auth-field">
                        <span>Email</span>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className="auth-field">
                        <span>Password</span>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" className="button-link primary auth-submit">
                        Sign in
                    </button>
                </form>
                <p className="auth-footnote muted">By signing in, you agree to our terms.</p>
            </div>
        </div>
    );
};

export default SignInPage;
