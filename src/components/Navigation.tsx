/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Trophy, ShieldAlert, Sparkles, Building, Menu, X, Coins, Flame } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'admin' | 'employee';
  setUserRole: (role: 'admin' | 'employee') => void;
  userPoints: number;
  userStreak: number;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  userPoints,
  userStreak
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Philosophy' },
    { id: 'hrms', label: 'HRMS Modules' },
    { id: 'enhancement', label: 'Training & Skill' },
    { id: 'gamification', label: 'Playground & Rewards' },
    { id: 'dashboard', label: 'Interactive Dashboard' },
    { id: 'pricing', label: 'Pricing Plan' },
    { id: 'contact', label: 'Book Demo' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Trophy className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 bg-clip-text text-transparent">
                AuraHR
              </span>
              <div className="text-[10px] text-slate-400 font-mono font-bold leading-none">GAMIFIED SAAS</div>
            </div>
          </div>

          {/* Desktop Navigation Link list */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Accessories: Points counter, User switcher, Trial label */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Realtime User points status (Self-service preview) */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 font-mono text-xs">
              <Coins className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-amber-300 font-bold">{userPoints} pts</span>
              <span className="text-slate-500">|</span>
              <Flame className="h-3.5 w-3.5 text-red-400" />
              <span className="text-red-400 font-bold">{userStreak}d streak</span>
            </div>

            {/* Simulated Live Role Toggle Switch */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => {
                  setUserRole('admin');
                  setActiveTab('dashboard');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  userRole === 'admin'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Corporate Admin
              </button>
              <button
                onClick={() => {
                  setUserRole('employee');
                  setActiveTab('dashboard');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  userRole === 'employee'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Employee Portal
              </button>
            </div>
          </div>

          {/* Mobile responsive toggle button */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-xs font-mono">
              <Coins className="h-3 w-3 text-amber-400" />
              <span className="text-amber-300 font-bold">{userPoints}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-all block ${
                activeTab === item.id
                  ? 'bg-slate-800 text-amber-300 border-l-2 border-amber-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs px-3 text-slate-400">
              <span>Trial Sandbox Environment</span>
              <span className="text-[10px] font-mono p-1 bg-amber-500/10 text-amber-400 rounded">Simulation is Live</span>
            </div>

            {/* Quick switcher inside mobile screen */}
            <div className="grid grid-cols-2 gap-2 px-2">
              <button
                onClick={() => {
                  setUserRole('admin');
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-center text-xs font-bold rounded-xl ${
                  userRole === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                Admin Perspective
              </button>
              <button
                onClick={() => {
                  setUserRole('employee');
                  setActiveTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-center text-xs font-bold rounded-xl ${
                  userRole === 'employee'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                Employee Perspective
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
