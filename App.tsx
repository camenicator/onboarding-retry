
import React, { useState, useEffect } from 'react';
import { INITIAL_QUESTS } from './constants';
import { Quest, QuestStatus } from './types';
import QuestItem from './components/QuestItem';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [selectedQuest, setSelectedQuest] = useState<Quest>(INITIAL_QUESTS[0]);
  const [taskStates, setTaskStates] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleTask = (questId: number, taskIndex: number) => {
    const key = `${questId}-${taskIndex}`;
    setTaskStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentQuestTasks = selectedQuest.tasks.map((_, i) => taskStates[`${selectedQuest.id}-${i}`]);
  const isQuestComplete = currentQuestTasks.every(Boolean) && currentQuestTasks.length > 0;

  const handleQuestComplete = () => {
    setQuests(prev => {
      const updated = prev.map(q => {
        if (q.id === selectedQuest.id) {
          return { ...q, status: QuestStatus.COMPLETED };
        }
        if (q.id === selectedQuest.id + 1 && q.status === QuestStatus.LOCKED) {
          return { ...q, status: QuestStatus.AVAILABLE };
        }
        return q;
      });
      return updated;
    });

    if (selectedQuest.id === 5) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const progress = (quests.filter(q => q.status === QuestStatus.COMPLETED).length / quests.length) * 100;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-game font-bold text-xl">C2S</div>
            <div>
              <h1 className="text-xl font-bold">World Expedition</h1>
              <p className="text-xs text-slate-400">Com2uS New Adventurer Onboarding</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-game">EXP PROGRESS</span>
              <span className="text-xs font-game">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar - Quest List */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <span className="text-red-500">🚩</span> 퀘스트 목록
          </h2>
          <div className="space-y-3">
            {quests.map(quest => (
              <QuestItem 
                key={quest.id} 
                quest={quest} 
                onSelect={setSelectedQuest} 
                isActive={selectedQuest.id === quest.id}
              />
            ))}
          </div>
        </div>

        {/* Main Panel - Quest Details */}
        <div className="lg:col-span-8">
          <div className="card-glass rounded-3xl p-6 md:p-10 border border-slate-700 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold font-game mb-2">
                  LEVEL {selectedQuest.id}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">{selectedQuest.title}</h2>
                <p className="text-slate-400 mt-2 text-lg">{selectedQuest.description}</p>
              </div>
              <div className="text-6xl p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-inner">
                {selectedQuest.icon}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Mission Checkpoints</h3>
              <div className="space-y-4">
                {selectedQuest.tasks.map((task, index) => (
                  <label 
                    key={index} 
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      taskStates[`${selectedQuest.id}-${index}`]
                        ? 'bg-red-500/10 border-red-500/50 text-white' 
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-700 text-red-600 focus:ring-red-600 focus:ring-offset-slate-900 bg-slate-900"
                      checked={!!taskStates[`${selectedQuest.id}-${index}`]}
                      onChange={() => toggleTask(selectedQuest.id, index)}
                      disabled={selectedQuest.status === QuestStatus.COMPLETED}
                    />
                    <span className="text-lg">{task}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-yellow-500 flex items-center gap-2">
                  💎 QUEST REWARD
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-2xl">🎁</div>
                <div>
                  <div className="font-bold text-lg">{selectedQuest.reward}</div>
                  <div className="text-xs text-slate-500">퀘스트 클리어 시 획득 가능한 아이템</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              {selectedQuest.status === QuestStatus.COMPLETED ? (
                <div className="bg-green-500/20 text-green-400 border border-green-500/50 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 animate-pulse">
                  ✅ QUEST CLEARED!
                </div>
              ) : (
                <button
                  disabled={!isQuestComplete}
                  onClick={handleQuestComplete}
                  className={`px-12 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 transform active:scale-95 ${
                    isQuestComplete 
                      ? 'bg-red-600 hover:bg-red-500 text-white scale-105 shadow-red-500/20' 
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isQuestComplete ? 'QUEST COMPLETE' : 'CHECK ALL TASKS'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="text-center p-8 text-slate-500 text-sm">
        <p>© 2024 Com2uS Corp. All Rights Reserved.</p>
        <p className="mt-2 italic">May your code be bug-free and your creative spirit endless.</p>
      </footer>

      {/* AI Assistant */}
      <AIChat />

      {/* Full Completion Celebration */}
      {showConfetti && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="text-center animate-bounce">
            <h2 className="text-6xl font-game font-bold text-white drop-shadow-lg">WORLD CLEAR!</h2>
            <p className="text-2xl mt-4">신입 탐험대원 합류 완료!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
