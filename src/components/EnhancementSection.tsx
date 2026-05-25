/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, CheckCircle, Award, PlayCircle, 
  BrainCircuit, Coins, Check, AlertCircle, HelpCircle
} from 'lucide-react';
import { Course } from '../types';
import { SAMPLE_COURSES } from '../data';

interface EnhancementSectionProps {
  userPoints: number;
  setUserPoints: (points: number) => void;
  logActivity: (text: string) => void;
}

export default function EnhancementSection({
  userPoints,
  setUserPoints,
  logActivity
}: EnhancementSectionProps) {
  const [courses, setCourses] = useState<Course[]>(SAMPLE_COURSES);
  
  // Interactive Quiz States
  const [activeCourseId, setActiveCourseId] = useState<string>('security_compliance');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  // Hardcoded Quiz details mapped to courses
  const QUIZZES: { [key: string]: { question: string; answers: string[]; correctIdx: number; points: number } } = {
    security_compliance: {
      question: 'Which is the safest mechanism to share sensitive corporate tenant API settings in Slack?',
      answers: [
        'Post the keys directly in general public engineering forums.',
        'Encrypt them inside an environment variables vault and share authorized access pointers.',
        'Text them quickly via personal phone networks with self-destructive settings.',
        'Post them to the project wiki on standard open read-access files.'
      ],
      correctIdx: 1,
      points: 100
    },
    eng_culture: {
      question: 'Within collaborative workspace patterns, how do we best minimize developer fatigue?',
      answers: [
        'Mandate 12-hour synchronous standups.',
        'Establish automated check-in routines and clear, respectful asynchronous timelines.',
        'Forbid employees from requesting rest intermission leaves.',
        'Set surprise OKRs on weekends without consulting task leads.'
      ],
      correctIdx: 1,
      points: 120
    }
  };

  const handleStartLesson = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        if (c.progress < 100) {
          const nextProgress = Math.min(100, c.progress + 25);
          if (nextProgress === 100) {
            setUserPoints(userPoints + c.pointsValue);
            logActivity(`Finished course module: "${c.title}". Rewarded +${c.pointsValue} gold tokens!`);
          } else {
            logActivity(`Advanced 25% in course module: "${c.title}".`);
          }
          return { ...c, progress: nextProgress };
        }
      }
      return c;
    }));
  };

  const handleUnlockCourse = (courseId: string, cost: number) => {
    if (userPoints >= cost) {
      setUserPoints(userPoints - cost);
      setCourses(prev => prev.map(c => {
        if (c.id === courseId) {
          return { ...c, unlocked: true };
        }
        return c;
      }));
      logActivity(`Expended ${cost} points to unlock Premium Module course!`);
    } else {
      alert(`Insufficient balance. You require ${cost} points. Complete quiz checks or attend standard rosters to capture credentials.`);
    }
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer === null) return;

    const quiz = QUIZZES[activeCourseId];
    if (selectedAnswer === quiz.correctIdx) {
      setQuizResult('correct');
      setUserPoints(userPoints + quiz.points);
      logActivity(`Cleared Knowledge Check Quiz for ${activeCourseId}! Received +${quiz.points} points.`);
    } else {
      setQuizResult('incorrect');
      logActivity(`Knowledge Check Quiz failed for ${activeCourseId}. Please revise active training documents.`);
    }
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  const currentQuiz = QUIZZES[activeCourseId];

  return (
    <div id="enhancement_section" className="space-y-12 animate-fade-in text-slate-800">
      
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
          EMPLOYEE ENHANCEMENT & LEARNING
        </span>
        <h2 className="text-3xl font-display font-black tracking-tight text-slate-900">
          Professional Upskilling & Interactive Certification Hub
        </h2>
        <p className="text-slate-500 max-w-3xl text-sm font-light">
          Elevate your capabilities. Completing localized micro-learning programs inside AuraHR enhances 
          your professional competencies while granting points redeemable in the brand marketplace.
        </p>
      </div>

      {/* Courses Loop */}
      <div className="space-y-6">
        <h3 className="font-bold font-display text-slate-900 text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          Active Micro-Courses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold font-mono text-purple-600">
                    +{course.pointsValue} gold
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-base">{course.title}</h4>
                  <p className="text-xs text-slate-400">By {course.instructor} · {course.duration}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="space-y-4 pt-6 mt-6 border-t border-slate-50">
                {course.unlocked ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Course Progress</span>
                      <span className="font-bold">{course.progress}%</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    
                    {course.progress < 100 ? (
                      <button
                        onClick={() => handleStartLesson(course.id)}
                        className="w-full mt-2 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <PlayCircle className="h-4 w-4" /> Study Next Lesson (+25%)
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold justify-center pt-2">
                        <CheckCircle className="h-4 w-4" /> COMPLETED & RETENTION LOCKED
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-3 pt-2">
                    <div className="text-xs text-slate-400">Locked Course. Requires level premium access.</div>
                    <button
                      onClick={() => handleUnlockCourse(course.id, 200)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs transition-all"
                    >
                      Unlock for 200 points
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded interactive knowledge check widget */}
      <div id="knowledge_check_block" className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_to_right,rgba(139,92,246,0.1),transparent)]" />
        
        <div className="space-y-6 relative z-10 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full text-[10px] font-mono font-bold tracking-wider">
              KNOWLEDGE CHECK CHALLENGE
            </span>
            <h3 className="text-2xl font-display font-black leading-tight">
              AuraHR Interactive Micro-Quizzes
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Verify your attention metrics on studied courses. Correct outputs grant you instant points. 
              Switch courses in the dropdown selector below to challenge different content.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <label className="text-xs text-slate-400 font-bold block">Choose Course Quiz Module:</label>
            <select
              value={activeCourseId}
              onChange={(e) => {
                setActiveCourseId(e.target.value);
                handleResetQuiz();
              }}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-200 focus:outline-none w-full max-w-xs"
            >
              <option value="security_compliance">Security & Compliance</option>
              <option value="eng_culture">Team Collaboration Patterns</option>
            </select>
          </div>
        </div>

        {/* Dynamic Interactive Quiz form */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 relative z-10 space-y-4">
          {currentQuiz ? (
            <form onSubmit={handleSubmitQuiz} className="space-y-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 font-mono">
                <BrainCircuit className="h-4 w-4" />
                <span>WORTH +{currentQuiz.points} GOLD TOKENS</span>
              </div>
              
              <h4 className="text-sm font-bold leading-relaxed text-slate-100">
                {currentQuiz.question}
              </h4>

              <div className="space-y-2">
                {currentQuiz.answers.map((ans, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                      selectedAnswer === idx 
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-200' 
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-750'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz_answer"
                      value={idx}
                      checked={selectedAnswer === idx}
                      onChange={() => setSelectedAnswer(idx)}
                      disabled={quizSubmitted}
                      className="hidden"
                    />
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedAnswer === idx ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-700'
                    }`}>
                      {selectedAnswer === idx && <div className="h-2 w-2 bg-white rounded-full" />}
                    </div>
                    <span>{ans}</span>
                  </label>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  type="submit"
                  disabled={selectedAnswer === null}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-colors"
                >
                  Submit Knowledge Verification
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  {quizResult === 'correct' ? (
                    <div className="p-3 bg-green-500/10 border-l-4 border-green-500 text-green-400 rounded text-xs flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 font-bold" />
                      <span>Perfect Score! Correct answer verified. Your points were credited.</span>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded text-xs flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Critical Error. Correct answer was Option #{(currentQuiz.correctIdx + 1)}. Review syllabus and try again.</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="w-full py-2 bg-slate-800 text-slate-300 text-xs rounded-xl hover:bg-slate-700 font-bold"
                  >
                    Try Another Knowledge Run
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center text-slate-400 text-xs py-12">No Quiz available for this section.</div>
          )}
        </div>
      </div>

    </div>
  );
}
