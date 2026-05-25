/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ShieldAlert, Sparkles, Building, Info, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function PricingSection({ setActiveTab }: PricingSectionProps) {
  const PLANS = [
    {
      name: 'SaaS Early Sandbox',
      price: 'Free Trial',
      period: 'Unlimited interactive access',
      description: 'Test every core feature of AuraHR safely inside our simulated sandbox.',
      features: [
        'Enlist up to 3 core employee profiles',
        'Simulate attendance Clock-ins and clockouts',
        'Request server-side Gemini AI insights',
        'Raffle spins of the Wheel of Fortune',
        '100% Client-side and server state persistent'
      ],
      cta: 'Explore Sandbox Dashboard',
      action: () => setActiveTab('dashboard'),
      popular: false
    },
    {
      name: 'Dynamic Startup',
      price: '$5',
      period: 'per worker / month',
      description: 'Bring modern gamified core modules directly into your early organization structure.',
      features: [
        'Full suite of 9 HRMS Modules',
        'Active leaderboards & automatic streaks',
        '3 locked micro-learning pathways',
        'Access to regional Food & Coffee brand coupons',
        'Grounded Gemini sentiment models dashboard'
      ],
      cta: 'Request Startup Trial',
      action: () => setActiveTab('contact'),
      popular: true
    },
    {
      name: 'Enterprise Momentum',
      price: '$12',
      period: 'per worker / month',
      description: 'Sponsor peak employee wellbeing metrics with massive brand partners voucher packages.',
      features: [
        'Dedicated secure AWS/GCP tenant configuration',
        'Unlimited custom corporate brand voucher rewards',
        'Full catalog of 20+ micro-certification syllabi',
        'Pre-integrated Slack or Teams bot alert triggers',
        'Dedicated Chief Solutions Engineer consultations'
      ],
      cta: 'Book Executive consultation',
      action: () => setActiveTab('contact'),
      popular: false
    }
  ];

  return (
    <div id="pricing_section" className="space-y-12 animate-fade-in text-slate-800">
      
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase">
          COMMERCIAL PLAN SCHEDULING
        </span>
        <h2 className="text-3xl font-display font-black tracking-tight text-slate-900">
          Flexible Pricing Tailored for Team Morale
        </h2>
        <p className="text-slate-500 text-sm font-light">
          Scale your engagement loops as your cohort expands. Run our fully-featured free sandbox forever 
          to explore our advanced automated gamifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-3xl p-8 border transition-all flex flex-col justify-between hover:shadow-lg relative overflow-hidden ${
              plan.popular 
                ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                : 'border-slate-200'
            }`}
          >
            {/* Visual glow overlay for popular */}
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-sm">
                POPULAR CHOICE
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-black text-slate-900 text-lg">{plan.name}</h3>
                <p className="text-slate-500 text-xs leading-normal font-light">{plan.description}</p>
              </div>

              <div className="py-2">
                <span className="font-display font-black text-3xl text-slate-900">{plan.price}</span>
                {plan.period && <span className="text-xs text-slate-400 font-normal font-mono block mt-1">{plan.period}</span>}
              </div>

              <ul className="space-y-3.5 text-xs text-slate-700 border-t border-slate-100 pt-6">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className={`h-4.5 w-4.5 shrink-0 ${plan.popular ? 'text-indigo-600' : 'text-slate-500'}`} />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={plan.action}
              className={`w-full tracking-wider mt-8 py-3.5 rounded-2xl font-bold text-xs uppercase transition-all ${
                plan.popular 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
