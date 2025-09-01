import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const navigationItems = [
    { key: 'dashboard', path: '/dashboard', label: 'E-Estimate', gradient: 'from-indigo-500 to-blue-600' },
    { key: 'works', path: '/works', label: t('nav.works'), gradient: 'from-emerald-500 to-teal-600' },
    { key: 'subworks', path: '/subworks', label: t('nav.subworks'), gradient: 'from-purple-500 to-pink-600' },
    { key: 'generate-estimate', path: '/generate-estimate', label: 'Generate E-Estimate', gradient: 'from-violet-500 to-purple-600' },
    { key: 'compare', path: '/compare', label: t('nav.compare'), gradient: 'from-orange-500 to-red-600' },
    { key: 'measurement-book', path: '/measurement-book', label: 'Measurement Book (MB)', gradient: 'from-violet-500 to-purple-600' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-50 to-gray-100 shadow-xl border-b border-slate-200">
      {/* Top Bar - Logo, Title, Profile, Language */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-wide" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                E-Estimate and MB
              </h1>
              <p className="text-xs text-gray-500">ZP Chandrapur</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-slate-200 bg-gradient-to-r from-slate-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 py-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                  location.pathname === item.path
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 hover:scale-105 hover:shadow-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-slate-200 bg-gradient-to-r from-slate-100 to-gray-200">
        <div className="px-2 py-3 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`block w-full text-left px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                location.pathname === item.path
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 hover:shadow-md'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;