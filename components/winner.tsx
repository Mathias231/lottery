// Global Imports
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { ResetSelectedItem } from './wheel/wheelData';

// Importing Interfaces
import { WinnerProps } from '../interface/winner.interface';

const Winner = ({
  winnerName,
  winnerDisplay,
  removeWinner,
  resetSelectedItem,
}: WinnerProps) => {
  const reset = () => {
    winnerDisplay(null);
    removeWinner(winnerName);
    if (resetSelectedItem) resetSelectedItem();
  };

  const { width, height } = useWindowSize();
  return (
    <div className="modal">
      <div className="box">
        <div className="name">
          <h1>{winnerName}</h1>
        </div>
        <div className="button">
          <button onClick={reset}>Rull igjen!</button>
        </div>
        <Confetti width={width} height={height} />
      </div>
    </div>
  );
};

export default Winner;