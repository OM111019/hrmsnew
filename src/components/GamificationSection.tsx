/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Trophy, Flame, Sparkles, Coins, Gift, ChevronRight, 
  HelpCircle, RefreshCw, Star, Play, CheckCircle, Search, 
  Filter, Dumbbell, Coffee, Pizza, Tv, ShoppingBag, BadgeAlert
} from 'lucide-react';
import { Badge, RewardItem, Challenge, Employee } from '../types';
import { SAMPLE_BADGES, SAMPLE_REWARDS, SAMPLE_CHALLENGES } from '../data';

interface GamificationSectionProps {
  userPoints: number;
  setUserPoints: (points: number) => void;
  userStreak: number;
  setUserStreak: (streak: number) => void;
  employees: Employee[];
  logActivity: (text: string) => void;
}

export default function GamificationSection({
  userPoints,
  setUserPoints,
  userStreak,
  setUserStreak,
  employees,
  logActivity
}: GamificationSectionProps) {
  // Lists
  const [badges, setBadges] = useState<Badge[]>(SAMPLE_BADGES);
  const [challenges, setChallenges] = useState<Challenge[]>(SAMPLE_CHALLENGES);
  const [rewards, setRewards] = useState<RewardItem[]>(SAMPLE_REWARDS);
  
  // Filtering & search
  const [rewardCategory, setRewardCategory] = useState<string>('all');
  const [leaderboardSearch, setLeaderboardSearch] = useState<string>('');

  // 1. Interactive Spin Wheel states
  const [wheelDegree, setWheelDegree] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [wheelResult, setWheelResult] = useState<string>('');
  const [spinsLeft, setSpinsLeft] = useState<number>(1);

  // 2. Redemption history states (to show inside marketplace)
  const [purchasedCodes, setPurchasedCodes] = useState<{ rewardId: string; code: string; date: string }[]>([]);

  // Spin Fortune Wheel logic
  const handleSpinWheel = () => {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setWheelResult('');
    
    // Choose a random outcome
    const outcomes = [
      { text: 'StarBrew Espresso Code won!', pointsChange: 0, bonusText: 'Free latte voucher credited!' },
      { text: '+100 Bonus Gold Points!', pointsChange: 100 },
      { text: '+250 Super Bonus Points!', pointsChange: 250 },
      { text: 'Pizza Hub Coupon won!', pointsChange: 0, bonusText: 'Gourmet voucher code: ORE-PIZZ' },
      { text: '+50 Gold Coins!', pointsChange: 50 },
      { text: 'Streak Boost! (+1 Streak Day)', pointsChange: 0, streakChange: 1 }
    ];
    
    const pickedIdx = Math.floor(Math.random() * outcomes.length);
    const selected = outcomes[pickedIdx];

    // CSS degree spin simulation
    const targetDegree = wheelDegree + 1800 + (pickedIdx * 60) + Math.random() * 20;
    setWheelDegree(targetDegree);

    setTimeout(() => {
      setSpinning(false);
      setSpinsLeft(spinsLeft - 1);
      
      if (selected.pointsChange) {
        setUserPoints(userPoints + selected.pointsChange);
      }
      if (selected.streakChange) {
        setUserStreak(userStreak + selected.streakChange);
      }
      
      setWheelResult(selected.text);
      logActivity(`Spun the Fortune Wheel and won: "${selected.text}"`);
    }, 4500);
  };

  const handleResetSpins = () => {
    if (userPoints >= 100) {
      setUserPoints(userPoints - 100);
      setSpinsLeft(spinsLeft + 1);
      logActivity('Purchased 1 Fortune Wheel spin for 100 gold points.');
    } else {
      alert('Insufficient points to request premium wheel tickets.');
    }
  };

  // Challenge dynamic progress
  const handleAdvanceChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        if (!ch.completed) {
          const nextProgress = Math.min(100, ch.progress + 25);
          const isDone = nextProgress === 100;
          if (isDone) {
            setUserPoints(userPoints + ch.pointsReward);
            logActivity(`Challenge Unlocked: "${ch.title}"! Received +${ch.pointsReward} gold points.`);
          } else {
            logActivity(`Advanced progress on: "${ch.title}" (+25%).`);
          }
          return { ...ch, progress: nextProgress, completed: isDone };
        }
      }
      return ch;
    }));
  };

  // Reward marketplace buy function
  const handlePurchaseReward = (reward: RewardItem) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints(userPoints - reward.pointsCost);
      const randomCode = `AURA-${reward.brand.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setPurchasedCodes(prev => [
        { rewardId: reward.id, code: randomCode, date: new Date().toLocaleDateString() },
        ...prev
      ]);
      
      logActivity(`Redeemed Reward: "${reward.name}" from ${reward.brand}. Code: ${randomCode}`);
      alert(`Redemption Succeeded! Your brand voucher code: ${randomCode} has been unlocked. An email has been sent to your inbox.`);
    } else {
      alert(`Insufficient Points Balance. You require ${reward.pointsCost} points. Complete wellness checklists and micro-courses to unlock.`);
    }
  };

  // Filtering marketplace list
  const filteredRewards = rewardCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === rewardCategory);

  // Sorting employees on leaderboard by Points
  const leaderboardEmployees = [...employees]
    .filter(e => e.name.toLowerCase().includes(leaderboardSearch.toLowerCase()))
    .sort((a, b) => b.points - a.points);

  const getBadgeRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-slate-300 text-slate-700 bg-slate-50';
      case 'rare': return 'border-blue-300 text-blue-700 bg-blue-50';
      case 'epic': return 'border-purple-300 text-purple-700 bg-purple-50';
      case 'legendary': return 'border-amber-300 text-amber-700 bg-amber-50/70 border-2 font-bold';
      default: return 'border-slate-300 text-slate-700 bg-slate-50';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'food': return <Pizza className="h-4.5 w-4.5" />;
      case 'fitness': return <Dumbbell className="h-4.5 w-4.5" />;
      case 'ott': return <Tv className="h-4.5 w-4.5" />;
      case 'shopping': return <ShoppingBag className="h-4.5 w-4.5" />;
      default: return <Gift className="h-4.5 w-4.5" />;
    }
  };

  return (
    <div id="gamification_section" className="space-y-12 animate-fade-in text-slate-800">
      
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
          GAMIFIED PLAYGROUND & VOUCHERS
        </span>
        <h2 className="text-3xl font-display font-black tracking-tight text-slate-900">
          Corporate Loyalty Arena & Real-Value Marketplace
        </h2>
        <p className="text-slate-500 max-w-3xl text-sm font-light">
          Redeem elements of genuine commercial value. Test the interactive Fortune Wheel, track local 
          group streaks on the leaderboard, or trade earned tokens for food, health, and entertainment vouchers below.
        </p>
      </div>

      {/* Grid: 1. SPIN WHEEL, 2. CHALLENGES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Fortune Wheel block */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-950 font-display text-lg">Fortune Spin Rewards Wheel</h3>
            <p className="text-xs text-slate-400">Convert points to premium raffle spins. (1 Spin = 100 gold)</p>
          </div>

          {/* Visual Spinner Circle Container */}
          <div className="my-8 flex flex-col items-center justify-center relative">
            <div className="relative h-60 w-60 rounded-full border-4 border-slate-900 overflow-hidden flex items-center justify-center shadow-lg shadow-purple-950/20 bg-slate-950">
              
              {/* Wheel graphics rotated by state degree and transitions */}
              <div 
                className="absolute inset-0 transition-transform font-mono"
                style={{ 
                  transform: `rotate(${wheelDegree}deg)`,
                  transition: spinning ? 'transform 4.5s cubic-bezier(0.1, 0.8, 0.1, 1)' : 'none' 
                }}
              >
                {/* Visual division lines */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800/80 -translate-x-1/2" />
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800/80 -translate-y-1/2" />
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800/80 -translate-x-1/2 rotate-45" />
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800/80 -translate-x-1/2 -rotate-45" />

                {/* Text Labels inside segments */}
                <div className="absolute text-[9px] font-bold text-amber-400 top-2 left-1/2 -translate-x-1/2">Espresso Vch</div>
                <div className="absolute text-[9px] font-bold text-purple-300 right-2 top-1/2 -translate-y-1/2 rotate-90">+100 pts</div>
                <div className="absolute text-[9px] font-bold text-amber-400 bottom-2 left-1/2 -translate-x-1/2 rotate-180">Pizza Vch</div>
                <div className="absolute text-[9px] font-bold text-purple-300 left-2 top-1/2 -translate-y-1/2 -rotate-90">+250 pts</div>
                <div className="absolute text-[9px] font-bold text-slate-400 top-1/4 right-3 rotate-45">Custom Free</div>
                <div className="absolute text-[9px] font-bold text-red-400 bottom-1/4 left-3 -rotate-45">1d Streak</div>
              </div>

              {/* Central Pin */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 border border-white absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-white text-xs font-black shadow-inner">
                SPIN
              </div>
            </div>

            {/* Spinner Needle indicator */}
            <div className="absolute top-0 h-0.5 z-30">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-rose-500" />
            </div>

            {/* Result display */}
            <div className="mt-3 text-center h-8">
              {spinning ? (
                <span className="text-xs text-slate-400 animate-pulse">Calculating premium coordinates lock...</span>
              ) : (
                wheelResult && (
                  <span className="text-sm font-bold text-slate-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full font-sans shadow-sm">
                     {wheelResult}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              id="spin_the_wheel_btn"
              onClick={handleSpinWheel}
              disabled={spinning || spinsLeft <= 0}
              className="py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-55 text-white font-bold text-xs rounded-xl transition-all tracking-wider text-center"
            >
              SPIN WHEEL ({spinsLeft} tickets)
            </button>
            <button
              id="buy_tickets_btn"
              onClick={handleResetSpins}
              className="py-3 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs rounded-xl border border-purple-200 transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Buy Ticket (100 pts)
            </button>
          </div>
        </div>

        {/* Challenges list */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-950 font-display text-lg flex items-center gap-1">
              <Star className="h-5 w-5 text-purple-600 fill-purple-200" />
              Active Integration Challenges
            </h3>
            <p className="text-xs text-slate-400">Complete tasks via physical triggers to claim performance points.</p>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {challenges.map(ch => (
              <div key={ch.id} className="p-3.5 border border-slate-100 rounded-xl bg-slate-50 flex flex-col justify-between gap-2">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{ch.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-light mt-0.5">{ch.description}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono font-bold text-purple-600">+{ch.pointsReward} gold</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1.5">
                  <div className="flex-1">
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all" 
                        style={{ width: `${ch.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {ch.completed ? (
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5">
                      <CheckCircle className="h-3 w-3" /> Cleared
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdvanceChallenge(ch.id)}
                      className="px-2.5 py-1 bg-slate-900 text-white rounded text-[10px] font-bold hover:bg-slate-800 transition-colors"
                    >
                      Progress (+25%)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Rewards Marketplace Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold font-display text-slate-950 text-xl flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-500" />
              SaaS Rewards Marketplace
            </h3>
            <p className="text-xs text-slate-400">Exchange accumulated points for verified high-fidelity brand discounts and codes.</p>
          </div>

          {/* Categories Selector */}
          <div className="flex flex-wrap gap-1">
            {['all', 'food', 'ott', 'fitness', 'shopping'].map(cat => (
              <button
                key={cat}
                onClick={() => setRewardCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rewardCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="capitalize">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRewards.map(reward => (
            <div key={reward.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Icon wrapper */}
                  <div className="h-10 w-10.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 flex items-center justify-center text-xl shrink-0">
                    {reward.image}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase p-1.5 rounded bg-indigo-50/70 text-indigo-700">
                    {reward.brand}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{reward.name}</h4>
                  <div className="text-[11px] font-bold text-amber-600 leading-none">{reward.discountValue}</div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-light">{reward.description}</p>
              </div>

              <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Exchange Cost:</span>
                  <span className="font-mono font-black text-slate-800 text-sm">{reward.pointsCost} gold</span>
                </div>

                <button
                  onClick={() => handlePurchaseReward(reward)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all"
                >
                  Buy Voucher Code
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Purchased Redemptions history log */}
        {purchasedCodes.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest font-black text-slate-600">YOUR UNLOCKED CODES ({purchasedCodes.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {purchasedCodes.map((item, idx) => {
                const itemDetails = rewards.find(r => r.id === item.rewardId);
                return (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-900">{itemDetails?.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Unlocked: {item.date}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between p-1 px-2.5 rounded bg-slate-900 text-white font-mono text-[11px] font-black tracking-wider text-center border border-slate-800">
                      <span>{item.code}</span>
                      <span className="text-[8px] opacity-75">Active</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Badges system */}
      <section className="space-y-6">
        <div>
          <h3 className="font-bold font-display text-slate-950 text-xl flex items-center gap-1.5">
            <Trophy className="h-5 w-5 text-indigo-600" />
            Active Milestone Badges
          </h3>
          <p className="text-xs text-slate-400">Personal achievements unlocked or in-progress.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {badges.map(bg => (
            <div key={bg.id} className={`p-4 rounded-xl border flex flex-col items-center text-center space-y-3 ${getBadgeRarityStyle(bg.rarity)}`}>
              {/* Fallback symbol circle based on name */}
              <div className="h-10 w-10.5 rounded-full bg-slate-100 flex items-center justify-center text-lg border border-slate-200 select-none">
                {bg.id === 'streak_3' ? '🔥' :
                 bg.id === 'streak_10' ? '👑' :
                 bg.id === 'course_master' ? '📚' :
                 bg.id === 'team_catalyst' ? '👥' :
                 bg.id === 'gemini_oracle' ? '🧠' : '✨'}
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-900 leading-snug">{bg.name}</h4>
                <div className="text-[9px] font-bold text-slate-400 capitalize mt-0.5">{bg.rarity} Badge</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard comparisons search list */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold font-display text-slate-950 text-lg">Active Enterprise Leaderboard</h3>
            <p className="text-xs text-slate-400">Total company-wide check points and productivity milestones.</p>
          </div>

          <div className="relative w-full max-w-xs shrink-0 bg-white">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter names..."
              value={leaderboardSearch}
              onChange={(e) => setLeaderboardSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-clear border border-slate-200 focus:outline-none text-xs rounded-xl"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 uppercase text-slate-600 font-bold font-mono text-[10px]">
              <tr>
                <th className="p-3.5 text-center">Rank</th>
                <th className="p-3.5">Employee</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Loyalty Level</th>
                <th className="p-3.5 text-right">Points Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaderboardEmployees.map((emp, index) => (
                <tr key={emp.id} className="hover:bg-slate-50/40 font-sans">
                  <td className="p-3.5 text-center font-bold font-mono text-slate-800 text-sm">
                    {index + 1 === 1 ? '🥇' : index + 1 === 2 ? '🥈' : index + 1 === 3 ? '🥉' : `${index + 1}`}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={emp.avatar} alt={emp.name} className="h-8 w-8 rounded-full border border-slate-100 object-cover" />
                      <div>
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[10px] text-slate-400">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600">{emp.department}</td>
                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded">
                      Level {emp.level}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-black font-mono text-slate-900">{emp.points} gold</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
