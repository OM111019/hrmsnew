/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, Flame, Sparkles, Coins, HelpCircle, LayoutDashboard, 
  BrainCircuit, Users, CheckCircle, ArrowRight, Loader2, Smile,
  TrendingUp, Activity, ClipboardList, Info, BadgeAlert, Laptop
} from 'lucide-react';
import { Employee, RewardItem, AIAnalysisResponse } from '../types';
import { SAMPLE_REWARDS } from '../data';

interface DashboardSectionProps {
  userRole: 'admin' | 'employee';
  setUserRole: (role: 'admin' | 'employee') => void;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  userPoints: number;
  setUserPoints: (points: number) => void;
  userStreak: number;
  logActivity: (text: string) => void;
}

export default function DashboardSection({
  userRole,
  setUserRole,
  employees,
  setEmployees,
  userPoints,
  setUserPoints,
  userStreak,
  logActivity
}: DashboardSectionProps) {
  // AI Diagnostics state
  const [selectedAIEmployeeId, setSelectedAIEmployeeId] = useState<string>('emp_101');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<AIAnalysisResponse | null>(null);

  // Administrative Trial metrics state
  const [trialTotalEmployees, setTrialTotalEmployees] = useState<number>(45);
  const [trialActiveDaily, setTrialActiveDaily] = useState<number>(38);
  const [trialPointsMinted, setTrialPointsMinted] = useState<number>(12400);
  const [trialRewardsRedeemed, setTrialRewardsRedeemed] = useState<number>(12);
  const [trialChallengeParticipantPct, setTrialChallengeParticipantPct] = useState<number>(78);

  // AI Active state
  const [aiTypeUsed, setAiTypeUsed] = useState<string>('');

  // Call Server-side API 1: Employee Engagement Strategy
  const triggerEngagementAnalysis = async () => {
    const employee = employees.find(e => e.id === selectedAIEmployeeId) || employees[0];
    setAiLoading(true);
    setAiResponse(null);
    setAiTypeUsed('engagement');
    
    try {
      const res = await fetch('/api/ai/analyze-engagement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee })
      });
      const data = await res.json();
      setAiResponse(data);
      logActivity(`Ran Gemini AI Morale analysis for "${employee.name}"`);
    } catch (err) {
      console.error(err);
      alert('Failed to connect to full-stack API server.');
    } finally {
      setAiLoading(false);
    }
  };

  // Call Server-side API 2: Reward Matching
  const triggerRewardRecommendation = async () => {
    const employee = employees.find(e => e.id === selectedAIEmployeeId) || employees[0];
    setAiLoading(true);
    setAiResponse(null);
    setAiTypeUsed('rewards');
    
    try {
      const res = await fetch('/api/ai/recommend-rewards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee, rewardsCatalog: SAMPLE_REWARDS })
      });
      const data = await res.json();
      setAiResponse(data);
      logActivity(`Ran Gemini AI Rewards matcher for "${employee.name}"`);
    } catch (err) {
      console.error(err);
      alert('Failed to execute AI rewards lookup.');
    } finally {
      setAiLoading(false);
    }
  };

  // Call Server-side API 3: Employee Growth & Performance
  const triggerPerformanceAnalysis = async () => {
    const employee = employees.find(e => e.id === selectedAIEmployeeId) || employees[0];
    setAiLoading(true);
    setAiResponse(null);
    setAiTypeUsed('performance');
    
    try {
      const res = await fetch('/api/ai/analyze-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee })
      });
      const data = await res.json();
      setAiResponse(data);
      logActivity(`Ran Gemini AI Growth suggestions for "${employee.name}"`);
    } catch (err) {
      console.error(err);
      alert('Failed to query custom learning plans.');
    } finally {
      setAiLoading(false);
    }
  };

  // Call Server-side API 4: Trial Corporate Behavior diagnostics
  const triggerTrialBehaviorAnalysis = async () => {
    setAiLoading(true);
    setAiResponse(null);
    setAiTypeUsed('trial-behavior');
    
    const metrics = {
      totalEmployees: trialTotalEmployees,
      activeDaily: trialActiveDaily,
      activePct: Math.round((trialActiveDaily / trialTotalEmployees) * 100),
      pointsMinted: trialPointsMinted,
      rewardsRedeemed: trialRewardsRedeemed,
      challengeParticipation: trialChallengeParticipantPct
    };

    try {
      const res = await fetch('/api/ai/analyze-trial-behavior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trialMetrics: metrics })
      });
      const data = await res.json();
      setAiResponse(data);
      logActivity('Executed full-suite Gemini trial behavioral analysis.');
    } catch (err) {
      console.error(err);
      alert('Failed to connect to SaaS behavioral node.');
    } finally {
      setAiLoading(false);
    }
  };

  // Call Server-side API 5: Executive morale summary briefing
  const triggerMoraleSummaryBrief = async () => {
    setAiLoading(true);
    setAiResponse(null);
    setAiTypeUsed('morale-brief');
    
    try {
      const res = await fetch('/api/ai/admin-morale-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          activeStreaks: Math.max(...employees.map(e => e.streak)),
          pointsDistributed: trialPointsMinted,
          turnoverEstimate: 3 
        })
      });
      const data = await res.json();
      setAiResponse(data);
      logActivity('Obtained live Gemini Executive Morale summary report.');
    } catch (err) {
      console.error(err);
      alert('Could not pull corporate morale summary.');
    } finally {
      setAiLoading(false);
    }
  };

  const getPersonalEmployee = () => {
    return employees.find(e => e.id === 'emp_101') || employees[0];
  };

  const personalEmp = getPersonalEmployee();

  return (
    <div id="dashboard_section" className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Top Banner introducing Perspectives */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-indigo-950 text-white border border-indigo-900 shadow-md">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">INTERACTIVE TRIAL SAAS SANDBOX</span>
          <h2 className="text-xl font-bold font-display">AuraHR Dual-perspective Workspaces</h2>
          <p className="text-xs text-slate-300">Switch viewpoints to simulate both administrative tools and direct participant roles.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setUserRole('admin')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              userRole === 'admin' 
                ? 'bg-blue-600 text-white shadow' 
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Corporate Admin Screen
          </button>
          <button
            onClick={() => setUserRole('employee')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              userRole === 'employee' 
                ? 'bg-purple-600 text-white shadow' 
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Employee Workspace
          </button>
        </div>
      </div>

      {/* PERSPECTIVE A: CORPORATE ADMIN PERSPECTIVE */}
      {userRole === 'admin' && (
        <div className="space-y-8 animate-fade-in text-slate-800">
          
          {/* Main SaaS trial metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
              <Users className="h-5 w-5 text-blue-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-400 font-mono uppercase">Enrolled Members</div>
              <div className="text-2xl font-display font-black text-slate-900">{trialTotalEmployees}</div>
              <div className="text-[9px] text-slate-400">Total early profiles</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
              <Laptop className="h-5 w-5 text-indigo-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-400 font-mono uppercase">Daily Active %</div>
              <div className="text-2xl font-display font-black text-slate-900">
                {Math.round((trialActiveDaily / trialTotalEmployees) * 100)}%
              </div>
              <div className="text-[9px] text-slate-400">{trialActiveDaily} of {trialTotalEmployees} clockins</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
              <Coins className="h-5 w-5 text-amber-500 mx-auto" />
              <div className="text-[11px] font-bold text-slate-400 font-mono uppercase">Points Circulating</div>
              <div className="text-2xl font-display font-black text-slate-900">{trialPointsMinted}</div>
              <div className="text-[9px] text-slate-400">Earned through upskillion</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
              <Trophy className="h-5 w-5 text-emerald-600 mx-auto" />
              <div className="text-[11px] font-bold text-slate-400 font-mono uppercase">Vouchers Claimed</div>
              <div className="text-2xl font-display font-black text-slate-900">{trialRewardsRedeemed}</div>
              <div className="text-[9px] text-slate-400">Direct commercial savings</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
              <Activity className="h-5 w-5 text-rose-500 mx-auto" />
              <div className="text-[11px] font-bold text-slate-400 font-mono uppercase">Participation Rate</div>
              <div className="text-2xl font-display font-black text-slate-900">{trialChallengeParticipantPct}%</div>
              <div className="text-[9px] text-slate-400">Collaborations checked</div>
            </div>

          </div>

          {/* Grid: 1) Admin control simulator form, 2) Core enterprise AI analysis control console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Control and variable tuner form */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 font-display text-base">TRIAL PARAMETERS TUNER</h3>
                <p className="text-xs text-slate-400">Alter early participant behaviors to evaluate server responses.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Company Size (Workers)</label>
                    <input
                      type="number"
                      value={trialTotalEmployees}
                      onChange={(e) => setTrialTotalEmployees(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs focus:outline-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Active Daily Attendees</label>
                    <input
                      type="number"
                      value={trialActiveDaily}
                      onChange={(e) => setTrialActiveDaily(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Total Points Emitted</label>
                    <input
                      type="number"
                      step="500"
                      value={trialPointsMinted}
                      onChange={(e) => setTrialPointsMinted(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs focus:outline-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Commercial Redemptions</label>
                    <input
                      type="number"
                      value={trialRewardsRedeemed}
                      onChange={(e) => setTrialRewardsRedeemed(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs focus:outline-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">Challenge Participation Rate (%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={trialChallengeParticipantPct}
                    onChange={(e) => setTrialChallengeParticipantPct(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>10% Low</span>
                    <span>Current: {trialChallengeParticipantPct}%</span>
                    <span>100% High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Admin AI Analytics console */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl text-white space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_to_right,rgba(99,102,241,0.08),transparent)]" />
              
              <div className="relative z-10 flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                  <BrainCircuit className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="font-bold font-display text-g text-slate-50">Gemini Proactive Administrative Morale Center</h3>
                  <p className="text-xs text-slate-400">Evaluate organizational adherence metrics, predict turnover events, and unlock campaign rationales.</p>
                </div>
              </div>

              {/* Roster profiles selector inside Admin panel for evaluation */}
              <div className="bg-slate-950 p-3.5 border border-slate-850 rounded-xl space-y-2 relative z-10">
                <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">CHOOSE AN EMPLOYEE PROFILE TO AUDIT:</label>
                <select
                  value={selectedAIEmployeeId}
                  onChange={(e) => setSelectedAIEmployeeId(e.target.value)}
                  className="w-full bg-slate-900 text-xs border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.role} - Level {emp.level})</option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400">Evaluate points, streaks, levels, activity lists, and attendance variables.</div>
              </div>

              {/* Action Buttons grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                <button
                  id="admin_analyze_engagement_btn"
                  onClick={triggerEngagementAnalysis}
                  disabled={aiLoading}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  Audit Engagement
                </button>
                <button
                  id="admin_recommend_rewards_btn"
                  onClick={triggerRewardRecommendation}
                  disabled={aiLoading}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  Recommend Rewards
                </button>
                <button
                  id="admin_analyze_performance_btn"
                  onClick={triggerPerformanceAnalysis}
                  disabled={aiLoading}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  Upskill Path Advice
                </button>
              </div>

              {/* Company Level Buttons */}
              <div className="border-t border-slate-800 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                <button
                  id="admin_trial_behavior_btn"
                  onClick={triggerTrialBehaviorAnalysis}
                  disabled={aiLoading}
                  className="py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Evaluate Whole Trial Cohort
                </button>
                <button
                  id="admin_morale_summary_btn"
                  onClick={triggerMoraleSummaryBrief}
                  disabled={aiLoading}
                  className="py-2.5 bg-transparent hover:bg-slate-850 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  Get Executive Morale Brief
                </button>
              </div>
            </div>

          </div>

          {/* RENDER AI RESPONSE OUTLINE */}
          <div id="ai_response_display">
            {aiLoading && (
              <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-800">Interrogating Server-side Gemini intelligence...</p>
                <p className="text-xs text-slate-400">Formulating diagnostic parameters index and matching optimal compensation paths.</p>
              </div>
            )}

            {!aiLoading && aiResponse && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm border-t-4 border-t-indigo-500">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-black font-display text-slate-900 tracking-tight uppercase">
                      Gemini Cognitive Diagnostic Feedback
                    </span>
                  </div>
                  <span className="text-[10px] font-mono p-1 bg-amber-500/10 text-amber-600 rounded font-bold">
                    Powered by gemini-3.5-flash
                  </span>
                </div>

                {/* Score badge if exists */}
                {aiResponse.score !== undefined && (
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-display font-black text-indigo-600 font-mono">
                      {aiResponse.score}<span className="text-sm text-slate-400">/100</span>
                    </div>
                    <div>
                      <div className="text-xs text-slate-800 font-bold">Predicted Culture/Morale Alignment Score</div>
                      <div className="text-[10px] text-slate-400">Calculated based on active check-in consistency, upskilling modules completed, and voucher redeems.</div>
                    </div>
                  </div>
                )}

                {/* Main description text */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Executive Summary</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans mt-1">
                    {aiResponse.summaryText}
                  </p>
                </div>

                {/* Strengths list if any */}
                {aiResponse.strengths && aiResponse.strengths.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Core Roster Strengths Identified</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiResponse.strengths.map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-1.5">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metrics evaluation list if trial diagnostics used */}
                {aiResponse.metricsAnalysis && aiResponse.metricsAnalysis.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block font-sans">Behavioral Performance Metric Evaluation</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {aiResponse.metricsAnalysis.map((met, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 text-xs">{met.metric}</span>
                            <span className="text-xs font-bold font-mono text-indigo-600">{met.score}/100</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{met.evaluation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coaching Tips / Actions list */}
                {aiResponse.coachingTips && aiResponse.coachingTips.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Actionable Human Resource Advice</span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {aiResponse.coachingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="h-5 w-5 rounded-full bg-indigo-50 text-indigo-700 font-bold font-mono text-[10px] shrink-0 flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions / Rewards */}
                {aiResponse.suggestions && aiResponse.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Immediate Actionable Milestones</span>
                    <ul className="space-y-1.5 text-xs text-slate-750">
                      {aiResponse.suggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2 italic">
                          <span>🎯 {sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dynamic Recommended Rewards Cards if matched by AI */}
                {aiResponse.recommendedRewards && aiResponse.recommendedRewards.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-150">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">AI Handpicked Reward Vouchers Match</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {aiResponse.recommendedRewards.map((reward: any) => (
                        <div key={reward.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              {/* Display Emoji or similar */}
                              <span className="text-xl">{reward.image}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-bold uppercase">{reward.brand}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-xs mt-2 leading-tight">{reward.name}</h4>
                            <p className="text-[10px] text-indigo-600 mt-1 leading-relaxed italic">{reward.reason || 'Optimal budget value match.'}</p>
                          </div>
                          
                          <div className="pt-2 text-right">
                            <span className="text-[10px] font-mono text-slate-400 font-bold block">Cost: {reward.pointsCost} gold</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* PERSPECTIVE B: GENERAL INDIVIDUAL EMPLOYEE WORKSPACE PERSPECTIVE */}
      {userRole === 'employee' && (
        <div className="space-y-8 animate-fade-in text-slate-800">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left employee stats Summary Card */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <img src={personalEmp.avatar} alt={personalEmp.name} className="h-14 w-15 rounded-full object-cover border-2 border-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{personalEmp.name}</h3>
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">{personalEmp.role}</span>
                  <div className="text-[10px] text-indigo-600 font-bold mt-0.5 bg-indigo-50 px-2 py-0.5 rounded-full inline-block">Engineering dept</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-3.5 text-center">
                <div>
                  <div className="text-sm font-bold text-slate-800 font-mono">Lv {personalEmp.level}</div>
                  <div className="text-[9px] text-slate-400">Current LV</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 font-mono">{userPoints} pts</div>
                  <div className="text-[9px] text-slate-400">Coins Wallet</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 font-mono">{userStreak}d streak</div>
                  <div className="text-[9px] text-slate-400">Streak days</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Loyalty Level Progression XP</span>
                  <span className="font-bold">{personalEmp.points} / {personalEmp.xpNeeded} XP</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                    style={{ width: `${Math.min(100, (personalEmp.points / personalEmp.xpNeeded) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Middle panel: Dynamic self-service diagnostic suggestions */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-white space-y-4">
              <span className="text-[10px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded">AI CAREER COPILOT</span>
              <h3 className="font-bold font-display text-slate-50 text-base flex items-center gap-1">
                <BrainCircuit className="h-4.5 w-4.5 text-amber-400" />
                Your Personalized Growth Insights
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Secure coaching feedback directly from server-side Gemini. The model analyzes your local attendance records, 
                accomplished badges, and activity indices to plan your career trajectory.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  id="emp_coaching_engagement_btn"
                  onClick={() => {
                    setSelectedAIEmployeeId('emp_101');
                    triggerEngagementAnalysis();
                  }}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 text-[11px] font-bold rounded-xl"
                >
                  Analyze Wellbeing
                </button>
                <button
                  id="emp_coaching_rewards_btn"
                  onClick={() => {
                    setSelectedAIEmployeeId('emp_101');
                    triggerRewardRecommendation();
                  }}
                  className="py-2.5 bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 text-[11px] font-bold rounded-xl"
                >
                  Recommend Vouchers
                </button>
              </div>
            </div>

            {/* Right Panel: Embedded checklist / activity feed */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-bold text-slate-950 font-display text-xs uppercase tracking-wider text-slate-400">Your Recent Activity Stream</h3>
              <div className="space-y-2.5 overflow-y-auto max-h-48">
                {personalEmp.recentActivity.map((act, idx) => (
                  <div key={idx} className="flex gap-2 text-xs">
                    <span className="text-indigo-600 shrink-0 mt-0.5">✔</span>
                    <span className="text-slate-700 font-light">{act}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RENDER DYNAMIC AI CONTAINER */}
          <div>
            {aiLoading && (
              <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-800">Gemini Career Coach is translating parameters...</p>
              </div>
            )}

            {!aiLoading && aiResponse && (
              <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-3xl space-y-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Smile className="h-5 w-5 text-indigo-600 animate-bounce" />
                  <span className="font-bold text-sm text-slate-900 uppercase font-display">Your Personalized Gemini Consultation</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {aiResponse.summaryText}
                </p>

                {aiResponse.strengths && aiResponse.strengths.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Recognized Competencies</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {aiResponse.strengths.map((st, idx) => (
                        <li key={idx} className="bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100/30 flex items-start gap-1.5">
                          <CheckCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiResponse.coachingTips && aiResponse.coachingTips.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Growth Exercises Specified For You</div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {aiResponse.coachingTips.map((tip, idx) => (
                        <li key={idx}>🎯 {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiResponse.recommendedRewards && aiResponse.recommendedRewards.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Recommended Marketplace Deals</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {aiResponse.recommendedRewards.map((reward: any) => (
                        <div key={reward.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <span className="text-lg">{reward.image}</span>
                          <h4 className="font-bold text-slate-900 text-xs mt-1">{reward.name}</h4>
                          <span className="text-[10px] text-indigo-600 block italic mt-1">{reward.reason}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold block mt-1.5">Cost: {reward.pointsCost} gold</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
