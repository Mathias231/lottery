export interface WheelProps {
  items: string[];
  onSelectItem?: (selectedItem: number) => void;
  disabled: boolean;
  changeSpinning: (spinning: boolean) => void;
  removeWinner: (playerName: string) => void;
  winnerDisplay: (winnerName: string | null) => void;
}

export type ResetSelectedItem = () => void;

export interface IWheelHandle {
  resetSelectedItem: ResetSelectedItem;
}
