
import React from 'react';
import { Quest, QuestStatus } from './types';

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 1,
    title: "오리엔테이션",
    description: "컴투스 월드에 오신 것을 환영합니다! 모험을 위한 기본 장비를 갖추세요.",
    tasks: [
      "웰컴 키트 언박싱하기",
      "사원증 사진 촬영 및 등록",
      "근로계약서 및 서약서 작성"
    ],
    icon: "🎒",
    reward: "컴투스 신규 입사자 뱃지",
    status: QuestStatus.AVAILABLE
  },
  {
    id: 2,
    title: "컴투스 온보딩 프로그램 소개",
    description: "우리가 나아갈 길과 비전을 확인하고 성장을 위한 가이드를 숙지하세요.",
    tasks: [
      "컴투스 핵심 가치 '열정', '도전', '창의' 이해하기",
      "3개월 온보딩 로드맵 확인",
      "사내 인트라넷 계정 활성화"
    ],
    icon: "📜",
    reward: "비전 마스터 칭호",
    status: QuestStatus.LOCKED
  },
  {
    id: 3,
    title: "월드탐험 5가지 퀘스트 소개",
    description: "실전 모험! 사내 생활에 꼭 필요한 5가지 미션을 마스터하세요.",
    tasks: [
      "슬랙(Slack) 가입 및 팀 채널 인사하기",
      "사내 카페테리아에서 웰컴 드링크 마시기",
      "IT 장비(맥북/모니터) 세팅 완료",
      "사옥 투어 (게임룸, 운동 시설 확인)",
      "사내 복지 포인트 제도 확인하기"
    ],
    icon: "🗺️",
    reward: "실무 모험가 자격증",
    status: QuestStatus.LOCKED
  },
  {
    id: 4,
    title: "월드탐험 탐험 대원과의 만남",
    description: "함께 모험을 떠날 동료들과 인사를 나누고 결속을 다지세요.",
    tasks: [
      "버디(Buddy)와 티타임 가지기",
      "팀원들과 점심 식사 퀘스트",
      "팀별 업무 프로세스 미팅 참석"
    ],
    icon: "🤝",
    reward: "팀워크 버프 (협업 능력 +10)",
    status: QuestStatus.LOCKED
  },
  {
    id: 5,
    title: "월드탐험 클리어",
    description: "축하합니다! 이제 당신은 컴투스의 진정한 일원입니다.",
    tasks: [
      "오늘의 소감 한 줄 작성",
      "최종 온보딩 퀘스트 완료 버튼 클릭",
      "기념 사진 촬영"
    ],
    icon: "🏆",
    reward: "정식 모험가 등급 부여",
    status: QuestStatus.LOCKED
  }
];

export const SYSTEM_INSTRUCTION = `
You are 'Comy', an AI Onboarding Mentor for Com2uS, a global mobile gaming company. 
Your goal is to help new employees (Adventurers) settle in happily and effectively. 
Use a friendly, encouraging, and slightly game-like tone (e.g., calling them 'Adventurer', mentioning 'Level up' or 'Quests'). 
Keep answers concise and professional yet energetic. 
If they ask about the company, emphasize Com2uS's identity as a creative leader in gaming.
Languages: Korean is primary.
`;
