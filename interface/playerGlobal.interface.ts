export interface IPlayer {
  NAME: string;
  WINCHANCE: number;
  WINRATE: number;
}

export interface IPlayerHandle {
  removePlayer: (playerName: string) => void;
}

export interface IPlayersProps {
  changePlayers: (player: IPlayer[]) => void;
  disabled: boolean;
}
