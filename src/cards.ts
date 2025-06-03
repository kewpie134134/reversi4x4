// カード情報の配列（description, rate, no などを含む）

export type Card = {
  id: string;
  name: string;
  description: string;
  rate: number;
  no: number;
};

// 20枚分のカード情報（idは初期値としてnoを文字列化、ゲーム開始時にユニークIDを付与してください）
export const CARD_MASTER: Omit<Card, "id">[] = [
  {
    name: "カード1",
    description: "カード1の説明",
    rate: 1,
    no: 1,
  },
  {
    name: "カード2",
    description: "カード2の説明",
    rate: 2,
    no: 2,
  },
  {
    name: "カード3",
    description: "カード3の説明",
    rate: 3,
    no: 3,
  },
  {
    name: "カード4",
    description: "カード4の説明",
    rate: 4,
    no: 4,
  },
  {
    name: "カード5",
    description: "カード5の説明",
    rate: 5,
    no: 5,
  },
  {
    name: "カード6",
    description: "カード6の説明",
    rate: 1,
    no: 6,
  },
  {
    name: "カード7",
    description: "カード7の説明",
    rate: 2,
    no: 7,
  },
  {
    name: "カード8",
    description: "カード8の説明",
    rate: 3,
    no: 8,
  },
  {
    name: "カード9",
    description: "カード9の説明",
    rate: 4,
    no: 9,
  },
  {
    name: "カード10",
    description: "カード10の説明",
    rate: 5,
    no: 10,
  },
  {
    name: "カード11",
    description: "カード11の説明",
    rate: 1,
    no: 11,
  },
  {
    name: "カード12",
    description: "カード12の説明",
    rate: 2,
    no: 12,
  },
  {
    name: "カード13",
    description: "カード13の説明",
    rate: 3,
    no: 13,
  },
  {
    name: "カード14",
    description: "カード14の説明",
    rate: 4,
    no: 14,
  },
  {
    name: "カード15",
    description: "カード15の説明",
    rate: 5,
    no: 15,
  },
  {
    name: "カード16",
    description: "カード16の説明",
    rate: 1,
    no: 16,
  },
  {
    name: "カード17",
    description: "カード17の説明",
    rate: 2,
    no: 17,
  },
  {
    name: "カード18",
    description: "カード18の説明",
    rate: 3,
    no: 18,
  },
  {
    name: "カード19",
    description: "カード19の説明",
    rate: 4,
    no: 19,
  },
  {
    name: "カード20",
    description: "カード20の説明",
    rate: 5,
    no: 20,
  },
];