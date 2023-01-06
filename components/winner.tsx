// Global Imports
import Confetti from 'react-confetti';
import useWindowSize from '@react-hook/window-size';

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

  // const { width, height } = useWindowSize();
  return (
    <div className="modal">
      <div className="box">
        <div className="name">
          <h1>{winnerName}</h1>
        </div>
        <div className="button">
          <button onClick={reset}>Rull igjen!</button>
        </div>
        <Confetti width={100} height={100} />
      </div>
    </div>
  );
};

export default Winner;
