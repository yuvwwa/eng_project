import Novel1 from '@/assets/images/novel/novel-1-1.svg';
import Novel2 from '@/assets/images/novel/novel-1-2.svg';
import Novel3 from '@/assets/images/novel/novel-1-3.svg';
import Novel4 from '@/assets/images/novel/novel-1-4.svg';
import Novel5 from '@/assets/images/novel/novel-1-5.svg';
import Novel6 from '@/assets/images/novel/novel-1-6.svg';
import Novel7 from '@/assets/images/novel/novel-1-7.svg';
import Novel8 from '@/assets/images/novel/novel-1-8.svg';
import Novel9 from '@/assets/images/novel/novel-1-9.svg';
import Novel10 from '@/assets/images/novel/novel-1-10.svg';
import Novel11 from '@/assets/images/novel/novel-1-11.svg';
import Novel12 from '@/assets/images/novel/novel-1-12.svg';
import Novel13 from '@/assets/images/novel/novel-1-13.svg';
import Novel14 from '@/assets/images/novel/novel-1-14.svg';
import Novel15 from '@/assets/images/novel/novel-1-15.svg';
import Novel16 from '@/assets/images/novel/novel-1-16.svg';
import Novel17 from '@/assets/images/novel/novel-1-17.svg';
import Novel18 from '@/assets/images/novel/novel-1-18.svg';
import Novel19 from '@/assets/images/novel/novel-1-19.svg';
import Novel20 from '@/assets/images/novel/novel-1-20.svg';
import Novel21 from '@/assets/images/novel/novel-1-21.svg';
import Novel22 from '@/assets/images/novel/novel-1-22.svg';
import Novel23 from '@/assets/images/novel/novel-1-23.svg';
import Novel24 from '@/assets/images/novel/novel-1-24.svg';
import Novel25 from '@/assets/images/novel/novel-1-25.svg';
import Novel26 from '@/assets/images/novel/novel-1-26.svg';
import Novel27 from '@/assets/images/novel/novel-1-27.svg';
import Novel28 from '@/assets/images/novel/novel-1-28.svg';
import Novel29 from '@/assets/images/novel/novel-1-29.svg';
import Novel30 from '@/assets/images/novel/novel-1-30.svg';

import { SvgProps } from 'react-native-svg';
import { HardCodedWordsExample, WordModel } from './WordModel';
import { FC } from 'react';

export type NovelModel = {
  id?: number;
  slides: FC<SvgProps>[];
  words: WordModel[];
  difficulty?: number;
  xp: number;
  coins: number;
  topic?: string;
  levelId: number;
  visible: boolean;
  onClose: () => void;
};

export const HardCodedNovelExample: NovelModel = {
  id: 1,
  slides: [
    Novel1,
    Novel2,
    Novel3,
    Novel4,
    Novel5,
    Novel6,
    Novel7,
    Novel8,
    Novel9,
    Novel10,
    Novel11,
    Novel12,
    Novel13,
    Novel14,
    Novel15,
    Novel16,
    Novel17,
    Novel18,
    Novel19,
    Novel20,
    Novel21,
    Novel22,
    Novel23,
    Novel24,
    Novel25,
    Novel26,
    Novel27,
    Novel28,
    Novel29,
    Novel30,
  ],
  words: HardCodedWordsExample,
  difficulty: 1,
  xp: 100,
  coins: 50,
  levelId: 1,
  visible: false,
  onClose: () => {},
};
