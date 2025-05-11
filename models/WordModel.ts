export type WordModel = {
  id: number;
  word: string;
  translation: string;
  difficulty: number;
  knowledgeLevel?: number;
  repeatCount?: number;
  nextRemindAt?: Date;
  topic?: string;
  levelId: number;
};

export const HardCodedWordsExample: WordModel[] = [
  {
    id: 1,
    word: 'Hi',
    translation: 'Привет',
    difficulty: 1,
    knowledgeLevel: 1,
    repeatCount: 1,
    levelId: 1,
  },
  {
    id: 2,
    word: 'Name',
    translation: 'Имя',
    difficulty: 1,
    knowledgeLevel: 1,
    repeatCount: 1,
    levelId: 1,
  },
  {
    id: 3,
    word: 'Friend',
    translation: 'Друг',
    difficulty: 2,
    knowledgeLevel: 1,
    repeatCount: 1,
    levelId: 1,
  },
  {
    id: 4,
    word: 'Home',
    translation: 'Дом',
    difficulty: 1,
    knowledgeLevel: 1,
    repeatCount: 1,
    levelId: 1,
  },
  {
    id: 5,
    word: 'Food',
    translation: 'Еда',
    difficulty: 1,
    knowledgeLevel: 1,
    repeatCount: 1,
    levelId: 1,
  },
  {
    id: 6,
    word: 'Apple',
    translation: 'Яблоко',
    difficulty: 2,
    knowledgeLevel: 1,
    repeatCount: 1,
    levelId: 1,
  },
];
