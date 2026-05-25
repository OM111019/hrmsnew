/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trophy, Coins, Flame, Award, ShieldAlert, Sparkles, ArrowRight, Zap, Target, Smile, HeartHandshake } from 'lucide-react';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  userPoints: number;
}

export default function HomeSection({ setActiveTab, userPoints }: HomeSectionProps) {
  return (
    <div id="home_section" className="space-y-16 animate-fade-in">
      
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16">
        {/* Decorative Grid Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_35%)]" />
        
        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            VOTED #1 GAMIFIED SAAS OF 2026
          </div>
          
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            Turn HR Software into <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
              A Daily-Use Experience
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            “Make HRMS fun and engaging.” AuraHR blends enterprise employee management 
            with gamification, rewards, and deep Gemini AI insights to double employee retention, 
            reward genuine work, and amplify satisfaction.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              id="cta_trial_dashboard"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/20"
            >
              Interactive Sandbox Demo
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="cta_explore_rewards"
              onClick={() => setActiveTab('gamification')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition-all"
            >
              Explore Rewards Marketplace
            </button>
          </div>
        </div>

        {/* Embedded Live Performance Highlight widget */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400">
          <div>
            <div className="text-3xl font-bold font-display text-white">2.4x</div>
            <div className="text-xs text-slate-400 mt-1">HRMS login frequency</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-display text-white">93%</div>
            <div className="text-xs text-slate-400 mt-1">Upskilling completion rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-display text-white">$45k+</div>
            <div className="text-xs text-slate-400 mt-1">Brand voucher savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-display text-amber-400 flex items-center gap-1">
              <span>96.4</span>
              <Smile className="h-5 w-5 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400 mt-1">AI employee sentiment score</div>
          </div>
        </div>
      </section>

      {/* Core Philosophical Values */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-display tracking-tight text-slate-900">
            Why Traditional HRMS Fails (And How We Fix It)
          </h2>
          <p className="text-slate-500 font-medium">
            Standard human resources software is accessed once a month for payslips. 
            AuraHR creates micro-incentive loops that reward your team daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">“Reward Real Work”</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Reward small active behaviors like punctuality, collaborative peer feedbacks, 
              and cyber compliance quizzes. Employees earn gold points redeemable instantly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-colors space-y-4">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">“Boost Employee Adoption”</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Enlist daily check-in streaks, experience points counters, beautiful progress tiers, 
              and spins of a fortune rewards wheel to trigger safe gamified feedback loops.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors space-y-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">“AI to Understand Behavior”</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Use server-side Gemini intelligence to track metrics, trigger engagement scores, 
              recommend custom lifestyle rewards, and generate personalized growth advices.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Partnerships Voucher Showcase Teaser */}
      <section className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-indigo-950 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="space-y-6 max-w-lg relative z-10">
          <span className="px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold tracking-wider">
            BRAND PARTNERSHIPS
          </span>
          <h2 className="text-3xl font-display font-black leading-tight">
            Premium Vouchers Your Team Will Actually Love
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            No cheap plastic trophies. Employees spend points on real-world rewards: 
            CinemaFlix premium streaming, Pizza Hub vouchers, StarBrew caffeine, and GoldPulse gym cards.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('gamification')}
              className="inline-flex items-center gap-2 text-amber-300 font-bold text-sm tracking-wide hover:underline cursor-pointer"
            >
              Preview live rewards catalog
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Visual floating coupon mesh */}
        <div className="grid grid-cols-2 gap-4 max-w-md w-full relative z-10">
          <div className="p-4 rounded-xl bg-slate-850/90 border border-slate-700/50 hover:border-indigo-500/30 transition-all transform hover:-translate-y-1">
            <div className="text-2xl">🍕</div>
            <div className="font-bold text-slate-100 text-xs mt-2">Pizza Hub</div>
            <div className="text-amber-300 font-bold text-xs">50% Off Gourmet Pizza</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">300 pts</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-850/90 border border-slate-700/50 hover:border-purple-500/30 transition-all transform hover:-translate-y-1">
            <div className="text-2xl">📺</div>
            <div className="font-bold text-slate-100 text-xs mt-2">CinemaFlix OTT</div>
            <div className="text-purple-300 font-bold text-xs">1 Month Free Streaming</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">650 pts</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-850/90 border border-slate-700/50 hover:border-green-500/30 transition-all transform hover:-translate-y-1">
            <div className="text-2xl">☕</div>
            <div className="font-bold text-slate-100 text-xs mt-2">StarBrew Coffee</div>
            <div className="text-green-300 font-bold text-xs">Free Hot Espresso</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">150 pts</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-850/90 border border-slate-700/50 hover:border-yellow-500/30 transition-all transform hover:-translate-y-1">
            <div className="text-2xl">🛍️</div>
            <div className="font-bold text-slate-100 text-xs mt-2">AuraMarket</div>
            <div className="text-yellow-300 font-bold text-xs">$25 Flat voucher card</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">1000 pts</div>
          </div>
        </div>
      </section>

      {/* Trial Promo Drive banner */}
      <section className="text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-3xl mx-auto space-y-4">
        <HeartHandshake className="h-10 w-10 text-indigo-600 mx-auto" />
        <h3 className="text-xl font-bold text-slate-950 font-display">Experience AuraHR Instantly</h3>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          We loaded detailed pre-configured sample metrics for developers, product managers, and interns. 
          Analyze usage statistics in real time or trigger AI diagnostics on our live dashboards.
        </p>
        <div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors"
          >
            Access Sandbox Environment
          </button>
        </div>
      </section>

    </div>
  );
}
