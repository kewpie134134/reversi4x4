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
    description: "オセロのコマを1つ置く",
    rate: 1,
    no: 1,
  },
  {
    name: "カード2",
    description: "オセロのコマを1つ置く",
    rate: 2,
    no: 2,
  },
  {
    name: "カード3",
    description: "オセロのコマを1つ置く",
    rate: 3,
    no: 3,
  },
  {
    name: "カード4",
    description: "オセロのコマを1つ置く",
    rate: 4,
    no: 4,
  },
  {
    name: "カード5",
    description: "オセロのコマを1つ置く",
    rate: 5,
    no: 5,
  },
  {
    name: "カード6",
    description: "オセロのコマを1つ置く",
    rate: 1,
    no: 6,
  },
  {
    name: "カード7",
    description: "オセロのコマを1つ置く",
    rate: 2,
    no: 7,
  },
  {
    name: "カード8",
    description: "オセロのコマを1つ置く",
    rate: 3,
    no: 8,
  },
  {
    name: "カード9",
    description: "オセロのコマを1つ置く",
    rate: 4,
    no: 9,
  },
  {
    name: "カード10",
    description: "オセロのコマを1つ置く",
    rate: 5,
    no: 10,
  },
  {
    name: "カード11",
    description: "オセロのコマを1つ置く",
    rate: 1,
    no: 11,
  },
  {
    name: "カード12",
    description: "オセロのコマを1つ置く",
    rate: 2,
    no: 12,
  },
  {
    name: "カード13",
    description: "オセロのコマを1つ置く",
    rate: 3,
    no: 13,
  },
  {
    name: "カード14",
    description: "オセロのコマを1つ置く",
    rate: 4,
    no: 14,
  },
  {
    name: "カード15",
    description: "オセロのコマを1つ置く",
    rate: 5,
    no: 15,
  },
  {
    name: "カード16",
    description: "オセロのコマを1つ置く",
    rate: 1,
    no: 16,
  },
  {
    name: "カード17",
    description: "オセロのコマを1つ置く",
    rate: 2,
    no: 17,
  },
  {
    name: "カード18",
    description: "オセロのコマを1つ置く",
    rate: 3,
    no: 18,
  },
  {
    name: "カード19",
    description: "オセロのコマを1つ置く",
    rate: 4,
    no: 19,
  },
  {
    name: "カード20",
    description: "オセロのコマを1つ置く",
    rate: 5,
    no: 20,
  },
];