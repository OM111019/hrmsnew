/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lightbulb, Info, Scale, ShieldCheck, Heart, Users, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <div id="about_section" className="space-y-12 animate-fade-in text-slate-800">
      
      {/* Decorative Title */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          CORPORATE VISION & PHILOSOPHY
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-950">
          The Future of HRMS is Focused on Employee Wellbeing, Morale & Genuine Recognition.
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          The central flaw of legacy HR suites is their unidirectional nature. 
          They are built strictly as recording modules for payroll managers, rather than 
          empowerment hubs for people.
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">Gamification vs. Superficiality</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Many tools create gamified widgets that feel gimmicky. At AuraHR, gamification is deeply integrated 
            into actual HR workflows: clocking in on time earns you attendance points, completing compliance training 
            raises your learning tier, and peer support triggers customizable physical and digital vouchers.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">The Power of Choice</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Instead of standard coffee shop cards, employees choose from a comprehensive rewards marketplace 
            consisting of foods, fitness memberships, CinemaFlix streaming codes, and sitewide retail discounts. 
            Choice communicates true appreciation, driving an unprecedented 94% retention rate.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <Scale className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">Ethical, Grounded AI Analytics</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We use server-side Gemini AI models to analyze trends and behavior metrics constructively. 
            We do not evaluate workers punitively; we leverage automation to suggest custom training pathways, 
            recommend relevant vouchers, and alert HR leads about potential burnout signs before turnover peaks.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">Zero Trust Data Safety</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            All user statistics, reviews, feedback cycles, and reward balances are safely localized 
            and processed securely. Enterprise-grade parameters isolate corporate data from general public LLM pools.
          </p>
        </div>
      </div>

      {/* Visual Quote / Case Study and Morale */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-slate-800">
        <div className="max-w-2xl space-y-6">
          <Sparkles className="h-8 w-8 text-amber-400" />
          <p className="text-xl font-display font-medium leading-relaxed italic text-white">
            “By introducing AuraHR, we witnessed a 64% increase in daily employee platform engagement within 30 days. Our engineers completed mandatory cybersecurity certificates twice as fast to capture the gold vouchers.”
          </p>
          <div className="border-t border-slate-800 pt-4">
            <div className="font-bold text-slate-200">Saskia Vance</div>
            <div className="text-xs text-slate-400">Chief Human Resources Officer at Apex Logistics SaaS</div>
          </div>
        </div>
      </section>

    </div>
  );
}
