// This file defines types and interfaces used in the application.

export type Player = "black" | "white" | null;

export interface Score {
  black: number;
  white: number;
}

export interface BoardState {
  board: Player[][];
  currentPlayer: Player;
}
export interface CellProps {
  value: Player;
  onClick: () => void;
}
export interface BoardProps {
  board: Player[][];
  onCellClick: (row: number, col: number) => void;
}
export interface ScoreBoardProps {
  score: Score;
  currentPlayer: Player;
}
export interface AppProps {
  initialBoard: Player[][];
  initialScore: Score;
}
export interface GameState {
  board: Player[][];
  currentPlayer: Player;
  score: Score;
}
export interface GameProps {
  initialBoard: Player[][];
  initialScore: Score;
}
export interface Cell {
  row: number;
  col: number;
  value: Player;
}
export interface GameLogic {
  isValidMove: (row: number, col: number, player: Player) => boolean;
  makeMove: (row: number, col: number) => void;
  getValidMoves: (player: Player) => Cell[];
  checkGameOver: () => boolean;
}
export interface GameOverProps {
  winner: Player;
  onRestart: () => void;
}
export interface GameOverState {
  winner: Player;
  isGameOver: boolean;
}
export interface GameOverLogic {
  checkGameOver: () => boolean;
  getWinner: () => Player;
}
export interface GameOverComponentProps {
  winner: Player;
  onRestart: () => void;
}
export interface GameOverComponentState {
  isGameOver: boolean;
}
export interface GameOverComponentLogic {
  checkGameOver: () => boolean;
  getWinner: () => Player;
}
