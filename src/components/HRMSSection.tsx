/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, Calendar, CreditCard, UserPlus, ShieldCheck, 
  ArrowRight, UserCheck, Clock, FileText, Send, 
  Briefcase, Plus, CheckCircle, AlertCircle
} from 'lucide-react';
import { Employee, JobPosting, OnboardingTask, PayrollPayslip } from '../types';
import { SAMPLE_EMPLOYEES, SAMPLE_JOBS, SAMPLE_ONBOARDING_CHECKLIST } from '../data';

interface HRMSSectionProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  userPoints: number;
  setUserPoints: (points: number) => void;
  userStreak: number;
  setUserStreak: (streak: number) => void;
  logActivity: (text: string) => void;
}

export default function HRMSSection({
  employees,
  setEmployees,
  userPoints,
  setUserPoints,
  userStreak,
  setUserStreak,
  logActivity
}: HRMSSectionProps) {
  const [hrmsTab, setHrmsTab] = useState<'employees' | 'attendance' | 'payroll' | 'onboarding'>('employees');

  // Attendance simulation states
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [leaveDaysRequested, setLeaveDaysRequested] = useState(1);
  const [leaveReason, setLeaveReason] = useState('Personal Rest');
  const [leaveConfirmation, setLeaveConfirmation] = useState('');

  // Payroll states
  const [payslips, setPayslips] = useState<PayrollPayslip[]>([
    { id: 'pay_may', month: 'May', year: 2026, baseSalary: 8200, allowances: 400, gamifiedBonus: 250, deductions: 150, netPay: 8700, status: 'Published' },
    { id: 'pay_apr', month: 'April', year: 2026, baseSalary: 8200, allowances: 400, gamifiedBonus: 120, deductions: 150, netPay: 8570, status: 'Published' },
  ]);

  // Recruitment/Onboarding states
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>(SAMPLE_ONBOARDING_CHECKLIST);
  const [jobs, setJobs] = useState<JobPosting[]>(SAMPLE_JOBS);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Engineering');
  const [newJobSalary, setNewJobSalary] = useState('$90k - $110k');

  // Core Self-Service functions
  const handleClockIn = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      logActivity('Clocked out of the session');
    } else {
      setIsClockedIn(true);
      const attendanceReward = 50;
      setUserPoints(userPoints + attendanceReward);
      // Double check streak logic
      setUserStreak(userStreak + 1);
      logActivity(`Clocked In successfully! Received +${attendanceReward} Streak points.`);
    }
  };

  const handleRequestLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (leaveDaysRequested <= 0) return;
    setLeaveConfirmation(`Successfully registered a leave request of ${leaveDaysRequested} day(s) for "${leaveReason}". Standard HR approval cycle started.`);
    logActivity(`Submitted self-service leave request: ${leaveDaysRequested} days of "${leaveReason}".`);
    
    // Update Marcus's or first employee's pending leave balance
    setEmployees(prev => prev.map(emp => {
      if (emp.id === 'emp_101') {
        return {
          ...emp,
          leavesTaken: emp.leavesTaken + leaveDaysRequested,
          leavesBalance: Math.max(0, emp.leavesBalance - leaveDaysRequested)
        };
      }
      return emp;
    }));
  };

  const handleToggleOnboarding = (id: string) => {
    setOnboardingTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        if (newStatus === 'completed') {
          setUserPoints(userPoints + 40);
          logActivity(`Completed Onboarding Task: "${task.title}". Awarded +40 gold tokens!`);
        }
        return { ...task, status: newStatus as 'completed' | 'pending' };
      }
      return task;
    }));
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;
    const added: JobPosting = {
      id: `j_${Date.now()}`,
      role: newJobTitle,
      department: newJobDept,
      type: 'Full-time',
      applications: 0,
      status: 'Active',
      salaryRange: newJobSalary
    };
    setJobs([added, ...jobs]);
    setNewJobTitle('');
    logActivity(`Posted recruitment search for "${newJobTitle}" under ${newJobDept}.`);
  };

  return (
    <div id="hrms_section" className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Mini Title and Description */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          CORE ENDPOINT MODULES
        </span>
        <h2 className="text-3xl font-display font-black tracking-tight text-slate-900">
          The SaaS Core: Built to Elevate Everyday HR Needs
        </h2>
        <p className="text-slate-500 max-w-3xl text-sm font-light">
          Experience our modular, responsive, full-stack HR structure. Manage workforce logs, 
          simulate attendance events, run payslip formulas, and explore onboarding checklists in the dashboard below.
        </p>
      </div>

      {/* Internal HRMS Navigator */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setHrmsTab('employees')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            hrmsTab === 'employees'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="h-4 w-4" />
          Employee Directory
        </button>
        <button
          onClick={() => setHrmsTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            hrmsTab === 'attendance'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="h-4 w-4" />
          Self-Service Attendance
        </button>
        <button
          onClick={() => setHrmsTab('payroll')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            hrmsTab === 'payroll'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Payroll & Bonuses
        </button>
        <button
          onClick={() => setHrmsTab('onboarding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            hrmsTab === 'onboarding'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UserPlus className="h-4 w-4" />
          Onboarding & Jobs
        </button>
      </div>

      {/* RENDER HRMS SUB-VIEWS */}

      {/* 1. Employee Directory Grid */}
      {hrmsTab === 'employees' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Workforce Management Base</h3>
              <p className="text-xs text-slate-500">Live roster details with embedded game level telemetry.</p>
            </div>
            <div className="text-xs px-3 py-1 bg-blue-100/50 text-blue-800 rounded-full font-mono font-bold">
              {employees.length} Members Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {employees.map(emp => (
              <div key={emp.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} alt={emp.name} className="h-12 w-12 rounded-full border border-slate-100 object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{emp.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">{emp.role}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-100 py-3">
                  <div>
                    <span className="text-slate-400 block font-light">Department</span>
                    <span className="font-bold text-slate-800">{emp.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-light">Status</span>
                    <span className={`italic font-bold capitalize ${
                      emp.status === 'active' ? 'text-green-600' :
                      emp.status === 'remote' ? 'text-indigo-600' : 'text-amber-600'
                    }`}>{emp.status}</span>
                  </div>
                </div>

                {/* Gamified Stat Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">Lv {emp.level}</span>
                      <span>Gamified Tier</span>
                    </span>
                    <span className="text-slate-500 font-mono">{emp.points} gold / {emp.xpNeeded} XP</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                      style={{ width: `${Math.min(100, (emp.points / emp.xpNeeded) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Culture Rating:</span>
                  <span className="font-bold text-indigo-600 font-mono">{emp.engagementScore}% sentiment</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Self-Service Attendance simulator */}
      {hrmsTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Action Check in panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <h3 className="font-bold font-display text-slate-900 text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              Clock-In Console (Aura Sync)
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              In AuraHR, punching in isn't just a record — it builds up check-in streaks. 
              Clocking in on-time secures you <span className="text-amber-600 font-bold">+50 gold points</span> and boosts daily habit milestones.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider font-bold">CURRENT STATUS</span>
                <h4 className={`text-xl font-bold font-display ${isClockedIn ? 'text-green-600' : 'text-slate-400'}`}>
                  {isClockedIn ? '● ACTIVE WORK SPRINT ONGOING' : '○ NOT CLOCKED IN'}
                </h4>
              </div>

              <button
                id="punch_attendance_btn"
                onClick={handleClockIn}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all uppercase ${
                  isClockedIn 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                }`}
              >
                {isClockedIn ? 'Clock Out Now' : 'Clock In & Secure Streak +50pts'}
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600">Attendance Statistics:</span>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xl font-mono font-bold text-slate-800">98%</div>
                  <div className="text-[10px] text-slate-400">Punctuality Rate</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xl font-mono font-bold text-slate-800">11 days</div>
                  <div className="text-[10px] text-slate-400">Current Streak</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xl font-mono font-bold text-slate-800">15 days</div>
                  <div className="text-[10px] text-slate-400">Leaves Balance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Leave Request form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold font-display text-slate-900 text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Submit Self-Service Leave Request
            </h3>
            
            <form onSubmit={handleRequestLeave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Leave Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={leaveDaysRequested}
                    onChange={(e) => setLeaveDaysRequested(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Category</label>
                  <select
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500 text-sm"
                  >
                    <option value="Wellness Intermission">Wellness Pause</option>
                    <option value="Personal Rest">Personal Rest</option>
                    <option value="Medical Isolation">Healthcare Outage</option>
                    <option value="Family Event">Family Obligations</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Constructive Context (sent to lead)</label>
                <textarea
                  placeholder="Need visual rest to restore cognitive performance cycles..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-indigo-500 text-sm h-16 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-colors"
              >
                File Leave Request Module
              </button>
            </form>

            {leaveConfirmation && (
              <div className="p-3 bg-indigo-50 text-indigo-800 border-l-4 border-indigo-600 rounded text-xs leading-relaxed flex items-start gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
                <span>{leaveConfirmation}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Payroll & gamified bonus metrics */}
      {hrmsTab === 'payroll' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                SaaS Automatic Payroll Calculations
              </h3>
              <p className="text-xs text-slate-500">
                Your monthly base earnings, augmented dynamically by converting redeemed gamified bonus points!
              </p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-xs font-light">Calculated Currency</span>
              <div className="text-sm font-bold text-slate-800">USD ($)</div>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 font-bold uppercase text-slate-700">
                <tr>
                  <th className="p-3.5">Payslip ID</th>
                  <th className="p-3.5">Billing Month</th>
                  <th className="p-3.5">Base Salary</th>
                  <th className="p-3.5">Allowances</th>
                  <th className="p-3.5 hover:text-amber-700">Gamified Points Cash-Bonus</th>
                  <th className="p-3.5">Deductions</th>
                  <th className="p-3.5">Net Payout</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {payslips.map(slip => (
                  <tr key={slip.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 text-slate-400">{slip.id}</td>
                    <td className="p-3.5 font-sans font-bold text-slate-800">{slip.month} {slip.year}</td>
                    <td className="p-3.5">${slip.baseSalary.toLocaleString()}</td>
                    <td className="p-3.5">${slip.allowances}</td>
                    <td className="p-3.5 text-amber-600 font-bold">${slip.gamifiedBonus}</td>
                    <td className="p-3.5 bg-red-50/20 text-red-500">-${slip.deductions}</td>
                    <td className="p-3.5 font-sans font-black text-slate-900">${(slip.baseSalary + slip.allowances + slip.gamifiedBonus - slip.deductions).toLocaleString()}</td>
                    <td className="p-3.5 font-sans">
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                        {slip.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-slate-800">Earn More via Gamified Bonuses</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Every 1,000 extra points in your loyalty wallet translates directly inside the ERP into a $100 flat bonus in payouts.
              </p>
            </div>
            <button
              id="redeem_payroll_bonus"
              onClick={() => {
                if (userPoints >= 500) {
                  setUserPoints(userPoints - 500);
                  setPayslips(prev => prev.map((s, idx) => {
                    if (idx === 0) {
                      return { ...s, gamifiedBonus: s.gamifiedBonus + 50 };
                    }
                    return s;
                  }));
                  logActivity("Redeemed 500 points for a $50 instant cash payroll bonus!");
                } else {
                  alert("You need at least 500 points in your account to convert to payroll cash!");
                }
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Convert 500 pts to $50 Payroll Cash
            </button>
          </div>
        </div>
      )}

      {/* 4. Recruitment and Onboarding tasks */}
      {hrmsTab === 'onboarding' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          
          {/* Active checklists (Onboarding) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Gamified Onboarding Checklist</h3>
              <p className="text-xs text-slate-500">Complete tasks to receive initial starter points!</p>
            </div>

            <div className="space-y-2">
              {onboardingTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => handleToggleOnboarding(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    task.status === 'completed' 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : 'bg-slate-50/40 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`h-5.5 w-5.5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                    task.status === 'completed' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent'
                  }`}>
                    {task.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block font-mono">Scope: {task.role}</span>
                  </div>
                  <span className="ml-auto text-amber-600 font-mono text-[10px] font-bold">+40 pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Job Posting (Recruitment) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">SaaS Recruitment Campaign Launcher</h3>
              <p className="text-xs text-slate-500 font-light">Host and launch hiring streams instantly.</p>
            </div>

            <form onSubmit={handleAddJob} className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-bold text-slate-700">Launch New Recruitment Search</div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="e.g. Lead Designer"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-indigo-500"
                />
                <select
                  value={newJobDept}
                  onChange={(e) => setNewJobDept(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-indigo-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                  <option value="Support & Ops">Support</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Launch Vacancy Search
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {jobs.map(job => (
                <div key={job.id} className="p-3 border border-slate-100 rounded-xl bg-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{job.role}</h4>
                    <span className="text-[10px] text-slate-400 font-mono italic">{job.department} · {job.salaryRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-indigo-600 font-mono font-bold text-[11px] block">{job.applications} users</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">{job.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
