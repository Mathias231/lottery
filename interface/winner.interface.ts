export interface WinnerProps {
  winnerName: string;
  winnerDisplay: (winnerName: string | null) => void;
  removeWinner: (removeWinner: string) => void;
  resetSelectedItem?: ResetSelectedItem;
}

export type ResetSelectedItem = () => void;
