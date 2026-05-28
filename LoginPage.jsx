import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Shield } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/admin/login`, {
        username,
        password
      });
      
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminData', JSON.stringify(res.data.admin));
      toast.success('Login successful!');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gold-900/10 to-black">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold-500/5 blur-3xl animate-gold-smoke"
            style={{
              width: `${400 + i * 100}px`,
              height: `${400 + i * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-card p-8 max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="AL NASR" className="h-20 w-auto mx-auto mb-4" />
          <h2 className="text-3xl font-serif gold-text">Admin Login</h2>
          <p className="text-white/60 mt-2">Access your royal dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 mb-2 font-serif">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-serif">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full premium-button flex items-center justify-center space-x-2 py-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                <span>Login to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm flex items-center justify-center">
            <Shield size={14} className="mr-1" />
            Secure Admin Access Only
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;