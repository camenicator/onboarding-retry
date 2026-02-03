
export enum QuestStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED'
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  tasks: string[];
  icon: string;
  reward: string;
  status: QuestStatus;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
