// Global Imports
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

// Importing Interfaces
import { WinnerProps } from '../interface/winner.interface';

const Winner = ({
  winnerName,
  winnerDisplay,
  removeWinner,
  resetSelectedItem,
}: WinnerProps) => {
  //If there is a winner, display the winner, remove the winner, and reset the selected item.
  const resetWinner = () => {
    winnerDisplay(null);
    removeWinner(winnerName);
    if (resetSelectedItem) resetSelectedItem();
  };

  const [width, height] = useWindowSize();

  return (
    <div className="modal">
      <div className="box">
        <div className="name">
          <h1>{winnerName}</h1>
        </div>
        <div className="button">
          <button onClick={resetWinner}>Lukk!</button>
        </div>
        <Confetti width={width} height={height} />
      </div>
    </div>
  );
};

export default Winner;
