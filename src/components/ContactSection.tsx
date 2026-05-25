/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Calendar, ArrowRight, CheckCircle, MapPin, Building, Trophy } from 'lucide-react';

interface ContactSectionProps {
  logActivity: (text: string) => void;
}

export default function ContactSection({ logActivity }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [teamSize, setTeamSize] = useState('10-50');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    setSubmitted(true);
    logActivity(`Submitted contact request for: "${name}" at ${company || 'Independent Tenant'}.`);
  };

  return (
    <div id="contact_section" className="space-y-12 animate-fade-in text-slate-800">
      
      {/* Page Header */}
      <div className="space-y-2 max-w-2xl">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase">
          REACH HUMAN REPRESENTATIVES
        </span>
        <h2 className="text-3xl font-display font-black tracking-tight text-slate-900">
          Book an AuraHR Live Integration Demo
        </h2>
        <p className="text-slate-500 text-sm font-light">
          Have customized regional brand rewards in mind? Learn how to deploy the platform 
          locally inside your Workspace configurations in under 30 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Real-world Contact detail pointers */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10.5 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 text-amber-200 flex items-center justify-center font-bold">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-black text-lg text-slate-900">AuraHR Systems</span>
              <div className="text-[10px] text-slate-400 font-mono">GAMIFIED HUMAN RESOURCE ENGINEERING</div>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Connect with our dedicated Solutions team to architect custom points-emission models 
            or review advanced compliance statistics before subscribing.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-150 text-xs">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
              <span>partner-synergy@aurahr.co</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
              <span>+1 (800) GAMIFY-HR</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
              <span>555 Cosmic Avenue, Silicon Plains, CA</span>
            </div>
          </div>
        </div>

        {/* Interactive Form card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Company Email Domain</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Organization Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Apex Solutions SaaS"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Active Team Volume</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-indigo-500"
                  >
                    <option value="1-10">Under 10 participants</option>
                    <option value="10-50">10 to 50 active teams</option>
                    <option value="50-250">50 to 250 employees</option>
                    <option value="250+">Large volume enterprise (250+)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Gamification Goals & Inquiries</label>
                <textarea
                  placeholder="Tell us what regional food or OTT coupons you would like configured..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-indigo-500 h-24 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                Schedule Interactive Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto animate-bounce" />
              <h3 className="text-slate-900 font-bold font-display text-lg">Inquiry Session Locked In</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-700">{name}</span>. We successfully scheduled an introductory sandbox 
                evaluation for <span className="font-bold text-slate-700">{company || 'your organization'}</span>. Our solutions lead 
                will email you within 1 business day.
              </p>
              <div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-900 text-white font-bold text-[10px] rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Send another request
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
