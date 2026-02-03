
import React from 'react';
import { Quest, QuestStatus } from '../types';

interface QuestItemProps {
  quest: Quest;
  onSelect: (quest: Quest) => void;
  isActive: boolean;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, onSelect, isActive }) => {
  const isLocked = quest.status === QuestStatus.LOCKED;
  const isCompleted = quest.status === QuestStatus.COMPLETED;

  return (
    <button
      onClick={() => !isLocked && onSelect(quest)}
      className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform ${
        isActive 
          ? 'ring-2 ring-red-500 bg-slate-800 scale-[1.02]' 
          : 'hover:bg-slate-800'
      } ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-lg ${
          isCompleted ? 'bg-green-500/20' : 'bg-slate-700'
        }`}>
          {isCompleted ? '✅' : quest.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 font-game">QUEST {quest.id}</span>
            {isCompleted && <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full">CLEAR</span>}
            {isLocked && <span className="text-[10px] bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">LOCKED</span>}
          </div>
          <h3 className="text-lg font-bold truncate">{quest.title}</h3>
        </div>
      </div>
    </button>
  );
};

export default QuestItem;
