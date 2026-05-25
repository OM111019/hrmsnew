/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import HRMSSection from './components/HRMSSection';
import EnhancementSection from './components/EnhancementSection';
import GamificationSection from './components/GamificationSection';
import DashboardSection from './components/DashboardSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';

import { Employee, FeedItem } from './types';
import { SAMPLE_EMPLOYEES, SAMPLE_FEED } from './data';
import { Radio, Sparkles, Heart, Trophy, Zap, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<'admin' | 'employee'>('employee');
  const [userPoints, setUserPoints] = useState<number>(1250); // Mapped initially to Elena's balance
  const [userStreak, setUserStreak] = useState<number>(11);

  // Global shared employee list
  const [employees, setEmployees] = useState<Employee[]>(SAMPLE_EMPLOYEES);

  // Social activity feed
  const [activityFeed, setActivityFeed] = useState<FeedItem[]>(SAMPLE_FEED);

  // Activity log helper to feed social streams
  const logActivity = (text: string) => {
    const fresh: FeedItem = {
      id: `feed_${Date.now()}`,
      employeeName: 'Elena Rostova (You)',
      employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      type: 'challenge',
      content: text,
      timestamp: 'Just now',
      likes: 0
    };
    setActivityFeed([fresh, ...activityFeed]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        userPoints={userPoints}
        userStreak={userStreak}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Under-Header Live simulation ticker */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-amber-500/10 border border-amber-500/15 rounded-2xl">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-amber-600 animate-pulse shrink-0" />
            <span className="text-xs text-amber-900 font-bold">
              Fully Connected Sandbox: Server API initialized on <span className="font-mono">PORT: 3000</span>
            </span>
          </div>
          <div className="text-[10px] text-amber-700 font-mono flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Interactive Workspace Perspective:</span>
            <span className="font-bold underline uppercase">{userRole}</span>
          </div>
        </div>

        {/* Tab Routing Container switcher */}
        <div className="min-h-[500px]">
          {activeTab === 'home' && (
            <HomeSection setActiveTab={setActiveTab} userPoints={userPoints} />
          )}

          {activeTab === 'about' && (
            <AboutSection />
          )}

          {activeTab === 'hrms' && (
            <HRMSSection
              employees={employees}
              setEmployees={setEmployees}
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              userStreak={userStreak}
              setUserStreak={setUserStreak}
              logActivity={logActivity}
            />
          )}

          {activeTab === 'enhancement' && (
            <EnhancementSection
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              logActivity={logActivity}
            />
          )}

          {activeTab === 'gamification' && (
            <GamificationSection
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              userStreak={userStreak}
              setUserStreak={setUserStreak}
              employees={employees}
              logActivity={logActivity}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardSection
              userRole={userRole}
              setUserRole={setUserRole}
              employees={employees}
              setEmployees={setEmployees}
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              userStreak={userStreak}
              logActivity={logActivity}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingSection setActiveTab={setActiveTab} />
          )}

          {activeTab === 'contact' && (
            <ContactSection logActivity={logActivity} />
          )}
        </div>

        {/* Dynamic Social Morale Activity Tick ticker sidebar equivalent */}
        {activeTab !== 'home' && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-indigo-600 animate-bounce" />
              <h3 className="text-sm font-bold font-display text-slate-800 uppercase tracking-widest">
                Real-Time Workplace Activity Loop
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activityFeed.slice(0, 3).map((item, idx) => (
                <div key={item.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3">
                  <img src={item.employeeAvatar} className="h-8 w-8 rounded-full border border-slate-150 object-cover" />
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-800 leading-none">
                      {item.employeeName}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal font-light">
                      {item.content}
                    </p>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Modern footer with human standard labels */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center text-amber-200 font-bold">
                A
              </div>
              <span className="font-display font-bold text-white tracking-tight">AuraHR SaaS Inc</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
              <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home Landing</button>
              <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">Philosophy</button>
              <button onClick={() => setActiveTab('hrms')} className="hover:text-white transition-colors">HRMS Modules</button>
              <button onClick={() => setActiveTab('gamification')} className="hover:text-white transition-colors">Vouchers Hub</button>
              <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition-colors">Pricing</button>
              <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">Book Demo</button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light">
            <p>
              AuraHR Systems © 2026. “Product Manav Patel into a Develop Om Patel.” All rights reserved.
            </p>
            <p className="flex items-center gap-1 font-mono font-bold">
              <span>Optimized with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>& Enterprise Gemini AI models</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
